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
import {
    getCustomerAdditionalFieldsOptional,
    getMapByIdWithValidAndElement,
} from '../AdditionalFields/additionalFielsUtil';

export default class CreditTableRowApproval extends Component {
    isNoChangeInNew = undefined;
    creditOption = undefined;

    setIsNoChangeAndCreditOption = (newIsNoChange, newCreditOption, additionalFields) => {
        if (this.isNoChange === newIsNoChange && this.creditOption === newCreditOption) {
            return;
        }

        if (
            additionalFields === null ||
            additionalFields === undefined ||
            !additionalFields.hasCustomerAdditionalFields ||
            !additionalFields.onInit
        ) {
            this.creditOption = newCreditOption;
            this.isNoChange = newIsNoChange;
            return;
        }

        let fieldsValidations = [];

        if (this.creditOption !== newCreditOption && newCreditOption !== 'NEWCREDIT') {
            //send to parent all valid
            additionalFields.customerAdditionalFieldsList.forEach((additionalField) =>
                fieldsValidations.push({
                    valid: true,
                    item: additionalField,
                })
            );
        } else if (newIsNoChange === true) {
            //send validation for optional field
            fieldsValidations = Object.values(
                getMapByIdWithValidAndElement(
                    getCustomerAdditionalFieldsOptional(additionalFields).customerAdditionalFieldsList
                )
            );
        } else {
            //send validation for field as they are
            fieldsValidations = Object.values(
                getMapByIdWithValidAndElement(additionalFields.customerAdditionalFieldsList)
            );
        }

        additionalFields.onInit(fieldsValidations);
        this.creditOption = newCreditOption;
        this.isNoChange = newIsNoChange;
    };

    getAdditionalFieldsForChildren = (additionalFields) => {
        if (this.creditOption !== 'NEWCREDIT') {
            return {
                ...additionalFields,
                hasCustomerAdditionalFields: false,
                customerAdditionalFieldsList: [],
            };
        } else if (this.isNoChange === true) {
            return getCustomerAdditionalFieldsOptional(additionalFields);
        }
        return additionalFields;
    };

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
            isPrepaymentRequest,
        } = this.props;
        const ts = translations;

        const isCashCustomer = customer.isCashCustomer;
        const isPrepaymentCustomer = customer.isPrepaymentCustomer;

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
        const isPrepaymentInWish = _.get(customer, 'limit.wish.creditOption') === 'PREPAYMENT';
        const isNoChangeInWish =
            (_.isNil(_.get(customer, 'limit.wish.amount')) && _.isNil(_.get(customer, 'limit.wish.product'))) ||
            (isPrepaymentCustomer && (isPrepaymentInWish || isPrepaymentRequest));

        // new data flag
        const isPrepaymentInNew = requestsPrePayment;

        this.setIsNoChangeAndCreditOption(
            (limitType === 'CURRENT' &&
                paymentMethodType === 'CURRENT' &&
                _.isNil(_.get(customer, 'limit.new.amount'))) ||
                (isPrepaymentCustomer && (requestsPrePayment || isPrepaymentRequest)),
            _.get(customer, 'limit.creditOption'),
            customer.additionalFields
        );

        const newCreditData = this.retrieveNewCreditData(customer, this.isNoChangeInNew, limitType, paymentMethodType);

        const refinedCanToggle = isPrepaymentRequest ? isBlocked : canToggle;

        const isValid = _.get(customer, 'limit.valid');

        const newProps = {
            ...this.props,
            customer: {
                ...customer,
                additionalFields: this.getAdditionalFieldsForChildren(customer.additionalFields),
            },
        };
        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={isValid ? rowType : 'invalid'}
                    style={{
                        cursor: refinedCanToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={refinedCanToggle ? () => onExpand() : null}
                    onMouseEnter={refinedCanToggle ? () => onHover(true) : null}
                    onMouseLeave={refinedCanToggle ? () => onHover(false) : null}
                >
                    <Table.D rowSpan="2">
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
                        <Table.D colSpan="3" rowSpan="2">
                            <CRTableCellBiggerText text={ts.cash} color={'blue'} />
                        </Table.D>
                    ) : isPrepaymentCustomer ? (
                        <Table.D colSpan="3" rowSpan="2">
                            <CRTableCellBiggerText text={ts.prepayment} color={'blue'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D rowSpan="2">
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={true}
                                    exhausted={_.get(customer, 'limitExhaustion')}
                                    limit={_current(customer, 'amount')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D rowSpan="2">
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={_current(customer, 'expiry.amount')}
                                    expiryDate={_current(customer, 'expiry.date')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D rowSpan="2" borderFix>
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

                    {isPrepaymentInWish && !isPrepaymentCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.prepayment} color={'grey'} />
                        </Table.D>
                    ) : wishedToCash && !isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.cash} color={'grey'} />
                        </Table.D>
                    ) : (wishedToCash && isCashCustomer) || (!isCashCustomer && isNoChangeInWish) ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.nochange} color={'grey'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={false}
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
                                    productName={lookup(_.get(customer, 'limit.wish.product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.wish.period'),
                                        _.get(customer, 'limit.wish.period')
                                            ? lookup(_.get(customer, 'limit.wish.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(_.get(customer, 'limit.wish.debitType'))}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

                    <Table.D rowSpan="2">{refinedCanToggle ? <ToggleIndicator /> : null}</Table.D>
                </Table.R>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={isValid ? rowType : 'invalid'}
                    style={{
                        cursor: refinedCanToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={refinedCanToggle ? () => onExpand() : null}
                    onMouseEnter={refinedCanToggle ? () => onHover(true) : null}
                    onMouseLeave={refinedCanToggle ? () => onHover(false) : null}
                >
                    {isPrepaymentInNew && !isPrepaymentCustomer ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText text={ts.prepayment} color={'green'} />
                        </Table.D>
                    ) : requestsCash && !isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.cash} color={'green'} />
                        </Table.D>
                    ) : (requestsCash && isCashCustomer) ||
                      (requestsPrePayment && isPrepaymentCustomer) ||
                      (!isCashCustomer && this.isNoChangeInNew) ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText text={ts.nochange} color={'green'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={false}
                                    exhausted={null}
                                    limit={newCreditData.amount}
                                    color={'green'}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={newCreditData.expiryAmount}
                                    expiryDate={newCreditData.expiryDate}
                                    color={'green'}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(newCreditData.product)}
                                    productTimePeriod={createProductTimePeriod(
                                        newCreditData.period,
                                        newCreditData.period ? lookup(newCreditData.period) : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(newCreditData.debitType)}
                                    color={'green'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                </Table.R>
                {isExpanded ? <ExpandedRow {...newProps} /> : null}
            </React.Fragment>
        );
    }
}
