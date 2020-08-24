import React, { Component } from 'react';
import Select from '../Select';
import Card from '../Card';
import Grid from '../Grid';
import { lookup } from '../Util/translations';
// import NumberInput from '../../NumberInput';
import FormSection from '../FormSection';
import CheckCard from '../CheckCard';
import CRPaymentMethodSetting from './CreditTable/CRPaymentMethodSetting';
import {
    translatePaymentIfNeeded,
    getPaymentDataByType,
    getDefaultPayment,
    extractCreditPeriods,
    extractDebitTypes,
    createCreditPeriodOptions,
    createCreditProductOptions,
    createDebitTypeOptions,
} from '../Util/creditDataUtils';

import * as _ from 'lodash';
import { isApproval } from './creditDataTabUtil';

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
        return isApproval(parent) ? this.renderApproval() : this.renderCredit();
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

        const hasCurrentPaymentMethod =
            !_.isNil(currentProduct) && !customer.isCashCustomer && !customer.isPrepaymentCustomer;
        const isCurrentPaymentMethod =
            _.isNil(wishedProduct) &&
            _.isNil(wishedPeriod) &&
            _.isNil(wishedDebitType) &&
            paymentMethodType === 'CURRENT' &&
            hasCurrentPaymentMethod;
        const isNewRequest = !isCurrentPaymentMethod || !hasCurrentPaymentMethod;

        const productOptions = createCreditProductOptions(customer.availablePayments, this.state.defaultProduct);
        const periodOptions = createCreditPeriodOptions(
            customer.availablePayments,
            wishedProduct,
            this.state.defaultProduct
        );
        const debitTypeOptions = createDebitTypeOptions(
            customer.availablePayments,
            wishedProduct,
            wishedPeriod,
            this.state.defaultProduct
        );

        let productOptionsContent = _.isNil(wishedPeriod) ? [['', '']] : [];
        productOptionsContent =
            _.isNil(periodOptions) || periodOptions.length === 0
                ? productOptionsContent
                : productOptionsContent.concat(periodOptions.map((x) => [translatePaymentIfNeeded(x), lookup(x)]));

        return (
            <FormSection title={ts.paymentmethod} description={ts.paymentmethoddescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.choosepaymentmethod}</h4>
                    <Grid cols={4}>
                        {hasCurrentPaymentMethod ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentPaymentMethod}
                                onClick={() => {
                                    if (!isCurrentPaymentMethod) {
                                        customer.onLimitChange(wishedAmount, null, null, null, limitType, 'CURRENT');
                                    }
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={
                                        _.isNil(_.get(customer, 'limit.current.product'))
                                            ? null
                                            : lookup(_.get(customer, 'limit.current.product'))
                                    }
                                    period={
                                        _.isNil(_.get(customer, 'limit.current.period'))
                                            ? null
                                            : lookup(_.get(customer, 'limit.current.period'))
                                    }
                                    directDebit={
                                        _.isNil(_.get(customer, 'limit.current.debitType'))
                                            ? null
                                            : lookup(_.get(customer, 'limit.current.debitType'))
                                    }
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
            </FormSection>
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

        const hasCurrentPaymentMethod =
            !_.isNil(currentProduct) && !customer.isCashCustomer && !customer.isPrepaymentCustomer;
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

        return (
            <FormSection title={ts.paymentmethod} description={ts.paymentmethoddescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.choosepaymentmethod}</h4>
                    <Grid cols={4}>
                        {hasCurrentPaymentMethod ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentPaymentMethod}
                                onClick={() => {
                                    if (!isCurrentPaymentMethod) {
                                        customer.onLimitChange(selectedAmount, null, null, null, limitType, 'CURRENT');
                                    }
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={_.isNil(currentProduct) ? null : lookup(currentProduct)}
                                    period={_.isNil(currentPeriod) ? null : lookup(currentPeriod)}
                                    directDebit={_.isNil(currentDebitType) ? null : lookup(currentDebitType)}
                                />
                            </CheckCard>
                        ) : null}
                        {hasWishedPaymentMethod ? (
                            <CheckCard
                                title={ts.customerWish}
                                checked={isWishedPaymentMethod}
                                onClick={() => {
                                    if (!isWishedPaymentMethod) {
                                        customer.onLimitChange(
                                            selectedAmount,
                                            wishedProduct,
                                            wishedPeriod,
                                            wishedDebitType,
                                            limitType,
                                            'WISH'
                                        );
                                    }
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={_.isNil(wishedProduct) ? null : lookup(wishedProduct)}
                                    period={_.isNil(wishedPeriod) ? null : lookup(wishedPeriod)}
                                    directDebit={_.isNil(wishedDebitType) ? null : lookup(wishedDebitType)}
                                />
                            </CheckCard>
                        ) : null}
                        {hasAppliedPaymentMethod ? (
                            <CheckCard
                                title={_.get(customer, 'limit.applied.position')}
                                checked={isAppliedPaymentMethod}
                                onClick={() => {
                                    if (!isAppliedPaymentMethod) {
                                        customer.onLimitChange(
                                            selectedAmount,
                                            appliedProduct,
                                            appliedPeriod,
                                            appliedDebitType,
                                            limitType,
                                            'APPLIED'
                                        );
                                    }
                                }}
                                disabled={readOnly}
                            >
                                <CRPaymentMethodSetting
                                    product={_.isNil(appliedProduct) ? null : lookup(appliedProduct)}
                                    period={_.isNil(appliedPeriod) ? null : lookup(appliedPeriod)}
                                    directDebit={_.isNil(appliedDebitType) ? null : lookup(appliedDebitType)}
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
                                                checked={newDebitType === x}
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
            </FormSection>
        );
    }
}
