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
import { translations as ts } from './index';

export default class CreditTableRowApproval extends Component {
    render() {
        const _new = (customer, path) => _.get(customer, 'limit.new.' + path);

        const _current = (customer, path) => _.get(customer, 'limit.current.' + path);

        const {
            isCashCustomer,
            requestsCash,
            parent,
            customer,
            country,
            id,
            onExpand,
            onHover,
            isExpanded,
            isHovered,
            canToggle,
            rowType,
        } = this.props;

        const paymentMethodType = _.isNil(_.get(customer, 'limit.paymentMethodType'))
            ? 'CURRENT'
            : _.get(customer, 'limit.paymentMethodType');
        const limitType = _.isNil(_.get(customer, 'limit.limitType')) ? 'CURRENT' : _.get(customer, 'limit.limitType');

        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;

        // wish data flag
        // TODO: wished to cash for credit customer
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
        // TODO:
        //const creditOption = _.isNil(_.get(customer, 'limit.creditOption'))? 'NONE' : _.get(customer, 'limit.creditOption');
        //const newAmount = isNoChangeInNew ? null : 0;

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
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.cash} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D rowSpan="2">
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={_current(customer, 'amount')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2">
                                <CRTableCellExpiry
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
                                    expiryLimit={_.get(customer, 'limit.wish.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.wish.expiry.date')}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_.get(customer, 'limit.wish.product')}
                                    productTimePeriod={[
                                        lookup(_current(customer, 'limit.wish.period')),
                                        _current(customer, 'limit.wish.period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={_.get(customer, 'limit.wish.method')}
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
                    type={rowType}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    {requestsCash && !isCashCustomer ? (
                        <Table.D colSpan="3" rowSpan="2">
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
                                    limit={_new(parent, customer, 'amount')}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.new.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.new.expiry.date')}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_new(parent, customer, 'product')}
                                    productTimePeriod={
                                        _new(parent, customer, 'period')
                                            ? [lookup(_new(parent, customer, 'period')), ts.days].join(' ')
                                            : '-'
                                    }
                                    productPaymentMethod={_new(parent, customer, 'method')}
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
