import React, { Component } from 'react';
import FormSection from '../FormSection';
import Grid from '../Grid';
import Card from '../Card';
import CRLimitSetting from './CreditTable/CRLimitSetting';
import { FlexRow } from '../Flex';
import MrcCurrencySymbol from '../MrcCurrencySymbol';
import MrcDatePickerInput from '../DatePicker';
import NumberInput from '../NumberInputNew';
import MrcCurrency from '../MrcCurrency';
import CheckCard from '../CheckCard';
import { translatePaymentIfNeeded, getPaymentDataByType } from '../Util/creditDataUtils';

import * as _ from 'lodash';
import { isApproval } from './creditDataTabUtil';

export default class LimitSection extends Component {
    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
    }

    stateFromProps(props) {
        const { customer, parent } = props;
        return {
            amount: isApproval(parent) ? _.get(customer, 'limit.new.amount') : _.get(customer, 'limit.wish.amount'),
            newExpiryAmount: isApproval(parent) ? _.get(customer, 'limit.new.expiry.amount') : null,
        };
    }

    render() {
        const { parent } = this.props;
        return isApproval(parent) ? this.renderApproval() : this.renderCredit();
    }

    renderCredit() {
        const { customer, dateFormat, translations, country } = this.props;
        const ts = translations;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        // selected data type
        const limitType = _.get(customer, 'limit.limitType');
        const paymentMethodType = _.get(customer, 'limit.paymentMethodType');

        // current data
        const currentAmount = _.get(customer, 'limit.current.amount');
        const currentExpiryAmount = _.get(customer, 'limit.current.expiry.amount');
        const currentExpiryAmountOption = _.isNil(currentExpiryAmount) ? currentAmount : currentExpiryAmount;
        const currentExpiryDate = _.get(customer, 'limit.current.expiry.date');

        // requested data
        const wishedExpiryAmount = _.get(customer, 'limit.wish.expiry.amount');
        const wishedExpiryDate = _.get(customer, 'limit.wish.expiry.date');
        const wishedAmount = _.get(customer, 'limit.wish.amount');
        const selectedProduct = translatePaymentIfNeeded(getPaymentDataByType(customer, paymentMethodType, 'product'));
        const selectedPeriod = translatePaymentIfNeeded(getPaymentDataByType(customer, paymentMethodType, 'period'));
        const selectedDebitType = translatePaymentIfNeeded(
            getPaymentDataByType(customer, paymentMethodType, 'debitType')
        );

        const hasCurrentLimit = !_.isNil(currentAmount) && !customer.isCashCustomer;
        const isCurrentLimit = _.isNil(wishedAmount) && limitType === 'CURRENT' && hasCurrentLimit;
        const isNewRequest = !isCurrentLimit || !hasCurrentLimit;
        const isWithoutExpiry = _.isNil(wishedExpiryDate);

        const defaultLimitExpiryAmount = _.isNil(wishedExpiryAmount)
            ? _.isNil(currentExpiryAmountOption)
                ? 0
                : currentExpiryAmountOption
            : wishedExpiryAmount;
        return (
            <FormSection title={ts.limit} description={ts.limitdescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.chooseamount}</h4>
                    <Grid cols={4}>
                        {hasCurrentLimit ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentLimit}
                                onClick={() => {
                                    if (!isCurrentLimit) {
                                        this.setState({ amount: null });
                                        customer.onLimitAndExpiryChange(
                                            null,
                                            selectedProduct,
                                            selectedPeriod,
                                            selectedDebitType,
                                            null,
                                            null,
                                            'CURRENT',
                                            paymentMethodType
                                        );
                                    }
                                }}
                                disabled={readOnly}
                            >
                                <CRLimitSetting
                                    country={country}
                                    limit={currentAmount}
                                    limitAfterExpiry={currentExpiryAmount}
                                    expiryDate={currentExpiryDate}
                                />
                            </CheckCard>
                        ) : null}
                        <CheckCard
                            title={ts.new}
                            checked={isNewRequest}
                            onClick={() => {
                                if (!isNewRequest) {
                                    this.setState({ amount: null });
                                    customer.onLimitAndExpiryChange(
                                        null,
                                        selectedProduct,
                                        selectedPeriod,
                                        selectedDebitType,
                                        null,
                                        null,
                                        'WISH',
                                        paymentMethodType
                                    );
                                }
                            }}
                            disabled={readOnly}
                        />
                    </Grid>
                    {isNewRequest ? (
                        <React.Fragment>
                            <h4 className="mrc-ui-form-label mt-5 mb-2">{ts.chooselimit}</h4>
                            <Card dropShadow>
                                <h4 className="mrc-ui-form-label mb-1">{ts.amount}</h4>
                                <Grid cols={3}>
                                    <FlexRow alignItems="baseline">
                                        <div className="mr-3">
                                            <NumberInput
                                                required={true}
                                                value={_.isNil(this.state.amount) ? '' : this.state.amount}
                                                onChange={(amount) => {
                                                    const val = parseFloat(amount);
                                                    const validAmount = !Number.isNaN(val) ? val : null;
                                                    this.setState({ amount: validAmount });
                                                    customer.onLimitChange(
                                                        validAmount,
                                                        selectedProduct,
                                                        selectedPeriod,
                                                        selectedDebitType,
                                                        'WISH',
                                                        paymentMethodType
                                                    );
                                                }}
                                                disabled={readOnly}
                                            />
                                        </div>
                                        <MrcCurrencySymbol country={country} />
                                    </FlexRow>
                                </Grid>
                                <h4 className="mrc-ui-form-label mt-4 mb-1">{ts.chooseexpiry}</h4>
                                <Grid cols={3}>
                                    <CheckCard
                                        title={ts.withoutExpiry}
                                        checked={isWithoutExpiry}
                                        onClick={() => {
                                            customer.onExpiryChange(null, null);
                                        }}
                                        disabled={readOnly}
                                    />
                                    <CheckCard
                                        title={ts.expiryDate}
                                        checked={!_.isNil(wishedExpiryDate)}
                                        disabled={readOnly}
                                    >
                                        <MrcDatePickerInput
                                            className="m-input-element"
                                            onChange={(date) => customer.onExpiryChange(defaultLimitExpiryAmount, date)}
                                            onBlur={(event) =>
                                                customer.onExpiryOnBlur(
                                                    defaultLimitExpiryAmount,
                                                    event,
                                                    wishedExpiryDate
                                                )
                                            }
                                            selected={_.isNil(wishedExpiryDate) ? null : new Date(wishedExpiryDate)}
                                            showYearDropdown={true}
                                            dateFormat={dateFormat}
                                            minDate={new Date(new Date().getTime() + 86400000)} // + 1 day in ms
                                            placeholderText={dateFormat}
                                            id={'datepicker-' + customer.storeNumber + customer.number}
                                            disabled={readOnly}
                                        />
                                    </CheckCard>
                                    {/* TODO: tbd in future
                                    <GridItem alignSelf="center">
                                        <a>{ts.setExpiryDateForAll}</a>
                                    </GridItem>
                                    */}
                                </Grid>
                                {!_.isNil(wishedExpiryDate) ? (
                                    <h4 className="mrc-ui-form-label mt-4 mb-2">{ts.resetLimit}</h4>
                                ) : null}
                                {!_.isNil(wishedExpiryDate) ? (
                                    <Grid cols={3}>
                                        <CheckCard
                                            checked={wishedExpiryAmount === 0}
                                            onClick={() => {
                                                customer.onExpiryChange(0, wishedExpiryDate);
                                            }}
                                            disabled={readOnly}
                                        >
                                            <MrcCurrency country={country} type="large-bold">
                                                0
                                            </MrcCurrency>
                                        </CheckCard>
                                        {!_.isNil(currentExpiryAmountOption) && currentExpiryAmountOption !== 0 ? (
                                            <CheckCard
                                                title={ts.current}
                                                checked={wishedExpiryAmount === currentExpiryAmountOption}
                                                onClick={() => {
                                                    customer.onExpiryChange(
                                                        currentExpiryAmountOption,
                                                        wishedExpiryDate
                                                    );
                                                }}
                                                disabled={readOnly}
                                            >
                                                <MrcCurrency country={country} type="large-bold">
                                                    {currentExpiryAmountOption}
                                                </MrcCurrency>
                                            </CheckCard>
                                        ) : null}
                                    </Grid>
                                ) : null}
                            </Card>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            </FormSection>
        );
    }

    renderApproval() {
        const { customer, dateFormat, translations, country, isContractingStepEditable } = this.props;
        const ts = translations;
        const readOnly = _.get(customer, 'limit.readOnly') === true;

        // TODO: adapted default later
        // selected data type
        const limitType = _.get(customer, 'limit.limitType');
        const paymentMethodType = _.get(customer, 'limit.paymentMethodType');

        const selectedProduct = translatePaymentIfNeeded(getPaymentDataByType(customer, paymentMethodType, 'product'));
        const selectedPeriod = translatePaymentIfNeeded(getPaymentDataByType(customer, paymentMethodType, 'period'));
        const selectedDebitType = translatePaymentIfNeeded(
            getPaymentDataByType(customer, paymentMethodType, 'debitType')
        );

        // current data
        const currentAmount = _.get(customer, 'limit.current.amount');
        const currentExpiryAmount = _.get(customer, 'limit.current.expiry.amount');
        const currentExpiryDate = _.get(customer, 'limit.current.expiry.date');

        // requested data
        const wishedExpiryAmount = _.get(customer, 'limit.wish.expiry.amount');
        const wishedExpiryDate = _.get(customer, 'limit.wish.expiry.date');
        const wishedAmount = _.get(customer, 'limit.wish.amount');

        // last applied data
        const appliedExpiryAmount = _.get(customer, 'limit.applied.expiry.amount');
        const appliedExpiryDate = _.get(customer, 'limit.applied.expiry.date');
        const appliedAmount = _.get(customer, 'limit.applied.amount');

        // new data
        const newExpiryDate = _.get(customer, 'limit.new.expiry.date');
        // const newExpiryAmount = _.get(customer, 'limit.new.expiry.amount');
        const newAmount = _.get(customer, 'limit.new.amount');

        const hasCurrentLimit = !_.isNil(currentAmount) && !customer.isCashCustomer;
        const isCurrentLimit = _.isNil(newAmount) && limitType === 'CURRENT' && hasCurrentLimit;
        const hasWishedRequest = !_.isNil(wishedAmount);
        const isWishedRequest = (!isCurrentLimit || !hasCurrentLimit) && limitType === 'WISH' && !_.isNil(wishedAmount);
        const hasAppliedRequest = !_.isNil(appliedAmount);
        const isAppliedRequest =
            (!isCurrentLimit || !hasCurrentLimit) && limitType === 'APPLIED' && !_.isNil(appliedAmount);
        const isNewRequest = (!isCurrentLimit || !hasCurrentLimit) && !isWishedRequest && !isAppliedRequest;
        const isWithoutExpiry = _.isNil(newExpiryDate);

        const amountInContracting =
            limitType === 'APPLIED' ? appliedAmount : limitType === 'WISH' ? wishedAmount : null;
        const expiryDateInContracting =
            limitType === 'APPLIED'
                ? _.get(customer, 'limit.applied.expiry.date')
                : limitType === 'WISH'
                ? _.get(customer, 'limit.wish.expiry.date')
                : null;
        const expiryAmountInContracting =
            limitType === 'APPLIED'
                ? _.get(customer, 'limit.applied.expiry.amount')
                : limitType === 'WISH'
                ? _.get(customer, 'limit.wish.expiry.amount')
                : null;
        const editableLimitExpiryInContracting =
            isContractingStepEditable &&
            amountInContracting != null &&
            !Number.isNaN(amountInContracting) &&
            expiryDateInContracting != null;
        return (
            <FormSection title={ts.limit} description={ts.limitdescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.chooseamount}</h4>
                    <Grid cols={4}>
                        {hasCurrentLimit ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentLimit}
                                onClick={() => {
                                    if (!isCurrentLimit) {
                                        this.setState({ amount: null });
                                        customer.onLimitAndExpiryChange(
                                            null,
                                            selectedProduct,
                                            selectedPeriod,
                                            selectedDebitType,
                                            null,
                                            null,
                                            'CURRENT',
                                            paymentMethodType
                                        );
                                    }
                                }}
                                disabled={readOnly}
                            >
                                <CRLimitSetting
                                    country={country}
                                    limit={currentAmount}
                                    limitAfterExpiry={currentExpiryAmount}
                                    expiryDate={currentExpiryDate}
                                />
                            </CheckCard>
                        ) : null}
                        {hasWishedRequest ? (
                            <CheckCard
                                title={ts.customerWish}
                                checked={isWishedRequest}
                                onClick={() => {
                                    if (!isWishedRequest) {
                                        this.setState({ amount: null });
                                        customer.onLimitAndExpiryChange(
                                            wishedAmount,
                                            selectedProduct,
                                            selectedPeriod,
                                            selectedDebitType,
                                            wishedExpiryAmount,
                                            wishedExpiryDate,
                                            'WISH',
                                            paymentMethodType
                                        );
                                    }
                                }}
                                disabled={editableLimitExpiryInContracting && isWishedRequest ? false : readOnly}
                            >
                                <CRLimitSetting
                                    country={country}
                                    limit={wishedAmount}
                                    limitAfterExpiry={wishedExpiryAmount}
                                    expiryDate={wishedExpiryDate}
                                />
                            </CheckCard>
                        ) : null}
                        {hasAppliedRequest ? (
                            <CheckCard
                                title={_.get(customer, 'limit.applied.position')}
                                checked={isAppliedRequest}
                                onClick={() => {
                                    if (!isAppliedRequest) {
                                        this.setState({ amount: null });
                                        customer.onLimitAndExpiryChange(
                                            appliedAmount,
                                            selectedProduct,
                                            selectedPeriod,
                                            selectedDebitType,
                                            appliedExpiryAmount,
                                            appliedExpiryDate,
                                            'APPLIED',
                                            paymentMethodType
                                        );
                                    }
                                }}
                                disabled={editableLimitExpiryInContracting && isAppliedRequest ? false : readOnly}
                            >
                                <CRLimitSetting
                                    country={country}
                                    limit={appliedAmount}
                                    limitAfterExpiry={appliedExpiryAmount}
                                    expiryDate={appliedExpiryDate}
                                />
                            </CheckCard>
                        ) : null}
                        <CheckCard
                            title={ts.new}
                            checked={isNewRequest}
                            onClick={() => {
                                if (!isNewRequest) {
                                    this.setState({ amount: null, newExpiryAmount: null });
                                    customer.onLimitAndExpiryChange(
                                        null,
                                        selectedProduct,
                                        selectedPeriod,
                                        selectedDebitType,
                                        null,
                                        null,
                                        'NEW',
                                        paymentMethodType
                                    );
                                }
                            }}
                            disabled={readOnly}
                        />
                    </Grid>
                    {isNewRequest ? (
                        <React.Fragment>
                            <h4 className="mrc-ui-form-label mt-5 mb-2">{ts.chooselimit}</h4>
                            <Card dropShadow>
                                <h4 className="mrc-ui-form-label mb-1">{ts.amount}</h4>
                                <Grid cols={3}>
                                    <FlexRow alignItems="baseline">
                                        <div className="mr-3">
                                            <NumberInput
                                                required={true}
                                                value={_.isNil(this.state.amount) ? '' : this.state.amount}
                                                onChange={(amount) => {
                                                    const val = parseFloat(amount);
                                                    const validAmount = !Number.isNaN(val) ? val : null;
                                                    this.setState({ amount: validAmount });
                                                    customer.onLimitChange(
                                                        validAmount,
                                                        selectedProduct,
                                                        selectedPeriod,
                                                        selectedDebitType,
                                                        'NEW',
                                                        paymentMethodType
                                                    );
                                                }}
                                                disabled={readOnly}
                                            />
                                        </div>
                                        <MrcCurrencySymbol country={country} />
                                    </FlexRow>
                                </Grid>
                                <h4 className="mrc-ui-form-label mt-4 mb-1">{ts.chooseexpiry}</h4>
                                <Grid cols={3}>
                                    <CheckCard
                                        title={ts.withoutExpiry}
                                        checked={isWithoutExpiry}
                                        onClick={() => {
                                            customer.onExpiryChange(null, null);
                                        }}
                                        disabled={readOnly}
                                    />
                                    <CheckCard
                                        title={ts.expiryDate}
                                        checked={!_.isNil(newExpiryDate)}
                                        disabled={readOnly}
                                    >
                                        <MrcDatePickerInput
                                            className="m-input-element"
                                            onChange={(date) =>
                                                customer.onExpiryChange(this.state.newExpiryAmount, date)
                                            }
                                            onBlur={(event) =>
                                                customer.onExpiryOnBlur(
                                                    this.state.newExpiryAmount,
                                                    event,
                                                    newExpiryDate
                                                )
                                            }
                                            selected={_.isNil(newExpiryDate) ? null : new Date(newExpiryDate)}
                                            showYearDropdown={true}
                                            dateFormat={dateFormat}
                                            minDate={new Date(new Date().getTime() + 86400000)} // + 1 day in ms
                                            placeholderText={dateFormat}
                                            id={'datepicker-' + customer.storeNumber + customer.number}
                                            disabled={readOnly}
                                        />
                                    </CheckCard>
                                    {/* TODO: tbd in future
                                    <GridItem alignSelf="center">
                                        <a>{ts.setExpiryDateForAll}</a>
                                    </GridItem>
                                    */}
                                </Grid>
                                {!_.isNil(newExpiryDate) ? (
                                    <h4 className="mrc-ui-form-label mt-4 mb-2">{ts.resetLimit}</h4>
                                ) : null}
                                {!_.isNil(newExpiryDate) ? (
                                    <Grid cols={3}>
                                        <FlexRow alignItems="baseline">
                                            <div className="mr-3">
                                                <NumberInput
                                                    required={true}
                                                    value={
                                                        _.isNil(this.state.newExpiryAmount)
                                                            ? ''
                                                            : this.state.newExpiryAmount
                                                    }
                                                    onChange={(amount) => {
                                                        const val = parseFloat(amount);
                                                        const validAmount = !Number.isNaN(val) ? val : null;
                                                        this.setState({ newExpiryAmount: validAmount });
                                                        customer.onExpiryChange(validAmount, newExpiryDate);
                                                    }}
                                                    disabled={readOnly}
                                                />
                                            </div>
                                            <MrcCurrencySymbol country={country} type="small" />
                                        </FlexRow>
                                    </Grid>
                                ) : null}
                            </Card>
                        </React.Fragment>
                    ) : null}
                    {this.createLimitExpiryUpdateInContracting(
                        editableLimitExpiryInContracting,
                        expiryDateInContracting,
                        expiryAmountInContracting,
                        customer,
                        dateFormat,
                        country,
                        ts
                    )}
                </React.Fragment>
            </FormSection>
        );
    }

    createLimitExpiryUpdateInContracting(
        editableLimitExpiryInContracting,
        expiryDateInContracting,
        expiryAmountInContracting,
        customer,
        dateFormat,
        country,
        ts
    ) {
        return editableLimitExpiryInContracting === true ? (
            <React.Fragment>
                <h4 className="mrc-ui-form-label mt-5 mb-2">{ts.updateexpiry}</h4>
                <Card dropShadow>
                    <h4 className="mrc-ui-form-label mt-4 mb-1">{ts.chooseexpiry}</h4>
                    <Grid cols={3}>
                        <CheckCard
                            title={ts.expiryDate}
                            checked={expiryDateInContracting}
                            disabled={!editableLimitExpiryInContracting}
                        >
                            <MrcDatePickerInput
                                className="m-input-element"
                                onChange={(date) => {
                                    if (date !== null) {
                                        customer.onExpiryChange(expiryAmountInContracting, date);
                                    } else {
                                        customer.onExpiryChange(expiryAmountInContracting, expiryDateInContracting);
                                    }
                                }}
                                onBlur={(event) =>
                                    customer.onExpiryOnBlur(expiryAmountInContracting, event, expiryDateInContracting)
                                }
                                selected={_.isNil(expiryDateInContracting) ? null : new Date(expiryDateInContracting)}
                                showYearDropdown={true}
                                dateFormat={dateFormat}
                                minDate={new Date(new Date().getTime() + 86400000)} // + 1 day in ms
                                placeholderText={dateFormat}
                                id={'datepicker-' + customer.storeNumber + customer.number}
                                disabled={!editableLimitExpiryInContracting}
                                required={true}
                            />
                        </CheckCard>
                    </Grid>
                    {!_.isNil(expiryDateInContracting) ? (
                        <h4 className="mrc-ui-form-label mt-4 mb-2">{ts.resetLimit}</h4>
                    ) : null}
                    {!_.isNil(expiryDateInContracting) ? (
                        <Grid cols={3}>
                            <MrcCurrency country={country} type="large-bold">
                                {expiryAmountInContracting}
                            </MrcCurrency>
                        </Grid>
                    ) : null}
                </Card>
            </React.Fragment>
        ) : null;
    }
}
