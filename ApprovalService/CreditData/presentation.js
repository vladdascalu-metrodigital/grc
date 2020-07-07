import React, { Component } from 'react';
import '../../tabs.scss';
import './index.scss';
import CreditDataEditor from '../CreditDataEditor/presentation';
import getPossibleValues from '../../Util/creditData';
import { lookup } from '../../Util/translations';
import MrcDatePickerInput from '../../DatePicker/index';
import CalendarIcon from '../../icons/calendar.svg';
import EditIcon from '../../icons/edit.svg';
import MrcNumber from '../../MrcNumber';

import * as util from '../ApprovalProcess/util';

import * as _ from 'lodash';

export default class CreditData extends Component {
    NULL_OPTION = [<option key="null" />];

    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
        this.handleAmountChanged = this.handleAmountChanged.bind(this);
        this.handleCreditProductChange = this.handleCreditProductChange.bind(this);
        this.handleCreditPeriodChange = this.handleCreditPeriodChange.bind(this);
        this.handleDebitTypeChange = this.handleDebitTypeChange.bind(this);
        this.createCreditProductOptions = this.createCreditProductOptions.bind(this);
        this.createCreditPeriodOptions = this.createCreditPeriodOptions.bind(this);
        this.createDebitTypeOptions = this.createDebitTypeOptions.bind(this);
        this.handleLimitExpiryDateChange = this.handleLimitExpiryDateChange.bind(this);
        this.handleLimitExpiryDateOnBlur = this.handleLimitExpiryDateOnBlur.bind(this);
        this.handleLimitExpiryResetChange = this.handleLimitExpiryResetChange.bind(this);
        this.handleLimitExpiryResetOnBlur = this.handleLimitExpiryResetOnBlur.bind(this);
        this.handleAmountOnBlur = this.handleAmountOnBlur.bind(this);
        this.setCreditDataIfValid = this.setCreditDataIfValid.bind(this);

        this.publishEnteredCreditData();
    }

    componentDidMount() {
        this.props.handleAmountChange(this.state.creditData.amount, this.props.index);
    }

    stateFromProps(props) {
        const initialCreditData = this.props.approved;
        const newLimitExpiry = {
            limitExpiryDate: null,
            resetToLimitAmount: 0,
        };
        const limitExpiry = (props.approvalItem && props.approvalItem.requestedLimitExpiry) || newLimitExpiry;
        return {
            creditData: this.toInternalRepresentation(initialCreditData),
            limitExpiryDate: limitExpiry.limitExpiryDate,
            resetToLimitAmount: limitExpiry.resetToLimitAmount,
            saveLimitExpiryChange: false,
        };
    }

    toInternalRepresentation(externalCreditData) {
        const result = {
            id: externalCreditData.id,
            amount: externalCreditData.amount,
            creditProduct: externalCreditData.creditProduct,
            creditPeriod: externalCreditData.creditPeriod,
            debitType: externalCreditData.debitType,
        };
        if (!result.debitType) {
            result.debitType = '';
        }
        return result;
    }

    toExternalRepresentation(internalCreditData) {
        const result = { ...internalCreditData };
        if (internalCreditData.debitType === '') {
            result.debitType = null;
        }
        return result;
    }

    isValidCreditData(creditData) {
        if (this.props.approvalItem.customer.requestedCustomer === true) {
            if (Number.isNaN(creditData.amount) || creditData.amount == null || creditData.amount === '') {
                return false;
            }
            const matchingAvailablePayments = this.props.availablePayments
                .map(this.toInternalRepresentation)
                .filter(
                    (ap) =>
                        (ap.creditProduct === creditData.creditProduct ||
                            'mrc.payment.' + ap.creditProduct.split(' ').join('_').toLowerCase() ===
                                (creditData.creditProduct && creditData.creditProduct !== null
                                    ? creditData.creditProduct.toLowerCase()
                                    : '')) &&
                        (ap.creditPeriod === creditData.creditPeriod ||
                            'mrc.payment.' + ap.creditPeriod.split(' ').join('_').toLowerCase() ===
                                (creditData.creditPeriod && creditData.creditPeriod !== null
                                    ? creditData.creditPeriod.toLowerCase()
                                    : '')) &&
                        (ap.debitType === creditData.debitType ||
                            'mrc.payment.' + ap.debitType.split(' ').join('_').toLowerCase() ===
                                (creditData.debitType && creditData.debitType !== null
                                    ? creditData.debitType.toLowerCase()
                                    : ''))
                );
            return matchingAvailablePayments.length === 1;
        }

        if (
            (Number.isNaN(creditData.amount) || creditData.amount == null || creditData.amount === '') &&
            (creditData.creditProduct == null || creditData.creditProduct === '') &&
            (creditData.creditPeriod == null || creditData.creditPeriod === '') &&
            (creditData.debitType === '' || creditData.debitType == null)
        ) {
            return true;
        }
        const matchingAvailablePayments = this.props.availablePayments
            .map(this.toInternalRepresentation)
            .filter(
                (ap) =>
                    (ap.creditProduct === creditData.creditProduct ||
                        'mrc.payment.' + ap.creditProduct.split(' ').join('_').toLowerCase() ===
                            (creditData.creditProduct && creditData.creditProduct !== null
                                ? creditData.creditProduct.toLowerCase()
                                : '')) &&
                    (ap.creditPeriod === creditData.creditPeriod ||
                        'mrc.payment.' + ap.creditPeriod.split(' ').join('_').toLowerCase() ===
                            (creditData.creditPeriod && creditData.creditPeriod !== null
                                ? creditData.creditPeriod.toLowerCase()
                                : '')) &&
                    (ap.debitType === creditData.debitType ||
                        'mrc.payment.' + ap.debitType.split(' ').join('_').toLowerCase() ===
                            (creditData.debitType && creditData.debitType !== null
                                ? creditData.debitType.toLowerCase()
                                : ''))
            );
        return matchingAvailablePayments.length === 1 && !Number.isNaN(creditData.amount);
    }

    publishEnteredCreditData() {
        const enteredCreditData = this.state.creditData;
        const creditData = { ...enteredCreditData, amount: parseInt(enteredCreditData.amount) };

        // notify parent about new data and it's validity
        this.props.creditDataEntered(this.toExternalRepresentation(creditData), this.isValidCreditData(creditData));
    }

    render() {
        const attrs = {
            current: this.props.current,
            requested: this.props.requested,
            approved: this.state.creditData,
        };
        const currentLimitExpiry = this.props.approvalItem.currentLimitExpiry;
        const enabledLimitExpiry = this.state.limitExpiryDate != null;
        const validAmount = this.state.creditData.amount != null && !Number.isNaN(this.state.creditData.amount);
        const resetToLimitAmount = this.state.resetToLimitAmount != null ? this.state.resetToLimitAmount : 0;
        const customer = this.props.approvalItem && this.props.approvalItem.customer;

        const editableAndValid = validAmount && this.props.approval.editableByCurrentUser;

        const editableLimitExpiry =
            util.isContractingStep(this.props.currentStepType) &&
            _.get(this.props, 'approvalItem.requestedLimitExpiry.limitExpiryDate')
                ? editableAndValid
                : editableAndValid && !this.props.readOnly;

        return (
            <div className="mrc-credit-data mrc-grid col-2 mrc-input-group">
                {this.showCustomerWarnings(customer)}
                <div className="mrc-grid-left">
                    <CreditDataEditor
                        country={this.props.countryForCurrency}
                        label={lookup('mrc.creditdetails.creditlimit')}
                        type="number"
                        name="amount"
                        {...attrs}
                        onChange={this.handleAmountChanged}
                        onBlur={this.handleAmountOnBlur}
                        readOnly={this.props.readOnly || !this.props.approval.editableByCurrentUser}
                        inputId="creditAmount"
                    />
                    <div className="mrc-input mrc-limit-expiry">
                        <fieldset>
                            <div className="mrc-input-header">
                                <h4 className="span-metro-blue">{lookup('mrc.creditdetails.limitExpiryDate')}</h4>
                                <ul className="col-end">
                                    <li>
                                        <small className="current">
                                            {lookup('mrc.creditdetails.current')}:{' '}
                                            {this.createCurrentLimitExpiryDate(currentLimitExpiry)}
                                        </small>
                                    </li>
                                </ul>
                            </div>
                            <div className="m-label">
                                <label htmlFor={'datepicker-' + this.props.approvalItem.id}>
                                    {lookup('mrc.creditdetails.requested')}
                                </label>
                            </div>
                            <div className="mrc-input">
                                <MrcDatePickerInput
                                    className="m-input-element"
                                    onChange={this.handleLimitExpiryDateChange}
                                    selected={
                                        this.state.limitExpiryDate == null ? null : new Date(this.state.limitExpiryDate)
                                    }
                                    disabled={!editableLimitExpiry}
                                    minDate={new Date(new Date().getTime() + 86400000)} // + 1 day in ms
                                    showYearDropdown={true}
                                    dateFormat={this.props.dateFormat}
                                    placeholderText={this.props.dateFormat}
                                    id={'datepicker-' + this.props.approvalItem.id}
                                />
                                <img
                                    htmlFor={'datepicker-' + this.props.approvalItem.id}
                                    className="mrc-icon-small date-picker-icon"
                                    src={CalendarIcon}
                                />
                            </div>
                            <div className="mrc-credit-data-editor mrc-input limit-expiry-reset">
                                <div className="mrc-input-header">
                                    <h4 className="span-metro-blue">{lookup('mrc.creditdetails.limitExpiryReset')}</h4>
                                    <ul className="col-end">
                                        <li>
                                            <small className="current">
                                                {lookup('mrc.creditdetails.current')}:{' '}
                                                {this.createCurrentLimitExpiryReset(currentLimitExpiry)}
                                            </small>
                                        </li>
                                    </ul>
                                </div>
                                <div className="m-input m-input-name">
                                    <div className="m-label">
                                        <label htmlFor={'reset-' + this.props.approvalItem.id}>
                                            {lookup('mrc.creditdetails.requested')}
                                        </label>
                                    </div>
                                    <div className="m-input-elementWrapper">
                                        <label
                                            htmlFor={'reset-' + this.props.approvalItem.id}
                                            className="m-input-iconLink"
                                        >
                                            <img className="mrc-icon-small" src={EditIcon} />
                                        </label>
                                        <input
                                            id={'reset-' + this.props.approvalItem.id}
                                            value={resetToLimitAmount}
                                            type="text"
                                            className="mrc-input m-input-element extra-class-on-input-tag requested"
                                            name="limit-expiry-reset"
                                            onChange={this.handleLimitExpiryResetChange}
                                            onBlur={this.handleLimitExpiryResetOnBlur}
                                            disabled={
                                                !validAmount ||
                                                enabledLimitExpiry === false ||
                                                this.props.readOnly ||
                                                !this.props.approval.editableByCurrentUser
                                            }
                                        />
                                        <span className="m-input-errorMessage" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="mrc-grid-right">
                    <CreditDataEditor
                        country={this.props.countryForCurrency}
                        label={lookup('mrc.creditdetails.creditproduct')}
                        type="select"
                        name="creditProduct"
                        {...attrs}
                        onChange={this.handleCreditProductChange}
                        readOnly={this.props.readOnly || !this.props.approval.editableByCurrentUser}
                        inputId={'creditProduct-' + this.props.approvalItem.id}
                    >
                        {this.createCreditProductOptions()}
                    </CreditDataEditor>
                    <CreditDataEditor
                        country={this.props.countryForCurrency}
                        label={lookup('mrc.creditdetails.creditperiod')}
                        type="select"
                        name="creditPeriod"
                        {...attrs}
                        onChange={this.handleCreditPeriodChange}
                        readOnly={this.props.readOnly || !this.props.approval.editableByCurrentUser}
                        inputId={'creditPeriod-' + this.props.approvalItem.id}
                    >
                        {this.createCreditPeriodOptions()}
                    </CreditDataEditor>
                    <CreditDataEditor
                        country={this.props.countryForCurrency}
                        label={lookup('mrc.creditdetails.debitType')}
                        type="select"
                        name="debitType"
                        {...attrs}
                        onChange={this.handleDebitTypeChange}
                        readOnly={this.props.readOnly || !this.props.approval.editableByCurrentUser}
                        inputId={'debitType-' + this.props.approvalItem.id}
                    >
                        {this.createDebitTypeOptions()}
                    </CreditDataEditor>
                </div>
            </div>
        );
    }

    createCurrentLimitExpiryDate(currentLimitExpiry) {
        let value =
            currentLimitExpiry == null || currentLimitExpiry.limitExpiryDate == null
                ? null
                : currentLimitExpiry.limitExpiryDate;
        if (value) return <span> {this.showLimitExpiryDateInLocaleTime(currentLimitExpiry.limitExpiryDate)}</span>;
        else return <span>-</span>;
    }

    showLimitExpiryDateInLocaleTime = (limitExpiryDate) => {
        return new Date(limitExpiryDate.toString()).toLocaleDateString();
    };

    createCurrentLimitExpiryReset(currentLimitExpiry) {
        let value =
            currentLimitExpiry == null || currentLimitExpiry.limitExpiryDate == null
                ? null
                : currentLimitExpiry.resetToLimitAmount;
        if (value) {
            return (
                <span className="test">
                    <MrcNumber isCurrency country={this.props.countryForCurrency}>
                        {value}
                    </MrcNumber>
                </span>
            );
        } else return <span>-</span>;
    }

    toOption(t) {
        let tLookup = !t.includes('mrc.payment.') ? 'mrc.payment.' + t.split(' ').join('_') : t;

        return (
            <option key={tLookup} value={tLookup}>
                {lookup(tLookup)}
            </option>
        );
    }

    createCreditProductOptions() {
        return this.NULL_OPTION.concat(getPossibleValues(this.props.availablePayments, null, null).map(this.toOption));
    }

    createCreditPeriodOptions() {
        return this.NULL_OPTION.concat(this.extractCreditPeriods().map(this.toOption));
    }

    extractCreditPeriods() {
        return getPossibleValues(this.props.availablePayments, this.state.creditData.creditProduct, null);
    }

    createDebitTypeOptions() {
        return this.NULL_OPTION.concat(this.extractDebitTypes().map(this.toOption));
    }

    extractDebitTypes() {
        return getPossibleValues(
            this.props.availablePayments,
            this.state.creditData.creditProduct,
            this.state.creditData.creditPeriod
        );
    }

    handleCreditProductChange = (event) => {
        let newCreditData = Object.assign(this.state.creditData);
        newCreditData.creditProduct = event.target.value;
        newCreditData.creditPeriod = '';
        newCreditData.debitType = '';
        this.setState(newCreditData, this.publishEnteredCreditData);
        this.setCreditDataIfValid();
    };

    handleCreditPeriodChange = (event) => {
        let newCreditData = Object.assign(this.state.creditData);
        newCreditData.creditPeriod = event.target.value;
        newCreditData.debitType = '';
        this.setState(newCreditData, this.publishEnteredCreditData);
        this.setCreditDataIfValid();
    };

    handleDebitTypeChange = (event) => {
        let newCreditData = Object.assign(this.state.creditData);
        newCreditData.debitType = event.target.value;
        this.setState(newCreditData, this.publishEnteredCreditData);
        this.setCreditDataIfValid();
    };

    handleAmountChanged(amount) {
        const newState = { ...this.state };
        newState.creditData.amount = amount;
        this.setState(newState, this.publishEnteredCreditData);
        this.props.handleAmountChange(amount, this.props.index);
    }

    handleAmountOnBlur = (event) => {
        const amount = event.target.value;

        this.setCreditDataIfValid();

        if (
            (amount == null || amount === '' || Number.isNaN(amount)) &&
            (this.state.limitExpiryDate != null || this.state.resetToLimitAmount !== 0)
        ) {
            this.setState({
                limitExpiryDate: null,
                resetToLimitAmount: 0,
            });
            this.props.setLimitExpiry(this.props.approvalItem.id, {
                limitExpiryDate: null,
                resetToLimitAmount: 0,
            });
        }
    };

    handleLimitExpiryDateChange(date) {
        this.setState({ limitExpiryDate: date });
        let resetToLimitAmount = this.state.resetToLimitAmount;
        if (date == null) {
            this.setState({ resetToLimitAmount: 0 });
            resetToLimitAmount = 0;
        }
        this.props.setLimitExpiry(this.props.approvalItem.id, {
            limitExpiryDate: date === '' ? null : date,
            resetToLimitAmount: resetToLimitAmount === '' ? 0 : resetToLimitAmount,
        });
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

    handleLimitExpiryResetChange = (event) => {
        const parsed = parseFloat(event.target.value);
        if (parsed != null && !Number.isNaN(parsed) && parsed >= 0) {
            this.setState({ resetToLimitAmount: parsed });
        } else {
            this.setState({ resetToLimitAmount: 0 });
        }
    };

    handleLimitExpiryResetOnBlur = (event) => {
        this.handleLimitExpiryResetChange(event);
        const { limitExpiryDate, resetToLimitAmount } = this.state;
        this.props.setLimitExpiry(this.props.approvalItem.id, {
            limitExpiryDate: limitExpiryDate === '' ? null : limitExpiryDate,
            resetToLimitAmount: resetToLimitAmount === '' ? 0 : resetToLimitAmount,
        });
    };

    setCreditDataIfValid() {
        if (this.isValidCreditData(this.state.creditData)) {
            this.props.setCreditData(this.props.approvalItem.id, this.state.creditData);
        }
    }

    showCustomerWarnings(customer) {
        const countriesWithDifferentBlockingCodes = this.props.countriesWithDifferentBlockingCodes;
        const msgKeyPartCountry =
            customer.country &&
            countriesWithDifferentBlockingCodes &&
            countriesWithDifferentBlockingCodes.length > 0 &&
            countriesWithDifferentBlockingCodes.includes(customer.country)
                ? customer.country + '.'
                : '';
        let blockingContent = null;
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
