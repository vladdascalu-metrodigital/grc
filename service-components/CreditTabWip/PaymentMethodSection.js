import React, { Component } from 'react';
import Select from '../../Select';
import Card from '../../Card';
import Grid from '../../Grid';
import { lookup } from '../../Util/translations';
import { translations as ts } from './index';
// import NumberInput from '../../NumberInput';
import CreditTableFormSection from './CreditTableFormSection';
import CheckCard from '../../CheckCard';
import CRPaymentMethodSetting from './CRPaymentMethodSetting';
import {
    translatePaymentIfNeeded,
    getDefaultPayment,
    extractCreditProducts,
    extractCreditPeriods,
    extractDebitTypes,
} from '../../Util/paymentMethodsUtils';

import * as _ from 'lodash';

export default class PaymentMethodSection extends Component {
    constructor(props) {
        super(props);
        this.state = this.stateFromProps();
    }

    stateFromProps() {
        const { country, customer } = this.props;
        const defaultPayment = getDefaultPayment(country, customer.availablePayments);
        return {
            defaultProduct: defaultPayment.defaultProduct,
            defaultPeriod: defaultPayment.defaultPeriod,
            defaultDebitType: defaultPayment.defaultDebitType,
        };
    }

    render() {
        const { parent } = this.props;
        return parent === 'approval' ? this.renderApproval() : this.renderCredit();
    }

    getPossiblePaymentMethodValues(availablePayments, creditProduct, creditPeriod) {
        if (!availablePayments) return null;
        const creditProductValues = extractCreditProducts(this.state.defaultProduct, availablePayments);
        if (creditProduct === null) {
            return creditProductValues;
        } else {
            const creditPeriodValues = extractCreditPeriods(availablePayments, creditProduct);
            if (creditPeriod === null) {
                return creditPeriodValues;
            } else {
                return extractDebitTypes(availablePayments, creditProduct, creditPeriod);
            }
        }
    }

    createCreditProductOptions(availablePayments) {
        return this.getPossiblePaymentMethodValues(availablePayments, null, null);
    }

    createCreditPeriodOptions(availablePayments, creditProduct) {
        return _.isNil(creditProduct)
            ? null
            : this.getPossiblePaymentMethodValues(availablePayments, creditProduct, null);
    }
    createDebitTypeOptions(availablePayments, creditProduct, creditPeriod) {
        return _.isNil(creditProduct) || _.isNil(creditPeriod)
            ? null
            : this.getPossiblePaymentMethodValues(availablePayments, creditProduct, creditPeriod);
    }

    renderCredit() {
        const { customer } = this.props;

        const paymentMethodType = _.isNil(_.get(customer, 'limit.paymentMethodType'))
            ? 'CURRENT'
            : _.get(customer, 'limit.paymentMethodType');
        const limitType = _.isNil(_.get(customer, 'limit.limitType')) ? 'CURRENT' : _.get(customer, 'limit.limitType');

        // current data
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentPeriod = _.get(customer, 'limit.current.period');
        const currentDebitType = _.get(customer, 'limit.current.debitType');

        // requested data
        const wishedAmount = _.get(customer, 'limit.wish.amount');
        const wishedProduct =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.product'));
        const wishedPeriod =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.period'));
        const wishedDebitType =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.debitType'));

        const hasCurrentPaymentMethod =
            (!_.isNil(currentProduct) || !_.isNil(currentPeriod) || !_.isNil(currentDebitType)) &&
            !customer.isCashCustomer;
        const isCurrentPaymentMethod =
            _.isNil(wishedProduct) &&
            _.isNil(wishedPeriod) &&
            _.isNil(wishedDebitType) &&
            paymentMethodType === 'CURRENT' &&
            hasCurrentPaymentMethod;
        const isNewRequest = !isCurrentPaymentMethod || !hasCurrentPaymentMethod;

        const productOptions = this.createCreditProductOptions(customer.availablePayments);
        const periodOptions = this.createCreditPeriodOptions(customer.availablePayments, wishedProduct);
        const debitTypeOptions = this.createDebitTypeOptions(customer.availablePayments, wishedProduct, wishedPeriod);

        let productOptionsContent = _.isNil(wishedPeriod) ? [['', '']] : [];
        productOptionsContent =
            _.isNil(periodOptions) || periodOptions.length === 0
                ? productOptionsContent
                : productOptionsContent.concat(periodOptions.map((x) => [x, lookup(x)]));

        return (
            <CreditTableFormSection title={ts.paymentmethod} description={ts.paymentmethoddescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.choosepaymentmethod}</h4>
                    <Grid cols={4}>
                        {hasCurrentPaymentMethod ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentPaymentMethod}
                                onClick={() => {
                                    customer.onLimitChange(wishedAmount, null, null, null, limitType, 'CURRENT');
                                }}
                            >
                                <CRPaymentMethodSetting
                                    product={_.get(customer, 'limit.current.product')}
                                    period={_.get(customer, 'limit.current.period')}
                                    directDebit={_.get(customer, 'limit.current.debitType')}
                                />
                            </CheckCard>
                        ) : null}
                        <CheckCard
                            title={ts.new}
                            checked={isNewRequest}
                            onClick={() => {
                                if (!isNewRequest) {
                                    customer.onLimitChange(
                                        wishedAmount,
                                        this.state.defaultProduct,
                                        this.state.defaultPeriod,
                                        this.state.defaultDebitType,
                                        limitType,
                                        'WISH'
                                    );
                                }
                            }}
                        ></CheckCard>
                    </Grid>
                    {isNewRequest ? (
                        <React.Fragment>
                            <h4 className="mrc-ui-form-label mb-2 mt-5">{ts.choosenewpaymentmethod}</h4>
                            <Card dropShadow>
                                <h4 className="mrc-ui-form-label mb-2">{ts.chooseproduct}</h4>
                                <Grid cols={4}>
                                    {productOptions.map((x) => (
                                        <CheckCard
                                            key={x}
                                            title={lookup(x)}
                                            checked={wishedProduct === x}
                                            onClick={() => {
                                                if (x !== wishedProduct) {
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
                                                        customer.onLimitChange(
                                                            wishedAmount,
                                                            x,
                                                            null,
                                                            null,
                                                            limitType,
                                                            'WISH'
                                                        );
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
                                                        wishedAmount,
                                                        x,
                                                        firstCreditPeriod,
                                                        firstDebitType,
                                                        limitType,
                                                        'WISH'
                                                    );
                                                }
                                            }}
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
                                            value={_.isNil(wishedPeriod) ? '' : wishedPeriod}
                                            onChange={(x) => {
                                                if (x === '') {
                                                    customer.onLimitChange(
                                                        wishedAmount,
                                                        wishedProduct,
                                                        null,
                                                        null,
                                                        limitType,
                                                        'WISH'
                                                    );
                                                } else {
                                                    if (_.isNil(x)) {
                                                        customer.onLimitChange(
                                                            wishedAmount,
                                                            wishedProduct,
                                                            x,
                                                            null,
                                                            limitType,
                                                            'WISH'
                                                        );
                                                    }
                                                    const debitTypes = extractDebitTypes(
                                                        customer.availablePayments,
                                                        wishedProduct,
                                                        x
                                                    );
                                                    const firstDebitType =
                                                        _.isNil(debitTypes) ||
                                                        debitTypes.length === 0 ||
                                                        _.isNil(debitTypes[0])
                                                            ? null
                                                            : debitTypes[0];
                                                    customer.onLimitChange(
                                                        wishedAmount,
                                                        wishedProduct,
                                                        x,
                                                        firstDebitType,
                                                        limitType,
                                                        'WISH'
                                                    );
                                                }
                                            }}
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
                                                checked={wishedDebitType === x}
                                                onClick={() =>
                                                    customer.onLimitChange(
                                                        wishedAmount,
                                                        wishedProduct,
                                                        wishedPeriod,
                                                        x,
                                                        limitType,
                                                        'WISH'
                                                    )
                                                }
                                            />
                                        ))}
                                    </Grid>
                                )}
                            </Card>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            </CreditTableFormSection>
        );
    }

    renderApproval() {
        // TODO: approve service
        //const paymentMethodType = _.isNil(_.get(customer, 'limit.paymentMethodType')) ? 'CURRENT'  : _.get(customer, 'limit.paymentMethodType')
        const _new = (parent, customer, path) =>
            parent === 'approval'
                ? _.get(customer, 'limit.new.' + path)
                : parent === 'creditlimit'
                ? _.get(customer, 'limit.wish.' + path)
                : null;
        const { customer, parent } = this.props;
        const newAmount = _new(parent, customer, 'amount');
        const newProduct = _new(parent, customer, 'product');
        const newPeriod = _new(parent, customer, 'period');
        const newDebitType = _new(parent, customer, 'debitType');
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentDebitType = _.get(customer, 'limit.current.debitType');
        const currentPeriod = _.get(customer, 'limit.current.period');

        const newIsCurrentMethod =
            newProduct === currentProduct && newPeriod === currentPeriod && newDebitType === currentDebitType;

        return (
            <CreditTableFormSection title={ts.paymentmethod} description={ts.paymentmethoddescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.choosepaymentmethod}</h4>
                    <Grid cols={4}>
                        <CheckCard
                            title={ts.current}
                            checked={newIsCurrentMethod}
                            onClick={() => {
                                customer.onLimitChange(
                                    newAmount,
                                    currentProduct,
                                    currentPeriod,
                                    currentDebitType,
                                    null,
                                    'CURRENT'
                                );
                            }}
                        >
                            <CRPaymentMethodSetting
                                product={_.get(customer, 'limit.current.product')}
                                period={_.get(customer, 'limit.current.period')}
                                directDebit={_.get(customer, 'limit.current.debitType')}
                            />
                        </CheckCard>
                        <CheckCard
                            title={ts.new}
                            checked={!newIsCurrentMethod}
                            onClick={() => {
                                customer.onLimitChange(newAmount, null, null, null, null, 'WISH');
                            }}
                        ></CheckCard>
                    </Grid>
                    {!newIsCurrentMethod ? (
                        <React.Fragment>
                            <h4 className="mrc-ui-form-label mb-2 mt-5">Choose new payment method</h4>
                            <Card dropShadow>
                                <h4 className="mrc-ui-form-label mb-2">{ts.chooseproduct}</h4>
                                <Grid cols={4}>
                                    {this.state.products.map((x) => (
                                        <CheckCard
                                            key={x}
                                            title={lookup(x)}
                                            checked={newProduct === x}
                                            onClick={() => {
                                                if (x !== newProduct) {
                                                    customer.onLimitChange(
                                                        newAmount,
                                                        x,
                                                        newPeriod,
                                                        newDebitType,
                                                        null,
                                                        'WISH'
                                                    );
                                                }
                                            }}
                                        />
                                    ))}
                                </Grid>
                                <h4 className="mrc-ui-form-label mt-4 mb-2">{ts.creditperiod}</h4>
                                <Select
                                    options={this.state.periods.map((x) => lookup(x))}
                                    value={newPeriod}
                                    onChange={(x) =>
                                        customer.onLimitChange(newAmount, newProduct, x, newDebitType, null, 'WISH')
                                    }
                                />
                                <h4 className="mrc-ui-form-label mt-0 mb-2">{ts.choosedebittype}</h4>
                                <Grid cols={4}>
                                    {this.state.debitTypes.map((x) => (
                                        <CheckCard
                                            key={x}
                                            title={lookup(x)}
                                            checked={newDebitType === x}
                                            onClick={() =>
                                                customer.onLimitChange(
                                                    newAmount,
                                                    newProduct,
                                                    newPeriod,
                                                    x,
                                                    null,
                                                    'WISH'
                                                )
                                            }
                                        />
                                    ))}
                                </Grid>
                            </Card>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            </CreditTableFormSection>
        );
    }
}
