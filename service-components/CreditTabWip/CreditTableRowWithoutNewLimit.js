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

export default class CreditTableRowWithoutNewLimit extends Component {
    render() {
        const _current = (parent, customer, path) =>
            parent === 'history' ? _.get(customer, 'limit.old.' + path) : _.get(customer, 'limit.current.' + path);
        const {
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
        const creditOption = _.isNil(_.get(customer, 'limit.creditOption'))
            ? 'NONE'
            : _.get(customer, 'limit.creditOption');

        const isCashCustomer = customer.isCashCustomer;
        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;

        const isCurrentAmountWithNewPaymentMethod =
            _.isNil(_.get(customer, 'limit.wish.amount')) && limitType === 'CURRENT' && paymentMethodType !== 'CURRENT';
        const wishedAmount = isCurrentAmountWithNewPaymentMethod
            ? _current(parent, customer, 'amount')
            : _.get(customer, 'limit.wish.amount');
        const wishedExpiryAmount = isCurrentAmountWithNewPaymentMethod
            ? _current(parent, customer, 'expiry.amount')
            : _.get(customer, 'limit.wish.expiry.amount');
        const wishedExpiryDate = isCurrentAmountWithNewPaymentMethod
            ? _current(parent, customer, 'expiry.date')
            : _.get(customer, 'limit.wish.expiry.date');

        // null check is only for existing request
        const isCurrentPaymentMethodWithNewAmount =
            paymentMethodType === 'CURRENT' &&
            _.isNil(_.get(customer, 'limit.wish.product')) &&
            _.isNil(_.get(customer, 'limit.wish.period')) &&
            _.isNil(_.get(customer, 'limit.wish.debitType')) &&
            (limitType !== 'CURRENT' || (creditOption === 'NONE' && !_.isNil(wishedAmount)));
        const wishedProduct = isCurrentPaymentMethodWithNewAmount
            ? _current(parent, customer, 'product')
            : _.get(customer, 'limit.wish.product');
        const wishedPeriod = isCurrentPaymentMethodWithNewAmount
            ? _current(parent, customer, 'period')
            : _.get(customer, 'limit.wish.period');
        const wishedDebitType = isCurrentPaymentMethodWithNewAmount
            ? _current(parent, customer, 'debitType')
            : _.get(customer, 'limit.wish.debitType');

        const isNoChange = limitType === 'CURRENT' && paymentMethodType === 'CURRENT' && _.isNil(wishedAmount);

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
                    <Table.D>
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
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={_current(parent, customer, 'amount')}
                                    isBlue
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_current(parent, customer, 'expiry.amount')}
                                    expiryDate={_current(parent, customer, 'expiry.date')}
                                    isBlue
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={lookup(_current(parent, customer, 'product'))}
                                    productTimePeriod={[
                                        lookup(_current(parent, customer, 'period')),
                                        _current(parent, customer, 'period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={lookup(_current(parent, customer, 'debitType'))}
                                    isBlue
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    {requestsCash && !isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.cash} isBlue />
                        </Table.D>
                    ) : (requestsCash && isCashCustomer) || (!isCashCustomer && isNoChange) ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.nochange} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit country={country} exhausted={null} limit={wishedAmount} />
                            </Table.D>
                            <Table.D>
                                <CRTableCellExpiry expiryLimit={wishedExpiryAmount} expiryDate={wishedExpiryDate} />
                            </Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={lookup(wishedProduct)}
                                    productTimePeriod={wishedPeriod ? [lookup(wishedPeriod), ts.days].join(' ') : '-'}
                                    productPaymentMethod={lookup(wishedDebitType)}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    <Table.D>
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
