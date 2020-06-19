import React, { Component } from 'react';
import CreditTableFormSection from './CreditTableFormSection';
import { translations as ts } from './index';
import Grid from '../../Grid';
import Card from '../../Card';
import CRLimitSetting from './CRLimitSetting';
import { FlexRow } from '../../Flex';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import MrcDatePickerInput from '../../DatePicker';
import NumberInput from '../../NumberInputNew';
import MrcCurrency from '../../MrcCurrency';
import CheckCard from '../../CheckCard';
import { translatePaymentIfNeeded } from '../../Util/paymentMethodsUtils';

import * as _ from 'lodash';

const _new = (parent, customer, field) => {
    const prefix = parent === 'approval' ? 'limit.new' : 'limit.wish';
    return _.get(customer, prefix + (field ? '.' + field : ''));
};

export default class LimitSection extends Component {
    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
    }

    stateFromProps(props) {
        //TODO: status for approve
        const { customer } = props;
        return {
            amount: _.get(customer, 'limit.wish.amount'),
        };
    }

    render() {
        const { parent } = this.props;
        return parent === 'approval' ? this.renderApproval() : this.renderCredit();
    }

    renderCredit() {
        const { customer, dateFormat } = this.props;

        // chosen data type
        const limitType = _.isNil(_.get(customer, 'limit.limitType')) ? 'CURRENT' : _.get(customer, 'limit.limitType');
        const paymentMethodType = _.isNil(_.get(customer, 'limit.paymentMethodType'))
            ? 'CURRENT'
            : _.get(customer, 'limit.paymentMethodType');

        // current data
        const currentAmount = _.get(customer, 'limit.current.amount');
        const currentExpiryAmount = _.get(customer, 'limit.current.expiry.amount');
        const currentExpiryAmountOption = _.isNil(currentExpiryAmount) ? currentAmount : currentExpiryAmount;
        const currentExpiryDate = _.get(customer, 'limit.current.expiry.date');

        // requested data
        const wishedExpiryAmount = _.get(customer, 'limit.wish.expiry.amount');
        const wishedExpiryDate = _.get(customer, 'limit.wish.expiry.date');

        const wishedAmount = _.get(customer, 'limit.wish.amount');
        const wishedProduct =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.product'));
        const wishedPeriod =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.period'));
        const wishedDebitType =
            paymentMethodType === 'CURRENT' ? null : translatePaymentIfNeeded(_.get(customer, 'limit.wish.debitType'));

        const hasCurrentLimit = !_.isNil(currentAmount) && !customer.isCashCustomer;
        const isCurrentLimit = _.isNil(wishedAmount) && limitType === 'CURRENT' && hasCurrentLimit;
        const isNewRequest = !isCurrentLimit || !hasCurrentLimit;
        const isWithoutExpiry = _.isNil(wishedExpiryDate);

        const defaultLimitExpiryAmount = _.isNil(wishedExpiryAmount) ? currentExpiryAmountOption : wishedExpiryAmount;
        return (
            <CreditTableFormSection title={ts.limit} description={ts.limitdescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.chooseamount}</h4>
                    <Grid cols={4}>
                        {hasCurrentLimit ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentLimit}
                                onClick={() => {
                                    this.setState({ amount: null });
                                    customer.onLimitAndExpiryChange(
                                        null,
                                        wishedProduct,
                                        wishedPeriod,
                                        wishedDebitType,
                                        null,
                                        null,
                                        'CURRENT',
                                        paymentMethodType
                                    );
                                }}
                            >
                                <CRLimitSetting
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
                                        wishedProduct,
                                        wishedPeriod,
                                        wishedDebitType,
                                        null,
                                        null,
                                        'WISH',
                                        paymentMethodType
                                    );
                                }
                            }}
                        >
                            <CRLimitSetting
                                limit={wishedAmount}
                                limitAfterExpiry={wishedExpiryAmount}
                                expiryDate={wishedExpiryDate}
                            />
                        </CheckCard>
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
                                                    this.setState({ amount: amount });
                                                    if (amount === null || amount === '') {
                                                        customer.onLimitChange(
                                                            null,
                                                            wishedProduct,
                                                            wishedPeriod,
                                                            wishedDebitType,
                                                            'WISH',
                                                            paymentMethodType
                                                        );
                                                    }
                                                    const val = parseFloat(amount);
                                                    if (amount === 'null' || !Number.isNaN(val)) {
                                                        customer.onLimitChange(
                                                            val,
                                                            wishedProduct,
                                                            wishedPeriod,
                                                            wishedDebitType,
                                                            'WISH',
                                                            paymentMethodType
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                        <MrcCurrencySymbol />
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
                                    />
                                    <CheckCard title={ts.expiryDate} checked={!_.isNil(wishedExpiryDate)}>
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
                                            id={'datepicker-' + this.props.customer.storeNumber + this.props.number}
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
                                        >
                                            <MrcCurrency type="large-bold">0</MrcCurrency>
                                        </CheckCard>
                                        {!_.isNil(currentExpiryAmountOption) && currentExpiryAmountOption !== 0 ? (
                                            <CheckCard
                                                title={ts.current}
                                                checked={wishedExpiryAmount === currentExpiryAmountOption}
                                                onClick={() => {
                                                    customer.onExpiryChange(currentExpiryAmount, wishedExpiryDate);
                                                }}
                                            >
                                                <MrcCurrency type="large-bold">{currentExpiryAmount}</MrcCurrency>
                                            </CheckCard>
                                        ) : null}
                                    </Grid>
                                ) : null}
                            </Card>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            </CreditTableFormSection>
        );
    }

    renderApproval() {
        const { customer, parent } = this.props;
        // current data
        const currentAmount = _.get(customer, 'limit.current.amount');
        const currentExpiryAmount = _.get(customer, 'limit.current.expiry.amount');
        const currentExpiryDate = _.isNil(_.get(customer, 'limit.current.expiry.date'))
            ? null
            : new Date(_.get(customer, 'limit.current.expiry.date'));

        // requested or approved data
        const wishedForExpiryAmount = _.get(customer, 'limit.wish.expiry.amount');
        const wishedForExpiryDate = _.get(customer, 'limit.wish.expiry.date');
        const wishedAmount = _.get(customer, 'limit.wish.amount');
        const newAmount = _.get(customer, 'limit.new.amount');

        // TODO: check in approval service one by one
        const newProduct = _new(parent, customer, 'product');
        const newPeriod = _new(parent, customer, 'period');
        const newDebitType = _new(parent, customer, 'debitType');

        const isCurrentRequest = _.isNil(wishedAmount) && _.isNil(newAmount);
        // TODO: this must be adapted for approval service we also need isApprovedRequest
        const isNewRequest = !_.isNil(_new(parent, customer)) && !isCurrentRequest;
        const hasLimit = !_.isNil(currentAmount);
        const isWithoutExpiry = _.isNil(wishedForExpiryAmount) || _.isNil(wishedForExpiryDate);

        return (
            <CreditTableFormSection title={ts.limit} description={ts.limitdescription}>
                <React.Fragment>
                    <h4 className="mrc-ui-form-label mb-2">{ts.chooseamount}</h4>
                    <Grid cols={4}>
                        {hasLimit ? (
                            <CheckCard
                                title={ts.current}
                                checked={isCurrentRequest}
                                onClick={() => {
                                    customer.onLimitAndExpiryChange(
                                        currentAmount === 0 ? null : currentAmount,
                                        newProduct,
                                        newPeriod,
                                        newDebitType,
                                        currentExpiryAmount,
                                        currentExpiryDate,
                                        'CURRENT'
                                    );
                                }}
                            >
                                <CRLimitSetting
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
                                customer.onLimitAndExpiryChange(null, newProduct, newPeriod, newDebitType, null, null);
                            }}
                        >
                            <CRLimitSetting limit={null} limitAfterExpiry={null} expiryDate={null} />
                        </CheckCard>
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
                                                value={wishedAmount}
                                                onBlur={() => {
                                                    customer.onLimitChange(
                                                        wishedAmount,
                                                        newProduct,
                                                        newPeriod,
                                                        newDebitType,
                                                        'WISH',
                                                        null
                                                    );
                                                }}
                                                onChange={(x) => this.setState({ amount: x })}
                                            />
                                        </div>
                                        <MrcCurrencySymbol />
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
                                    />
                                    <CheckCard title={ts.expiryDate} checked={!_.isNil(wishedForExpiryDate)}>
                                        <MrcDatePickerInput
                                            className="m-input-element"
                                            onChange={(date) => customer.onExpiryChange(wishedForExpiryAmount, date)}
                                            selected={
                                                !_.isNil(wishedForExpiryDate) ? new Date(wishedForExpiryDate) : null
                                            }
                                            showYearDropdown={true}
                                            dateFormat={'MM/dd/yyyy'}
                                        />
                                    </CheckCard>
                                    {/* TODO:
                                    <GridItem alignSelf="center">
                                        <a>{ts.setExpiryDateForAll}</a>
                                    </GridItem>
                                    */}
                                </Grid>
                                <h4 className="mrc-ui-form-label mt-4 mb-2">{ts.resetLimit}</h4>
                                {!_.isNil(wishedForExpiryDate) ? (
                                    <Grid cols={3}>
                                        <CheckCard
                                            checked={wishedForExpiryAmount === 0}
                                            onClick={() => {
                                                customer.onExpiryChange(0, wishedForExpiryDate);
                                            }}
                                        >
                                            <MrcCurrency type="large-bold">0</MrcCurrency>
                                        </CheckCard>
                                        {currentExpiryAmount ? (
                                            <CheckCard
                                                title={ts.current}
                                                checked={wishedForExpiryAmount === currentExpiryAmount}
                                                onClick={() => {
                                                    customer.onExpiryChange(currentExpiryAmount, wishedForExpiryDate);
                                                }}
                                            >
                                                <MrcCurrency type="large-bold">{currentExpiryAmount}</MrcCurrency>
                                            </CheckCard>
                                        ) : null}
                                        {/* TODO: only in approval service!
                                        <CheckCard
                                            title={ts.pick}
                                            checked={
                                                wishedForExpiryAmount !== 0 &&
                                                !_.isNil(wishedForExpiryAmount) &&
                                                (currentExpiryAmount
                                                    ? wishedForExpiryAmount !== currentExpiryAmount
                                                    : true)
                                            }
                                            onClick={() => {
                                                this.state.expiryAmount &&
                                                    customer.onExpiryChange(
                                                        this.state.expiryAmount,
                                                        wishedForExpiryDate
                                                    );
                                            }}
                                        >
                                            <FlexRow alignItems="baseline">
                                                <div className="mr-3">
                                                    <NumberInput
                                                        onBlur={() => {
                                                            customer.onExpiryChange(
                                                                this.state.expiryAmount,
                                                                wishedForExpiryDate
                                                            );
                                                        }}
                                                        onChange={x => {
                                                            this.setState({ expiryAmount: x });
                                                        }}
                                                    />
                                                </div>
                                                <MrcCurrencySymbol type="small" />
                                            </FlexRow>
                                        </CheckCard>
                                        */}
                                    </Grid>
                                ) : null}
                            </Card>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            </CreditTableFormSection>
        );
    }
}
