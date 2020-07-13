import React, { Component } from 'react';
import * as _ from 'lodash';
import Table from '../../MrcTable';
import ExpandedRow from './ExpandedRow';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import ToggleIndicator from '../../ToggleIndicator';
import { lookup } from '../../Util/translations';

export default class CreditTableRowApproval extends Component {
    retrieveNewCreditData(customer, isNoChangeInNew, limitType, paymentMethodType) {
        if (isNoChangeInNew) {
            return null;
        }

        let amount = null;
        let product = null;
        let period = null;
        let debitType = null;
        let expiryAmount = null;
        let expiryDate = null;

        if (limitType === 'CURRENT' && !_.isNil(_.get(customer, 'limit.current.amount'))) {
            amount = _.get(customer, 'limit.current.amount');
            expiryAmount = _.get(customer, 'limit.current.expiry.amount');
            expiryDate = _.get(customer, 'limit.current.expiry.date');
        } else if (limitType === 'WISH' && !_.isNil(_.get(customer, 'limit.wish.amount'))) {
            amount = _.get(customer, 'limit.wish.amount');
            expiryAmount = _.get(customer, 'limit.wish.expiry.amount');
            expiryDate = _.get(customer, 'limit.wish.expiry.date');
        } else if (limitType === 'APPLIED' && !_.isNil(_.get(customer, 'limit.applied.amount'))) {
            amount = _.get(customer, 'limit.applied.amount');
            expiryAmount = _.get(customer, 'limit.applied.expiry.amount');
            expiryDate = _.get(customer, 'limit.applied.expiry.date');
        } else {
            amount = _.get(customer, 'limit.new.amount');
            expiryAmount = _.get(customer, 'limit.new.expiry.amount');
            expiryDate = _.get(customer, 'limit.new.expiry.date');
        }

        if (paymentMethodType === 'CURRENT' && !_.isNil(_.get(customer, 'limit.current.product'))) {
            product = _.get(customer, 'limit.current.product');
            period = _.get(customer, 'limit.current.period');
            debitType = _.get(customer, 'limit.current.debitType');
        } else if (paymentMethodType === 'WISH' && !_.isNil(_.get(customer, 'limit.wish.product'))) {
            product = _.get(customer, 'limit.wish.product');
            period = _.get(customer, 'limit.wish.period');
            debitType = _.get(customer, 'limit.wish.debitType');
        } else if (paymentMethodType === 'APPLIED' && !_.isNil(_.get(customer, 'limit.applied.product'))) {
            product = _.get(customer, 'limit.applied.product');
            period = _.get(customer, 'limit.applied.period');
            debitType = _.get(customer, 'limit.applied.debitType');
        } else {
            product = _.get(customer, 'limit.new.product');
            period = _.get(customer, 'limit.new.period');
            debitType = _.get(customer, 'limit.new.debitType');
        }

        return {
            amount: amount,
            product: product,
            period: period,
            debitType: debitType,
            expiryAmount: expiryAmount,
            expiryDate: expiryDate,
        };
    }

    render() {
        const _current = (customer, path) => _.get(customer, 'limit.current.' + path);

        const {
            requestsCash,
            customer,
            country,
            id,
            onExpand,
            onHover,
            isExpanded,
            isHovered,
            canToggle,
            rowType,
            translations,
        } = this.props;
        const ts = translations;

        const isCashCustomer = customer.isCashCustomer;

        const paymentMethodType = _.get(customer, 'limit.paymentMethodType');
        const limitType = _.get(customer, 'limit.limitType');

        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;

        // wish data flag
        // TODO: To Cash -- wished to cash for credit customer
        const wishedToCash =
            _.get(customer, 'limit.wish.creditOption') === 'CREDITTOCASH' ||
            (_.isNil(_.get(customer, 'limit.wish.amount')) && isCashCustomer) ||
            (_.get(customer, 'limit.wish.creditOption') === 'NONE' &&
                !_.isNil(_.get(customer, 'limit.wish.amount')) &&
                _.get(customer, 'limit.wish.amount') === 0 &&
                _.isNil(_.get(customer, 'limit.wish.product')) &&
                !isCashCustomer);
        const isNoChangeInWish =
            _.isNil(_.get(customer, 'limit.wish.amount')) && _.isNil(_.get(customer, 'limit.wish.product'));

        // new data flag
        const isNoChangeInNew =
            limitType === 'CURRENT' && paymentMethodType === 'CURRENT' && _.isNil(_.get(customer, 'limit.new.amount'));
        const newCreditData = this.retrieveNewCreditData(customer, isNoChangeInNew, limitType, paymentMethodType);

        const isValid = _.get(customer, 'limit.valid');
        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={isValid ? rowType : 'invalid'}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    <Table.D rowSpan="2">
                        {customer ? (
                            <CRTableCellCustomer
                                name={customer.name}
                                number={[customer.storeNumber, customer.number].join('/')}
                                isBlocked={isBlocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>

                    {isCashCustomer ? (
                        <Table.D colSpan="3" rowSpan="2">
                            <CRTableCellPrepaymentCash name={ts.cash} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D rowSpan="2">
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={_.get(customer, 'limitExhaustion')}
                                    limit={_current(customer, 'amount')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2">
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={_current(customer, 'expiry.amount')}
                                    expiryDate={_current(customer, 'expiry.date')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2" borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_current(customer, 'product'))}
                                    productTimePeriod={[
                                        lookup(_current(customer, 'period')),
                                        _current(customer, 'period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={lookup(_current(customer, 'debitType'))}
                                    isBlue
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

                    {wishedToCash && !isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.cash} isBlue />
                        </Table.D>
                    ) : (wishedToCash && isCashCustomer) || (!isCashCustomer && isNoChangeInWish) ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.nochange} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={_.get(customer, 'limit.wish.amount')}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={_.get(customer, 'limit.wish.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.wish.expiry.date')}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_.get(customer, 'limit.wish.product')}
                                    productTimePeriod={[
                                        lookup(_.get(customer, 'limit.wish.period')),
                                        _.get(customer, 'limit.wish.period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={_.get(customer, 'limit.wish.debitType')}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

                    <Table.D rowSpan="2">
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={isValid ? rowType : 'invalid'}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    {requestsCash && !isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.cash} isGreen />
                        </Table.D>
                    ) : (requestsCash && isCashCustomer) || (!isCashCustomer && isNoChangeInNew) ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.nochange} isGreen />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={newCreditData.amount}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={newCreditData.expiryAmount}
                                    expiryDate={newCreditData.expiryDate}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={newCreditData.product}
                                    productTimePeriod={
                                        newCreditData.period ? [lookup(newCreditData.period), ts.days].join(' ') : '-'
                                    }
                                    productPaymentMethod={newCreditData.debitType}
                                    isGreen
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
