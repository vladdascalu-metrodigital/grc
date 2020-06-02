import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { NumberInput } from '../../NumberInput/index';
import MrcDatePickerInput from '../../DatePicker/index';
import getPossibleValues from '../../Util/creditData';
import CurrentValue from './CurrentValue';
import { lookup } from '../../Util/translations';
import CalendarIcon from '../../icons/calendar.svg';
import EditIcon from '../../icons/edit.svg';
import ChevronDownIcon from '../../icons/chevron-down.svg';

export default class CreditData extends Component {
    NULL_OPTION = [<option key="null" />];

    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
        this.handleLimitExpiryDateChange = this.handleLimitExpiryDateChange.bind(this);
        this.handleLimitExpiryDateOnBlur = this.handleLimitExpiryDateOnBlur.bind(this);
        this.handleApplyCurrentLimitAndExpiryChange = this.handleApplyCurrentLimitAndExpiryChange.bind(this);
        if (props.requestedItem) {
            this.props.registerCallbackOnApplyCurrentLimitAndExpiryChange(
                props.requestedItem.id,
                this.handleApplyCurrentLimitAndExpiryChange
            );
        }
    }

    /**
     * produce state from props
     * @param {*} props
     */
    stateFromProps(props) {
        const newCreditData = {
            amount: null,
            creditProduct: '',
            creditPeriod: '',
            debitType: '',
        };

        const previousLimitExpiryResetAmount =
            this.props.requestedItem &&
            this.props.requestedItem.currentLimitExpiry &&
            this.isNumber(this.props.requestedItem.currentLimitExpiry.resetToLimitAmount)
                ? this.props.requestedItem.currentLimitExpiry.resetToLimitAmount
                : null;
        const currentLimit =
            this.props.currentPayment.limit != null && !Number.isNaN(this.props.currentPayment.limit)
                ? this.props.currentPayment.limit
                : 0;
        const currentResetToLimitAmount =
            previousLimitExpiryResetAmount != null && !Number.isNaN(previousLimitExpiryResetAmount)
                ? previousLimitExpiryResetAmount
                : currentLimit;

        const newLimitExpiry = {
            limitExpiryDate: this.state && this.state.limitExpiryDate ? this.state.limitExpiryDate : null,
            limitExpiryReminderDays:
                this.state && this.state.limitExpiryReminderDays ? this.state.limitExpiryReminderDays : 14,
            resetToLimitAmount:
                this.state && this.state.resetToLimitAmount ? this.state.resetToLimitAmount : currentResetToLimitAmount,
        };
        const creditData = (props.requestedItem && props.requestedItem.creditData) || newCreditData;
        const limitExpiry = (props.requestedItem && props.requestedItem.requestedLimitExpiry) || newLimitExpiry;
        return {
            id: creditData.id,
            amount: parseFloat(creditData.amount == null || Number.isNaN(creditData.amount) ? '' : creditData.amount),
            creditProduct: creditData.creditProduct || '',
            creditPeriod: creditData.creditPeriod || '',
            debitType: creditData.debitType || '',
            limitExpiryDate: limitExpiry.limitExpiryDate,
            limitExpiryReminderDays: limitExpiry.limitExpiryReminderDays,
            resetToLimitAmount: limitExpiry.resetToLimitAmount,
            currentLimit: currentLimit,
            currentResetToLimitAmount: currentResetToLimitAmount,
        };
    }

    componentDidMount() {
        const valid = this.isValidCreditData();
        this.props.setValidity(valid);
    }

    /**
     * On props change, update the current state, persist it
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.props.applyCurrentPayments != prevProps.applyCurrentPayments) {
            const { amount, creditProduct, debitType, creditPeriod, id } = this.state;
            if (this.props.applyCurrentPayments && this.isNumber(this.state.currentLimit)) {
                const currentPayment = this.props.currentPayment;
                this.props.setCreditData({
                    id,
                    amount: amount,
                    creditProduct: currentPayment.payment ? currentPayment.payment.creditProduct : creditProduct,
                    creditPeriod: currentPayment.payment ? currentPayment.payment.creditPeriod : creditPeriod,
                    debitType: currentPayment.payment ? currentPayment.payment.debitType : debitType,
                });
            } else {
                this.props.setCreditData({
                    id,
                    amount: amount,
                    creditProduct: null,
                    creditPeriod: null,
                    debitType: null,
                });
            }
            this.setState(this.stateFromProps(this.props));
            const valid = this.isValidCreditData();
            this.props.setValidity(valid);
        } else if (prevState !== this.state) {
            if (this.isLimitExpiryChanged(prevState, this.state)) {
                const { limitExpiryDate, limitExpiryReminderDays, resetToLimitAmount } = this.state;
                this.props.setLimitExpiry(this.props.requestedItem.id, {
                    limitExpiryDate: limitExpiryDate === '' ? null : limitExpiryDate,
                    limitExpiryReminderDays: limitExpiryReminderDays === '' ? 14 : limitExpiryReminderDays,
                    resetToLimitAmount: resetToLimitAmount === '' ? 0 : resetToLimitAmount,
                });
            } else {
                const { amount, creditProduct, debitType, creditPeriod, id } = this.state;
                this.props.setCreditData({
                    id,
                    amount: amount === '' ? null : amount,
                    creditProduct: creditProduct === '' ? null : creditProduct,
                    creditPeriod: creditPeriod === '' ? null : creditPeriod,
                    debitType: debitType === '' ? null : debitType,
                });
                this.props.handleRequestedGroupLimitChange();
                if (amount == null || Number.isNaN(amount)) {
                    this.props.setLimitExpiry(this.props.requestedItem.id, {
                        limitExpiryDate: this.state.limitExpiryDate,
                        limitExpiryReminderDays: this.state.limitExpiryReminderDays,
                        resetToLimitAmount: this.state.resetToLimitAmount,
                    });
                }
            }
            const valid = this.isValidCreditData();
            this.props.setValidity(valid);
        }
    }

    isLimitExpiryChanged(prevState, currentState) {
        return (
            prevState.limitExpiryDate != currentState.limitExpiryDate ||
            prevState.limitExpiryReminderDays != currentState.limitExpiryReminderDays ||
            prevState.resetToLimitAmount != currentState.resetToLimitAmount
        );
    }

    /**
     * test current state to be valid CreditData
     * @returns {boolean}
     */
    isValidCreditData() {
        let creditData = this.state || {};
        // convert empty debotType to null which is the value used inavailablePayments
        creditData = creditData.debitType === '' ? { ...creditData, debitType: null } : creditData;
        if (
            (creditData.creditProduct == null || creditData.creditProduct == '') &&
            (creditData.creditPeriod == null || creditData.creditPeriod == '') &&
            (creditData.debitType == null || creditData.debitType == '') &&
            (creditData.amount == null || Number.isNaN(creditData.amount))
        ) {
            return null;
        }
        if (
            (creditData.creditProduct == null || creditData.creditProduct == '') &&
            (creditData.amount == null || Number.isNaN(creditData.amount))
        ) {
            return null;
        }
        const matchingAvailablePayments = this.props.requestedItem.customer.availablePayments.filter(
            ap =>
                (ap.creditProduct === creditData.creditProduct ||
                    'mrc.payment.' + ap.creditProduct.split(' ').join('_') === creditData.creditProduct) &&
                (ap.creditPeriod === creditData.creditPeriod ||
                    'mrc.payment.' + ap.creditPeriod.split(' ').join('_') === creditData.creditPeriod) &&
                (ap.debitType === creditData.debitType ||
                    'mrc.payment.' + ap.debitType.split(' ').join('_') === creditData.debitType)
        );
        return matchingAvailablePayments.length === 1 && !Number.isNaN(creditData.amount);
    }

    render() {
        console.log(JSON.stringify(this.props));
        let noDebitTypesToSelect = false;
        let noCreditPeriodsToSelect = false;
        if (this.props.requestedItem.customer.availablePayments) {
            noDebitTypesToSelect =
                this.extractDebitTypes(this.props.requestedItem.customer.availablePayments).length === 0;
            noCreditPeriodsToSelect =
                this.extractCreditPeriods(this.props.requestedItem.customer.availablePayments).length === 0;
        }
        const currentPayment = this.props.currentPayment;
        const validAmount = this.state.amount != null && !Number.isNaN(this.state.amount);
        const currentLimit = this.state.currentLimit;
        const currentLimitExpiry = this.props.requestedItem ? this.props.requestedItem.currentLimitExpiry : null;
        const { limitExpiryReminderDays, resetToLimitAmount } = this.state;
        const limitExpiryDate = this.state.limitExpiryDate ? new Date(this.state.limitExpiryDate) : null;
        const enabledLimitExpiry = limitExpiryDate != null;
        const currentLimitForPrefill = this.state.amount;

        return (
            <div className="mrc-credit-data mrc-grid col-2 mrc-input-group">
                {this.showCustomerWarnings(this.props.requestedItem.customer)}
                <div className="mrc-grid-left">
                    <div className="mrc-input credit-limit">
                        <label>{lookup('mrc.creditdetails.creditlimit')}</label>
                        <CurrentValue
                            country={this.props.requestedItem.customer.country}
                            type="limit"
                            value={currentPayment.limit}
                        />
                        <NumberInput
                            className="m-input-element"
                            name="creditLimit"
                            initialValue={this.state.amount}
                            onChange={this.handleAmountChange}
                            shouldBePrefilledWith={currentLimitForPrefill}
                            disabled={!this.props.paymentReadyToBeSelected}
                            id={'amount-' + this.props.requestedItem.id}
                        />
                        <img
                            htmlFor={'amount-' + this.props.requestedItem.id}
                            className="mrc-icon-small mrc-edit-icon"
                            src={EditIcon}
                        />
                    </div>
                    <fieldset>
                        <div className="mrc-input mrc-limit-expiry">
                            <label>{lookup('mrc.creditdetails.limitExpiry')}</label>
                            <CurrentValue
                                type="expiry"
                                country={this.props.requestedItem.customer.country}
                                value={currentLimitExpiry}
                            />
                            <div className="mrc-input">
                                <MrcDatePickerInput
                                    className="m-input-element"
                                    onChange={this.handleLimitExpiryDateChange}
                                    onBlur={this.handleLimitExpiryDateOnBlur}
                                    selected={limitExpiryDate}
                                    disabled={!validAmount}
                                    minDate={new Date(new Date().getTime() + 86400000)} // + 1 day in ms
                                    showYearDropdown={true}
                                    dateFormat={this.props.dateFormat}
                                    placeholderText={this.props.dateFormat}
                                    id={'datepicker-' + this.props.requestedItem.id}
                                />
                                <img
                                    htmlFor={'datepicker-' + this.props.requestedItem.id}
                                    className="mrc-icon-small date-picker-icon"
                                    src={CalendarIcon}
                                />
                            </div>
                            <div className="mrc-radio-button">
                                <label className="m-radioButton" htmlFor={'reminder-' + this.props.requestedItem.id}>
                                    <input
                                        type="checkbox"
                                        className="m-radioButton-input"
                                        id={'reminder-' + this.props.requestedItem.id}
                                        name="reminder"
                                        value="14"
                                        disabled={enabledLimitExpiry === false}
                                        onChange={this.handleLimitExpiryReminderDaysClick}
                                        checked={limitExpiryReminderDays == 14}
                                    />
                                    <div className="m-radioButton-inputIcon" />
                                    <span className="m-radioButton-label">
                                        <p>{lookup('mrc.creditdetails.limitExpiryReminderDays')}.</p>
                                    </span>
                                </label>
                            </div>
                            {resetToLimitAmount == 0 ? null : (
                                <div className="mrc-radio-button">
                                    <label
                                        className="m-radioButton"
                                        htmlFor={'reset-current-' + this.props.requestedItem.id}
                                    >
                                        <input
                                            type="radio"
                                            className="m-radioButton-input"
                                            id={'reset-current-' + this.props.requestedItem.id}
                                            name={'reset-' + this.props.requestedItem.id}
                                            value={resetToLimitAmount}
                                            onChange={this.handleResetToCurrentChange}
                                            disabled={enabledLimitExpiry === false}
                                            checked={resetToLimitAmount == currentLimit || resetToLimitAmount != 0}
                                        />
                                        <div className="m-raidoButton-raidoIcon m-radioButton-inputIcon" />
                                        <span className="m-radioButton-label">
                                            <p>
                                                {lookup('mrc.creditdetails.limitExpiryResetToCurrent')} (
                                                <mrc-number
                                                    show-currency-for-country={
                                                        this.props.requestedItem.customer.country
                                                    }
                                                >
                                                    {resetToLimitAmount}
                                                </mrc-number>
                                                ).
                                            </p>
                                        </span>
                                    </label>
                                </div>
                            )}
                            <div className="mrc-radio-button">
                                <label className="m-radioButton" htmlFor={'reset-zero-' + this.props.requestedItem.id}>
                                    <input
                                        type="radio"
                                        className="m-radioButton-input"
                                        id={'reset-zero-' + this.props.requestedItem.id}
                                        name={'reset-' + this.props.requestedItem.id}
                                        value="0"
                                        onChange={this.handleResetToZeroChange}
                                        disabled={enabledLimitExpiry === false}
                                        checked={0 == resetToLimitAmount}
                                    />
                                    <div className="m-raidoButton-raidoIcon m-radioButton-inputIcon" />
                                    <span className="m-radioButton-label">
                                        <p>{lookup('mrc.creditdetails.limitExpiryResetToZero')}.</p>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mrc-grid-right">
                    <div className="mrc-input">
                        <label>{lookup('mrc.creditdetails.creditproduct')}</label>
                        <CurrentValue
                            type="creditProduct"
                            value={currentPayment.payment && this.lookupPayment(currentPayment.payment.creditProduct)}
                        />
                        <select
                            name="creditProduct"
                            className="m-input-element"
                            id={'creditproduct-' + this.props.requestedItem.id}
                            onChange={this.handleCreditProductChange}
                            value={
                                this.state.creditProduct.includes('mrc.payment.')
                                    ? this.state.creditProduct
                                    : 'mrc.payment.' + this.state.creditProduct.split(' ').join('_')
                            }
                            disabled={!this.props.paymentReadyToBeSelected}
                        >
                            {this.createCreditProductOptions()}
                        </select>
                        <img
                            htmlFor={'creditproduct-' + this.props.requestedItem.id}
                            className="mrc-icon-small mrc-down-icon"
                            src={ChevronDownIcon}
                        />
                    </div>
                    <div className="mrc-input">
                        <label>{lookup('mrc.creditdetails.creditperiod')}</label>
                        <CurrentValue
                            type="creditPeriod"
                            value={currentPayment.payment && this.lookupPayment(currentPayment.payment.creditPeriod)}
                        />
                        <select
                            name="creditPeriod"
                            className="m-input-element"
                            id={'creditperiod-' + this.props.requestedItem.id}
                            onChange={this.handleCreditPeriodChange}
                            value={
                                this.state.creditPeriod.includes('mrc.payment.')
                                    ? this.state.creditPeriod
                                    : 'mrc.payment.' + this.state.creditPeriod.split(' ').join('_')
                            }
                            disabled={!this.props.paymentReadyToBeSelected || noCreditPeriodsToSelect}
                        >
                            {this.createCreditPeriodOptions()}
                        </select>
                        <img
                            htmlFor={'creditperiod-' + this.props.requestedItem.id}
                            className="mrc-icon-small mrc-down-icon"
                            src={ChevronDownIcon}
                        />
                    </div>
                    <div className="mrc-input">
                        <label>{lookup('mrc.creditdetails.debitType')}</label>
                        <CurrentValue
                            type="debitType"
                            value={currentPayment.payment && this.lookupPayment(currentPayment.payment.debitType)}
                        />
                        <select
                            name="debitType"
                            className="m-input-element"
                            id={'debitType-' + this.props.requestedItem.id}
                            onChange={this.handleDebitTypeChange}
                            value={
                                this.state.debitType.includes('mrc.payment.')
                                    ? this.state.debitType
                                    : this.state.debitType !== null || this.state.debitType !== ''
                                    ? 'mrc.payment.' + this.state.debitType.split(' ').join('_')
                                    : ''
                            }
                            disabled={!this.props.paymentReadyToBeSelected || noDebitTypesToSelect}
                        >
                            {this.createDebitTypeOptions()}
                        </select>
                        <img
                            htmlFor={'debitType-' + this.props.requestedItem.id}
                            className="mrc-icon-small mrc-down-icon"
                            src={ChevronDownIcon}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // called only when checkbox for apply current limit and existing expires data was clicked
    calculateCurrentLimitExpiryDate(id, applyCurrentLimitAndExpiry) {
        const currentLimit = this.state.currentLimit;
        const currentLimitExpiry = this.props.requestedItem ? this.props.requestedItem.currentLimitExpiry : null;

        // keep values from state or revert to defaults (=> null / 14 / current reset amount or current limit)
        let calculatedCurrentLimit = null;
        let limitExpiryDate = null;
        let limitExpiryReminderDays = 14;
        let resetToLimitAmount = this.state.currentResetToLimitAmount;

        if (applyCurrentLimitAndExpiry && this.isNumber(currentLimit)) {
            // the checkbox is checked => apply current limit and current expiry info
            limitExpiryDate =
                currentLimitExpiry && currentLimitExpiry.limitExpiryDate
                    ? new Date(currentLimitExpiry.limitExpiryDate)
                    : null;
            calculatedCurrentLimit = currentLimit;
        } else {
            // the checkbox is unchecked => clear limit and expiry info
            limitExpiryDate = null;
            calculatedCurrentLimit = null;
        }

        // save on state
        this.setState({
            amount: calculatedCurrentLimit,
            limitExpiryDate: limitExpiryDate,
            limitExpiryReminderDays: limitExpiryReminderDays,
            resetToLimitAmount: resetToLimitAmount,
        });
    }

    isNumber(value) {
        if (value !== undefined && value !== null && value !== '' && !isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }

    toOption(t) {
        let tLookup = t;
        if (!t.includes('mrc.payment.')) tLookup = 'mrc.payment.' + t.split(' ').join('_');
        return (
            <option key={tLookup} value={tLookup}>
                {lookup(tLookup)}
            </option>
        );
    }

    createCreditProductOptions() {
        return this.NULL_OPTION.concat(
            getPossibleValues(this.props.requestedItem.customer.availablePayments, null, null).map(this.toOption)
        );
    }

    createCreditPeriodOptions() {
        return this.NULL_OPTION.concat(this.extractCreditPeriods().map(this.toOption));
    }

    extractCreditPeriods() {
        return getPossibleValues(this.props.requestedItem.customer.availablePayments, this.state.creditProduct, null);
    }

    createDebitTypeOptions() {
        return this.NULL_OPTION.concat(this.extractDebitTypes().map(this.toOption));
    }

    extractDebitTypes() {
        return getPossibleValues(
            this.props.requestedItem.customer.availablePayments,
            this.state.creditProduct,
            this.state.creditPeriod
        );
    }

    handleCreditProductChange = event => {
        let selected = event.target.value;
        this.handleAutoFillCombos({ creditProduct: selected });
    };

    handleCreditPeriodChange = event => {
        let selected = event.target.value;
        this.handleAutoFillCombos({ creditPeriod: selected });
    };

    handleDebitTypeChange = event => {
        let selected = event.target.value;
        this.handleAutoFillCombos({ debitType: selected });
    };

    handleAmountChange = amount => {
        this.setState({ amount: parseFloat(amount) });
        if (amount == null || Number.isNaN(amount)) {
            this.setState({
                limitExpiryDate: null,
                limitExpiryReminderDays: 14,
                resetToLimitAmount: this.state.currentResetToLimitAmount,
            });
        }
    };

    handleLimitExpiryReminderDaysClick = event => {
        let days = event.target.checked ? event.target.value : 1;
        this.setState({ limitExpiryReminderDays: days });
    };

    handleLimitExpiryDateChange(date) {
        this.setState({ limitExpiryDate: date });
    }

    handleLimitExpiryDateOnBlur(event) {
        const date = new Date(event.target.value);
        if (date >= new Date() + 1) {
            this.handleLimitExpiryDateChange(date);
        } else {
            this.handleLimitExpiryDateChange(
                this.state.limitExpiryDate == null ? null : new Date(this.state.limitExpiryDate)
            );
        }
    }

    handleApplyCurrentLimitAndExpiryChange(id, applyCurrentLimitAndExpiry) {
        if (applyCurrentLimitAndExpiry !== undefined && applyCurrentLimitAndExpiry !== null) {
            this.calculateCurrentLimitExpiryDate(id, applyCurrentLimitAndExpiry);
        }
    }

    handleResetToZeroChange = event => {
        let limit = event.target.value;
        this.setState({ resetToLimitAmount: limit });
    };

    handleResetToCurrentChange = event => {
        let limit = event.target.value;
        this.setState({ resetToLimitAmount: limit });
    };

    handleAutoFillCombos = changed_state => {
        if (changed_state.creditProduct !== undefined && changed_state.creditProduct !== '') {
            changed_state.debitType = '';
            changed_state.creditPeriod = '';
            if (
                getPossibleValues(
                    this.props.requestedItem.customer.availablePayments,
                    changed_state.creditProduct,
                    null
                ).length === 1
            ) {
                let creditPeriod = getPossibleValues(
                    this.props.requestedItem.customer.availablePayments,
                    changed_state.creditProduct,
                    null
                )[0];
                changed_state.creditPeriod = creditPeriod.includes('mrc.payment.')
                    ? creditPeriod
                    : 'mrc.payment.' + creditPeriod.split(' ').join('_');
            }
        }
        if (changed_state.creditPeriod !== undefined && changed_state.creditPeriod !== '') {
            const creditProductConstant = changed_state.creditProduct || this.state.creditProduct;
            changed_state.debitType = '';
            if (
                getPossibleValues(
                    this.props.requestedItem.customer.availablePayments,
                    creditProductConstant,
                    changed_state.creditPeriod
                ).length === 1
            ) {
                let debitType = getPossibleValues(
                    this.props.requestedItem.customer.availablePayments,
                    creditProductConstant,
                    changed_state.creditPeriod
                )[0];
                changed_state.debitType = debitType.includes('mrc.payment.')
                    ? debitType
                    : 'mrc.payment.' + debitType.split(' ').join('_');
            }
        }
        if (changed_state.creditProduct !== undefined && changed_state.creditProduct === '') {
            changed_state.debitType = '';
            changed_state.creditPeriod = '';
        }
        if (changed_state.creditPeriod !== undefined && changed_state.creditPeriod === '') {
            changed_state.debitType = '';
        }

        this.setState(changed_state);
    };

    lookupPayment = payment => {
        if (!payment || payment.length <= 0) return '';
        let lookupValue = payment;
        if (!payment.includes('mrc.payment.')) lookupValue = 'mrc.payment.' + payment.split(' ').join('_');
        return lookup(lookupValue);
    };

    showCustomerWarnings(customer) {
        const countriesWithDifferentBlockingCodes = this.props.countriesWithDifferentBlockingCodes;
        const msgKeyPartCountry =
            customer.country &&
            countriesWithDifferentBlockingCodes &&
            countriesWithDifferentBlockingCodes.length > 0 &&
            countriesWithDifferentBlockingCodes.includes(customer.country)
                ? customer.country + '.'
                : '';
        var blockingContent = null;
        if (
            (customer.blockingReason != undefined && customer.blockingReason != null) ||
            (customer.checkoutCheckCode != undefined && customer.checkoutCheckCode != null)
        ) {
            blockingContent = (
                <div className="mrc-block-list">
                    <dl>
                        {customer.blockingReason != undefined &&
                            customer.blockingReason != null && [
                                <dt key="dt">{lookup('mrc.blockingReason')}</dt>,
                                <dd key="dd">
                                    {lookup(
                                        'mrc.blockingReason.message.' + msgKeyPartCountry + customer.blockingReason
                                    )}
                                </dd>,
                            ]}
                        {customer.checkoutCheckCode != undefined &&
                            customer.checkoutCheckCode != null && [
                                <dt key="dt">{lookup('mrc.checkoutCheckCode')}</dt>,
                                <dd key="dd">
                                    {lookup(
                                        'mrc.checkoutCheckCode.message.' +
                                            msgKeyPartCountry +
                                            customer.checkoutCheckCode
                                    )}
                                </dd>,
                            ]}
                    </dl>
                </div>
            );
        }

        return blockingContent;
    }
}

CreditData.propTypes = {
    headerTitle: PropTypes.string,
    requestedItem: PropTypes.object,
    paymentReadyToBeSelected: PropTypes.bool.isRequired,
    setCreditData: PropTypes.func.isRequired,
    setLimitExpiry: PropTypes.func.isRequired,
    setValidity: PropTypes.func,
    handleRequestedGroupLimitChange: PropTypes.func,
    applyCurrentLimitAndExpiry: PropTypes.bool.isRequired,
    applyCurrentPayments: PropTypes.bool.isRequired,
    isApplyCurrentLimitAndExpiryClicked: PropTypes.bool.isRequired,
    dateFormat: PropTypes.string.isRequired,
    currentPayment: PropTypes.object.isRequired,
    registerCallbackOnApplyCurrentLimitAndExpiryChange: PropTypes.func.isRequired,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
