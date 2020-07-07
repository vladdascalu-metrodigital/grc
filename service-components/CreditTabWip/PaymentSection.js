import React, { Component } from 'react';
import Grid from '../../Grid';
import CheckCard from '../../CheckCard';
import CreditTableFormSection from './CreditTableFormSection';

import * as _ from 'lodash';
import { getDefaultPayment } from '../../Util/creditDataUtils';

export default class PaymentSection extends Component {
    constructor(props) {
        super(props);
    }

    getTypeToInitializeCredit(customer, parent) {
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentAmount = _.get(customer, 'limit.current.amount');
        const hasCurrentPaymentMethod = !_.isNil(currentAmount) && !_.isNil(currentProduct) && !customer.isCashCustomer;

        return hasCurrentPaymentMethod ? 'CURRENT' : parent === 'approval' ? 'NEW' : 'WISH';
    }

    render() {
        const { customer, isCashCustomerRequest, country, translations } = this.props;
        const ts = translations;
        const isNewCredit = !isCashCustomerRequest;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        const applyType = this.getTypeToInitializeCredit(customer);
        // TODO: To Cash -- should be checked which data is correct if in future this function is implemented
        const cashAmount = customer.isCashCustomer ? null : 0;
        const creditOption = 'CREDITTOCASH';

        const defaultPayment = getDefaultPayment(country, customer.availablePayments);
        const defaultProduct = applyType === 'CURRENT' ? null : defaultPayment.defaultProduct;
        const defaultPeriod = applyType === 'CURRENT' ? null : defaultPayment.defaultPeriod;
        const defaultDebitType = applyType === 'CURRENT' ? null : defaultPayment.defaultDebitType;
        return (
            <CreditTableFormSection title={ts.payment} description={ts.paymentdescription}>
                <h4 className="mrc-ui-form-label mb-2">{ts.choosepayment}</h4>
                <Grid cols={4}>
                    <CheckCard
                        title={ts.cash}
                        checked={isCashCustomerRequest}
                        onClick={() => {
                            // TODO: To Cash -- currently only adapted for real cash customer, how this works must be discussed in future
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
                                    applyType,
                                    applyType
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
