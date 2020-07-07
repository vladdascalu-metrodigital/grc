import React, { Component } from 'react';
import Grid from '../../Grid';
import CheckCard from '../../CheckCard';
import CreditTableFormSection from './CreditTableFormSection';
import { translations as ts } from './index';

import * as _ from 'lodash';
import { getDefaultPayment } from '../../Util/creditDataUtils';

export default class PaymentSection extends Component {
    constructor(props) {
        super(props);
    }

    getLimitTypeForCreditLimit(customer) {
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentLimit = !_.isNil(currentAmount) && !customer.isCashCustomer;

        return hasCurrentLimit ? 'CURRENT' : 'WISH';
    }

    getLimitTypeForApproval(customer) {
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentLimit = !_.isNil(currentAmount) && !customer.isCashCustomer;
        return hasCurrentLimit ? 'CURRENT' : 'NEW';
    }

    getPaymentTypeForCreditLimit(customer) {
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentPaymentMethod = !_.isNil(currentAmount) && !_.isNil(currentProduct) && !customer.isCashCustomer;

        return hasCurrentPaymentMethod ? 'CURRENT' : 'WISH';
    }

    getPaymentTypeForApproval(customer) {
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentPaymentMethod = !_.isNil(currentAmount) && !_.isNil(currentProduct) && !customer.isCashCustomer;

        return hasCurrentPaymentMethod ? 'CURRENT' : 'NEW';
    }

    render() {
        const { customer, parent, isCashCustomerRequest, country } = this.props;
        const isNewCredit = !isCashCustomerRequest;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        // TODO: need to decide what is the default behavior
        const applyCreditLimitType =
            parent === 'approval' ? this.getLimitTypeForApproval(customer) : this.getLimitTypeForCreditLimit(customer);
        const applyCreditPaymentMethodType =
            parent === 'approval'
                ? this.getPaymentTypeForApproval(customer)
                : this.getPaymentTypeForCreditLimit(customer);
        const cashAmount = customer.isCashCustomer ? null : 0;
        const creditOption = 'CREDITTOCASH';

        // TODO: check for approval service
        const defaultNewPaymentStats = parent === 'approval' ? 'NEW' : 'WISH';
        const defaultPayment = getDefaultPayment(country, customer.availablePayments);
        const defaultProduct =
            applyCreditPaymentMethodType === defaultNewPaymentStats ? defaultPayment.defaultProduct : null;
        const defaultPeriod =
            applyCreditPaymentMethodType === defaultNewPaymentStats ? defaultPayment.defaultPeriod : null;
        const defaultDebitType =
            applyCreditPaymentMethodType === defaultNewPaymentStats ? defaultPayment.defaultDebitType : null;
        return (
            <CreditTableFormSection title={ts.payment} description={ts.paymentdescription}>
                <h4 className="mrc-ui-form-label mb-2">{ts.choosepayment}</h4>
                <Grid cols={4}>
                    <CheckCard
                        title={ts.cash}
                        checked={isCashCustomerRequest}
                        onClick={() => {
                            // TODO: currently only adapted for real cash customer, how this function works must be discussed in future
                            customer.onChangeCreditOption(cashAmount, null, null, null, creditOption);
                        }}
                        disabled={!customer.isCashCustomer || readOnly}
                    />
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
                                    applyCreditLimitType,
                                    applyCreditPaymentMethodType
                                );
                            }
                        }}
                        disabled={readOnly}
                    />
                </Grid>
            </CreditTableFormSection>
        );
    }
}
