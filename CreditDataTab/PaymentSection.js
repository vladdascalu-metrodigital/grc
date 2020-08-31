import React, { Component } from 'react';
import Grid from '../Grid';
import CheckCard from '../CheckCard';
import FormSection from '../FormSection';

import * as _ from 'lodash';
import { getDefaultPayment, getPrepaymentConfig } from '../Util/creditDataUtils';
import { isApproval, isPrepaymentAllowedForCountry } from './creditDataTabUtil';

export default class PaymentSection extends Component {
    constructor(props) {
        super(props);
    }

    getTypeToInitializeCredit(customer, parent) {
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentPaymentMethod =
            !_.isNil(currentAmount) &&
            !_.isNil(currentProduct) &&
            !customer.isCashCustomer &&
            !customer.isPrepaymentCustomer;

        return hasCurrentPaymentMethod ? 'CURRENT' : isApproval(parent) ? 'NEW' : 'WISH';
    }

    render() {
        const {
            customer,
            isCashCustomerRequest,
            isPrePaymentCustomerRequest,
            isPrepaymentEnabled,
            country,
            parent,
            translations,
        } = this.props;
        const ts = translations;
        const isNewCredit = !isCashCustomerRequest && !isPrePaymentCustomerRequest;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        const applyType = this.getTypeToInitializeCredit(customer, parent);
        // TODO: To Cash -- should be checked which data is correct if in future this function is implemented
        const cashAmount = customer.isCashCustomer ? null : 0;
        const currentAmount = _.get(customer, 'limit.current.amount');
        const isPrepaymentAllowed = isPrepaymentAllowedForCountry(country, customer.isCashCustomer, currentAmount);
        const prepaymentConfig = getPrepaymentConfig(country);

        // cash and prepayment customer will use defaultPayment
        const defaultPayment = getDefaultPayment(country, customer.availablePayments);
        const defaultProduct = applyType === 'CURRENT' ? null : defaultPayment.defaultProduct;
        const defaultPeriod = applyType === 'CURRENT' ? null : defaultPayment.defaultPeriod;
        const defaultDebitType = applyType === 'CURRENT' ? null : defaultPayment.defaultDebitType;
        return (
            <FormSection title={ts.payment} description={ts.paymentdescription}>
                <h4 className="mrc-ui-form-label mb-2">{ts.choosepayment}</h4>
                <Grid cols={4}>
                    <CheckCard
                        title={ts.cash}
                        checked={isCashCustomerRequest}
                        onClick={() => {
                            // TODO: To Cash -- currently only adapted for real cash customer, how this works must be discussed in future
                            if (!isCashCustomerRequest) {
                                customer.onChangeCreditOption(cashAmount, null, null, null, 'CREDITTOCASH');
                            }
                        }}
                        disabled={!customer.isCashCustomer || readOnly}
                    />
                    {isPrepaymentEnabled ? (
                        <CheckCard
                            title={ts.prepayment}
                            checked={isPrePaymentCustomerRequest}
                            onClick={() => {
                                if (!isPrePaymentCustomerRequest) {
                                    customer.onChangeCreditOption(
                                        customer.isPrepaymentCustomer ? null : prepaymentConfig.amount,
                                        customer.isPrepaymentCustomer ? null : prepaymentConfig.product,
                                        customer.isPrepaymentCustomer ? null : prepaymentConfig.period,
                                        null,
                                        'PREPAYMENT'
                                    );
                                }
                            }}
                            disabled={!isPrepaymentAllowed || readOnly}
                        />
                    ) : null}
                    <CheckCard
                        title={ts.credit}
                        checked={isNewCredit}
                        onClick={() => {
                            if (!isNewCredit) {
                                customer.onLimitAndExpiryChange(
                                    null,
                                    defaultProduct,
                                    defaultPeriod,
                                    defaultDebitType,
                                    null,
                                    null,
                                    applyType,
                                    applyType
                                );
                            }
                        }}
                        disabled={readOnly}
                    />
                </Grid>
            </FormSection>
        );
    }
}
