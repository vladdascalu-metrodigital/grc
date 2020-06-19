import React, { Component } from 'react';
import Grid from '../../Grid';
import CheckCard from '../../CheckCard';
import CreditTableFormSection from './CreditTableFormSection';
import { translations as ts } from './index';

import * as _ from 'lodash';

export default class PaymentSection extends Component {
    constructor(props) {
        super(props);
    }

    getLimitTypeForCreditLimit(customer) {
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentLimit = !_.isNil(currentAmount) && !customer.isCashCustomer;

        return hasCurrentLimit ? 'CURRENT' : 'WISH';
    }

    getPaymentTypeForCreditLimit(customer) {
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentPaymentMethod = !_.isNil(currentAmount) && !_.isNil(currentProduct) && !customer.isCashCustomer;

        return hasCurrentPaymentMethod ? 'CURRENT' : 'WISH';
    }

    render() {
        const { customer, parent, isCashCustomerRequest } = this.props;
        const isNewCredit = !isCashCustomerRequest;

        // TODO: check for approval service
        const applyCreditLimitType = parent === 'approval' ? 'CURRENT' : this.getLimitTypeForCreditLimit(customer);
        const applyCreditPaymentMethodType =
            parent === 'approval' ? 'CURRENT' : this.getPaymentTypeForCreditLimit(customer);
        const cashAmount = customer.isCashCustomer ? null : 0;
        const creditOption = customer.isCashCustomer ? 'NONE' : 'CREDITTOCASH';
        return (
            <CreditTableFormSection title={ts.payment} description={ts.paymentdescription}>
                <h4 className="mrc-ui-form-label mb-2">{ts.choosepayment}</h4>
                <Grid cols={4}>
                    <CheckCard
                        title={ts.cash}
                        checked={isCashCustomerRequest}
                        onClick={() => {
                            customer.onChangeCreditOption(cashAmount, null, null, null, creditOption);
                        }}
                        disabled={!customer.isCashCustomer}
                    />
                    <CheckCard
                        title={ts.credit}
                        checked={isNewCredit}
                        onClick={() => {
                            if (!isNewCredit) {
                                customer.onLimitAndExpiryChange(
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    applyCreditLimitType,
                                    applyCreditPaymentMethodType
                                );
                            }
                        }}
                    />
                </Grid>
            </CreditTableFormSection>
        );
    }
}
