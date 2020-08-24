import React, { Component } from 'react';
import * as _ from 'lodash';
import Table from '../MrcTable';
import ExpandedRow from './ExpandedRow';
import CRTableCellCustomer from './CreditTable/CRTableCellCustomer';
import CRTableCellLimit from './CreditTable/CRTableCellLimit';
import CRTableCellExpiry from './CreditTable/CRTableCellExpiry';
import CRTableCellCreditProduct from './CreditTable/CRTableCellCreditProduct';
import CRTableCellBiggerText from './CreditTable/CRTableCellBiggerText';
import ToggleIndicator from '../ToggleIndicator';
import { lookup } from '../Util/translations';
import { createProductTimePeriod } from './creditDataTabUtil';

export default class CreditTableRowCreditLimit extends Component {
    render() {
        const _current = (customer, path) => _.get(customer, 'limit.current.' + path);
        const {
            requestsCash,
            requestsPrePayment,
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

        const paymentMethodType = _.get(customer, 'limit.paymentMethodType');
        const limitType = _.get(customer, 'limit.limitType');
        const creditOption = _.get(customer, 'limit.creditOption');

        const isCashCustomer = customer.isCashCustomer;
        const isPrepaymentCustomer = customer.isPrepaymentCustomer;
        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;

        const isCurrentAmountWithNewPaymentMethod =
            _.isNil(_.get(customer, 'limit.wish.amount')) && limitType === 'CURRENT' && paymentMethodType !== 'CURRENT';
        const wishedAmount = isCurrentAmountWithNewPaymentMethod
            ? _current(customer, 'amount')
            : _.get(customer, 'limit.wish.amount');
        const wishedExpiryAmount = isCurrentAmountWithNewPaymentMethod
            ? _current(customer, 'expiry.amount')
            : _.get(customer, 'limit.wish.expiry.amount');
        const wishedExpiryDate = isCurrentAmountWithNewPaymentMethod
            ? _current(customer, 'expiry.date')
            : _.get(customer, 'limit.wish.expiry.date');

        // null check is only for existing old request
        const isCurrentPaymentMethodWithNewAmount =
            paymentMethodType === 'CURRENT' &&
            _.isNil(_.get(customer, 'limit.wish.product')) &&
            _.isNil(_.get(customer, 'limit.wish.period')) &&
            _.isNil(_.get(customer, 'limit.wish.debitType')) &&
            (limitType !== 'CURRENT' || (creditOption === 'NONE' && !_.isNil(wishedAmount)));
        const wishedProduct = isCurrentPaymentMethodWithNewAmount
            ? _current(customer, 'product')
            : _.get(customer, 'limit.wish.product');
        const wishedPeriod = isCurrentPaymentMethodWithNewAmount
            ? _current(customer, 'period')
            : _.get(customer, 'limit.wish.period');
        const wishedDebitType = isCurrentPaymentMethodWithNewAmount
            ? _current(customer, 'debitType')
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
                                blockingText={ts.blocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>
                    {isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.cash} color={'blue'} />
                        </Table.D>
                    ) : isPrepaymentCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.prepayment} color={'blue'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={true}
                                    exhausted={_.get(customer, 'limitExhaustion')}
                                    limit={_current(customer, 'amount')}
                                    color={'blue'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={_current(customer, 'expiry.amount')}
                                    expiryDate={_current(customer, 'expiry.date')}
                                    color={'blue'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={lookup(_current(customer, 'product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _current(customer, 'period'),
                                        _current(customer, 'period') ? lookup(_current(customer, 'period')) : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(_current(customer, 'debitType'))}
                                    color={'blue'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    {requestsPrePayment && !isPrepaymentCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.prepayment} color={'green'} />
                        </Table.D>
                    ) : requestsCash && !isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.cash} color={'green'} />
                        </Table.D>
                    ) : (requestsCash && isCashCustomer) ||
                      (requestsPrePayment && isPrepaymentCustomer) ||
                      (!isCashCustomer && isNoChange) ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.nochange} color={'green'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={false}
                                    exhausted={null}
                                    limit={wishedAmount}
                                    color={'green'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={wishedExpiryAmount}
                                    expiryDate={wishedExpiryDate}
                                    color={'green'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={lookup(wishedProduct)}
                                    productTimePeriod={createProductTimePeriod(
                                        wishedPeriod,
                                        wishedPeriod ? lookup(wishedPeriod) : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(wishedDebitType)}
                                    color={'green'}
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
