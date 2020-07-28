import React, { Component } from 'react';

import Grid from '../Grid';
import Card from '../Card';
import { FlexRow } from '../Flex';
import NumberInput from '../NumberInputNew';
import MrcCurrencySymbol from '../MrcCurrencySymbol';
import FormSection from '../FormSection';
import CheckCard from '../CheckCard';
import Select from '../Select';
import InputLabel from '../InputLabel';
import { countryBlockingOptions } from '../CreditCorrection/CreditCorrectionNew/blockingOptions';
import * as _ from 'lodash';
import {
    extractCreditPeriods,
    extractDebitTypes,
    getDefaultPayment,
    translatePaymentIfNeeded,
    createCreditPeriodOptions,
    createCreditProductOptions,
    createDebitTypeOptions,
} from '../Util/creditDataUtils';
import { lookup } from '../Util/translations';

export default class CreditCorrectionCustomerActionsSection extends Component {
    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
    }

    stateFromProps(props) {
        const { customer, country } = props;
        const defaultPayment = getDefaultPayment(country, customer.availablePayments);
        return {
            amount: _.get(customer, 'limit.new.amount'),
            defaultProduct: defaultPayment.defaultProduct,
            defaultPeriod: defaultPayment.defaultPeriod,
            defaultDebitType: defaultPayment.defaultDebitType,
        };
    }

    render() {
        const { country, translations, customer } = this.props;
        const ts = translations;
        const blockingOptions = _.get(countryBlockingOptions, country.toUpperCase());
        const customerCreditOption = _.get(customer, 'limit.creditOption');
        const initialAmount = _.get(customer, 'limit.new.initialAmount');
        const currentAmount = _.get(customer, 'limit.current.amount');

        const currentProduct = translatePaymentIfNeeded(_.get(customer, 'limit.current.product'));
        const currentPeriod = translatePaymentIfNeeded(_.get(customer, 'limit.current.period'));
        const currentDebitType = translatePaymentIfNeeded(_.get(customer, 'limit.current.debitType'));

        const newAmount = _.get(customer, 'limit.new.amount');
        const newProduct = translatePaymentIfNeeded(_.get(customer, 'limit.new.product'));
        const newPeriod = translatePaymentIfNeeded(_.get(customer, 'limit.new.period'));
        const newDebitType = translatePaymentIfNeeded(_.get(customer, 'limit.new.debitType'));

        const defaultPaymentProduct =
            !_.isNil(newProduct) && newProduct !== ''
                ? newProduct
                : customer.isCashCustomer
                ? this.state.defaultProduct
                : currentProduct;
        const defaultPaymentPeriod =
            !_.isNil(newProduct) && newProduct !== ''
                ? newPeriod
                : customer.isCashCustomer
                ? this.state.defaultPeriod
                : currentPeriod;
        const defaultPaymentDebitType =
            !_.isNil(newProduct) && newProduct !== ''
                ? newDebitType
                : customer.isCashCustomer
                ? this.state.defaultDebitType
                : currentDebitType;

        const productOptions = createCreditProductOptions(customer.availablePayments, this.state.defaultProduct);
        const periodOptions = createCreditPeriodOptions(
            customer.availablePayments,
            newProduct,
            this.state.defaultProduct
        );
        const debitTypeOptions = createDebitTypeOptions(
            customer.availablePayments,
            newProduct,
            newPeriod,
            this.state.defaultProduct
        );

        let productOptionsContent = _.isNil(newPeriod) ? [['', '']] : [];
        productOptionsContent =
            _.isNil(periodOptions) || periodOptions.length === 0
                ? productOptionsContent
                : productOptionsContent.concat(periodOptions.map((x) => [x, lookup(x)]));

        const readOnly = _.get(customer, 'limit.readOnly');
        return (
            <FormSection title={ts.customerAction} description={ts.customerActionDescription}>
                <h4 className="mrc-ui-form-label mb-2">{ts.chooseCustomerAction}</h4>
                <Grid cols={4}>
                    <CheckCard
                        key={0}
                        title={ts.noChangeAction}
                        checked={customerCreditOption === 'NONE'}
                        onClick={() => {
                            if (customerCreditOption !== 'NONE') {
                                customer.onChangeCreditOption(null, currentAmount, null, null, null, 'NONE');
                            }
                        }}
                        disabled={readOnly}
                    />
                    <CheckCard
                        key={1}
                        title={ts.newCreditAction}
                        checked={customerCreditOption === 'NEWCREDIT'}
                        disabled={readOnly}
                        onClick={() => {
                            if (customerCreditOption !== 'NEWCREDIT') {
                                this.setState({ amount: initialAmount });
                                customer.onChangeCreditOption(
                                    initialAmount,
                                    initialAmount,
                                    defaultPaymentProduct,
                                    defaultPaymentPeriod,
                                    defaultPaymentDebitType,
                                    'NEWCREDIT'
                                );
                            }
                        }}
                    />
                    {customer.isCashCustomer
                        ? null
                        : Object.values(blockingOptions).map((action, i) => {
                              if (action.customerLevel === true) {
                                  return (
                                      <CheckCard
                                          key={i + 2}
                                          title={lookup(action.translationKey)}
                                          checked={action.id === customerCreditOption}
                                          disabled={readOnly}
                                          onClick={() => {
                                              if (action.id !== customerCreditOption) {
                                                  customer.onChangeCreditOption(
                                                      0,
                                                      initialAmount,
                                                      newProduct,
                                                      newPeriod,
                                                      newDebitType,
                                                      action.id
                                                  );
                                              }
                                          }}
                                      />
                                  );
                              }
                              return null;
                          })}
                </Grid>
                {customerCreditOption === 'NEWCREDIT' ? (
                    <div className="mt-5">
                        <InputLabel>{ts.addcreditdata}</InputLabel>
                        <Card dropShadow>
                            <h4 className="mrc-ui-form-label mt-4 mb-1">{ts.addamount}</h4>
                            <Grid cols={4}>
                                <CheckCard title="Amount" checked={true}>
                                    <FlexRow alignItems="baseline">
                                        <div className="mr-3">
                                            <NumberInput
                                                required={true}
                                                value={_.isNil(this.state.amount) ? '' : this.state.amount}
                                                onChange={(amount) => {
                                                    const validAmount = isNaN(amount) ? null : parseFloat(amount);
                                                    this.setState({ amount: amount });
                                                    customer.onLimitChange(
                                                        validAmount,
                                                        validAmount,
                                                        newProduct,
                                                        newPeriod,
                                                        newDebitType
                                                    );
                                                }}
                                                min={0}
                                                greaterThanMin={true}
                                                disabled={readOnly}
                                            />
                                        </div>
                                        <MrcCurrencySymbol type="small" />
                                    </FlexRow>
                                </CheckCard>
                            </Grid>
                            <h4 className="mrc-ui-form-label mt-4 mb-1">{ts.chooseproduct}</h4>
                            <Grid cols={4}>
                                {productOptions.map((x) => (
                                    <CheckCard
                                        key={x}
                                        title={lookup(x)}
                                        checked={newProduct === x}
                                        onClick={() => {
                                            if (x !== newProduct) {
                                                const creditPeriods = extractCreditPeriods(
                                                    customer.availablePayments,
                                                    x
                                                );
                                                const firstCreditPeriod =
                                                    x === null ||
                                                    _.isNil(creditPeriods) ||
                                                    creditPeriods.length === 0 ||
                                                    _.isNil(creditPeriods[0])
                                                        ? null
                                                        : creditPeriods[0];
                                                if (_.isNil(firstCreditPeriod)) {
                                                    customer.onLimitChange(newAmount, newAmount, x, null, null);
                                                }
                                                const debitTypes = extractDebitTypes(
                                                    customer.availablePayments,
                                                    x,
                                                    firstCreditPeriod
                                                );
                                                const firstDebitType =
                                                    _.isNil(debitTypes) ||
                                                    debitTypes.length === 0 ||
                                                    _.isNil(debitTypes[0])
                                                        ? null
                                                        : debitTypes[0];

                                                customer.onLimitChange(
                                                    newAmount,
                                                    newAmount,
                                                    x,
                                                    firstCreditPeriod,
                                                    firstDebitType
                                                );
                                            }
                                        }}
                                        disabled={readOnly}
                                    />
                                ))}
                            </Grid>
                            {_.isNil(periodOptions) || periodOptions.length === 0 ? null : (
                                <h4 className="mrc-ui-form-label mt-4 mb-2">{ts.creditperiod}</h4>
                            )}
                            {_.isNil(periodOptions) || periodOptions.length === 0 ? null : (
                                <Grid cols={1}>
                                    <Select
                                        required={true}
                                        options={productOptionsContent}
                                        value={_.isNil(newPeriod) ? '' : newPeriod}
                                        onChange={(x) => {
                                            if (x === '') {
                                                customer.onLimitChange(newAmount, newAmount, newProduct, null, null);
                                            } else {
                                                if (_.isNil(x)) {
                                                    customer.onLimitChange(newAmount, newAmount, newProduct, x, null);
                                                }
                                                const debitTypes = extractDebitTypes(
                                                    customer.availablePayments,
                                                    newProduct,
                                                    x
                                                );
                                                const firstDebitType =
                                                    _.isNil(debitTypes) ||
                                                    debitTypes.length === 0 ||
                                                    _.isNil(debitTypes[0])
                                                        ? null
                                                        : debitTypes[0];
                                                customer.onLimitChange(
                                                    newAmount,
                                                    newAmount,
                                                    newProduct,
                                                    x,
                                                    firstDebitType
                                                );
                                            }
                                        }}
                                        disabled={readOnly}
                                    />
                                </Grid>
                            )}
                            {_.isNil(debitTypeOptions) || debitTypeOptions.length === 0 ? null : (
                                <h4 className="mrc-ui-form-label mt-0 mb-2">{ts.choosedebittype}</h4>
                            )}
                            {_.isNil(debitTypeOptions) || debitTypeOptions.length === 0 ? null : (
                                <Grid cols={4}>
                                    {debitTypeOptions.map((x) => (
                                        <CheckCard
                                            key={x}
                                            title={lookup(x)}
                                            checked={newDebitType === x}
                                            onClick={() =>
                                                customer.onLimitChange(newAmount, newAmount, newProduct, newPeriod, x)
                                            }
                                            disabled={readOnly}
                                        />
                                    ))}
                                </Grid>
                            )}
                        </Card>
                    </div>
                ) : null}
            </FormSection>
        );
    }
}
