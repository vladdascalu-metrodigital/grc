import React, { Component } from 'react';
import Select from '../../Select';
import Card from '../../Card';
import Grid from '../../Grid';
import { lookup } from '../../Util/translations';
// import NumberInput from '../../NumberInput';
import CreditTableFormSection from './CreditTableFormSection';
import CheckCard from '../../CheckCard';
import CRPaymentMethodSetting from './CRPaymentMethodSetting';
import {
    translatePaymentIfNeeded,
    getPaymentDataByType,
    getDefaultPayment,
    extractCreditProducts,
    extractCreditPeriods,
    extractDebitTypes,
} from '../../Util/creditDataUtils';

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
        const { customer, translations } = this.props;
        const ts = translations;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        const paymentMethodType = _.get(customer, 'limit.paymentMethodType');
        const limitType = _.get(customer, 'limit.limitType');

        // current data
        const currentProduct = _.get(customer, 'limit.current.product');

        // requested data
        const wishedAmount = _.get(customer, 'limit.wish.amount');
        const wishedProduct =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.product'));
        const wishedPeriod =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.period'));
        const wishedDebitType =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.debitType'));

        const hasCurrentPaymentMethod = !_.isNil(currentProduct) && !customer.isCashCustomer;
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
                                disabled={readOnly}
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
                            disabled={readOnly}
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
                                                disabled={readOnly}
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
        const { customer, translations } = this.props;
        const ts = translations;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        const paymentMethodType = _.get(customer, 'limit.paymentMethodType');
        const limitType = _.get(customer, 'limit.limitType');
        const selectedAmount = getPaymentDataByType(customer, limitType, 'amount');

        // current data
        const currentProduct = _.get(customer, 'limit.current.product');
        const currentPeriod = _.get(customer, 'limit.current.period');
        const currentDebitType = _.get(customer, 'limit.current.debitType');

        // requested data
        const wishedProduct = translatePaymentIfNeeded(_.get(customer, 'limit.wish.product'));
        const wishedPeriod = translatePaymentIfNeeded(_.get(customer, 'limit.wish.period'));
        const wishedDebitType = translatePaymentIfNeeded(_.get(customer, 'limit.wish.debitType'));

        // applied data
        const appliedProduct = translatePaymentIfNeeded(_.get(customer, 'limit.applied.product'));
        const appliedPeriod = translatePaymentIfNeeded(_.get(customer, 'limit.applied.period'));
        const appliedDebitType = translatePaymentIfNeeded(_.get(customer, 'limit.applied.debitType'));

        // new data
        const newProduct = translatePaymentIfNeeded(_.get(customer, 'limit.new.product'));
        const newPeriod = translatePaymentIfNeeded(_.get(customer, 'limit.new.period'));
        const newDebitType = translatePaymentIfNeeded(_.get(customer, 'limit.new.debitType'));

        const hasCurrentPaymentMethod = !_.isNil(currentProduct) && !customer.isCashCustomer;
        const isCurrentPaymentMethod =
            _.isNil(newProduct) &&
            _.isNil(newPeriod) &&
            _.isNil(newDebitType) &&
            paymentMethodType === 'CURRENT' &&
            hasCurrentPaymentMethod;
        const hasWishedPaymentMethod = !_.isNil(wishedProduct);
        const isWishedPaymentMethod =
            (!isCurrentPaymentMethod || !hasCurrentPaymentMethod) &&
            paymentMethodType === 'WISH' &&
            !_.isNil(wishedProduct);
        const hasAppliedPaymentMethod = !_.isNil(appliedProduct);
        const isAppliedPaymentMethod =
            (!isCurrentPaymentMethod || !hasCurrentPaymentMethod) &&
            paymentMethodType === 'APPLIED' &&
            !_.isNil(appliedProduct);
        const isNewRequest =
            (!isCurrentPaymentMethod || !hasCurrentPaymentMethod) && !isWishedPaymentMethod && !isAppliedPaymentMethod;

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
                                    customer.onLimitChange(selectedAmount, null, null, null, limitType, 'CURRENT');
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={currentProduct}
                                    period={currentPeriod}
                                    directDebit={currentDebitType}
                                />
                            </CheckCard>
                        ) : null}
                        {hasWishedPaymentMethod ? (
                            <CheckCard
                                title={ts.customerWish}
                                checked={isWishedPaymentMethod}
                                onClick={() => {
                                    customer.onLimitChange(
                                        selectedAmount,
                                        wishedProduct,
                                        wishedPeriod,
                                        wishedDebitType,
                                        limitType,
                                        'WISH'
                                    );
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={wishedProduct}
                                    period={wishedPeriod}
                                    directDebit={wishedDebitType}
                                />
                            </CheckCard>
                        ) : null}
                        {hasAppliedPaymentMethod ? (
                            <CheckCard
                                title={_.get(customer, 'limit.applied.position')}
                                checked={isAppliedPaymentMethod}
                                onClick={() => {
                                    customer.onLimitChange(
                                        selectedAmount,
                                        appliedProduct,
                                        appliedPeriod,
                                        appliedDebitType,
                                        limitType,
                                        'APPLIED'
                                    );
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={appliedProduct}
                                    period={appliedPeriod}
                                    directDebit={appliedDebitType}
                                />
                            </CheckCard>
                        ) : null}
                        <CheckCard
                            title={ts.new}
                            checked={isNewRequest}
                            onClick={() => {
                                if (!isNewRequest) {
                                    customer.onLimitChange(
                                        selectedAmount,
                                        this.state.defaultProduct,
                                        this.state.defaultPeriod,
                                        this.state.defaultDebitType,
                                        limitType,
                                        'NEW'
                                    );
                                }
                            }}
                            disabled={readOnly}
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
                                                        customer.onLimitChange(
                                                            selectedAmount,
                                                            x,
                                                            null,
                                                            null,
                                                            limitType,
                                                            'NEW'
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
                                                        selectedAmount,
                                                        x,
                                                        firstCreditPeriod,
                                                        firstDebitType,
                                                        limitType,
                                                        'NEW'
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
                                                    customer.onLimitChange(
                                                        selectedAmount,
                                                        newProduct,
                                                        null,
                                                        null,
                                                        limitType,
                                                        'NEW'
                                                    );
                                                } else {
                                                    if (_.isNil(x)) {
                                                        customer.onLimitChange(
                                                            selectedAmount,
                                                            newProduct,
                                                            x,
                                                            null,
                                                            limitType,
                                                            'NEW'
                                                        );
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
                                                        selectedAmount,
                                                        newProduct,
                                                        x,
                                                        firstDebitType,
                                                        limitType,
                                                        'NEW'
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
                                                checked={wishedDebitType === x}
                                                onClick={() =>
                                                    customer.onLimitChange(
                                                        selectedAmount,
                                                        newProduct,
                                                        newPeriod,
                                                        x,
                                                        limitType,
                                                        'NEW'
                                                    )
                                                }
                                                disabled={readOnly}
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
}
