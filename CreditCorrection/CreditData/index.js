import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { NumberInput } from '../../NumberInput/index';
import getPossibleValues from '../../Util/creditData';
import CurrentValue from './CurrentValue';
import { lookup } from '../../Util/translations';
import BlockingDropdown from '../BlockingDropdown';
import ChevronDownIcon from '../../icons/chevron-down.svg';

export default class CreditData extends Component {
    NULL_OPTION = [<option key="null" />];

    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
        this.props.registerCallbackBlocking(this.props.requestedItem.id, this.handleSiblingsBlocking.bind(this));
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
        const creditData = (props.requestedItem && props.requestedItem.creditData) || newCreditData;
        const currentCreditProduct = this.defineNotNullValueOrDefault(creditData.creditProduct, '');
        const currentCreditPeriod = this.defineNotNullValueOrDefault(creditData.creditPeriod, '');
        const currentDebitType = this.defineNotNullValueOrDefault(creditData.debitType, '');
        const amount = parseFloat(
            creditData.amount == null || Number.isNaN(creditData.amount) ? '' : creditData.amount
        );
        const initialAmount = parseFloat(
            creditData.initialAmount == null || Number.isNaN(creditData.initialAmount) ? '' : creditData.initialAmount
        );
        return {
            id: creditData.id,
            amount: amount,
            initialAmount: initialAmount,
            creditProduct: currentCreditProduct || '',
            creditPeriod: currentCreditPeriod || '',
            debitType: currentDebitType || '',
            blockingValue: '',
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
        if (this.props.setCreditData == null) {
            return;
        }
        if (prevState !== this.state) {
            const valid = this.isValidCreditData();
            this.props.setValidity(valid);
            const { amount, creditProduct, debitType, creditPeriod, id } = this.state;
            const blockingOption = this.state.blockingValue;

            this.props.setCreditData({
                id,
                amount: amount === '' ? null : amount,
                creditProduct: creditProduct === '' ? null : creditProduct,
                creditPeriod: creditPeriod === '' ? null : creditPeriod,
                debitType: debitType === '' ? null : debitType,
                blockingOption: blockingOption,
            });
            this.props.handleRequestedGroupLimitChange();
        }
    }

    handleSiblingsBlocking(newBlockingValue) {
        let creditData = this.updateCreditData(newBlockingValue);
        this.handleAmountChange(creditData.amount);
        this.handleCreditProductChange({ target: { value: creditData.creditProduct } });
        this.handleCreditPeriodChange({ target: { value: creditData.creditPeriod } });
        this.handleDebitTypeChange({ target: { value: creditData.debitType } });
        creditData.blockingOption = newBlockingValue;

        this.setState({ blockingValue: newBlockingValue });
    }

    updateCreditData(newBlockingValue) {
        let initialCreditData = this.state.initialCreditData || {
            amount: 0,
            creditProduct: '',
            creditPeriod: '',
            debitType: '',
            id: '',
        };
        let actualCreditData = {
            amount: this.state.amount,
            creditProduct: this.state.creditProduct,
            creditPeriod: this.state.creditPeriod,
            debitType: this.state.debitType,
            id: this.state.id,
        };
        if (newBlockingValue !== undefined && newBlockingValue !== '') {
            //update initial value only if they are different than null, 0 or ''
            initialCreditData.amount =
                actualCreditData.amount && actualCreditData.amount !== 0
                    ? actualCreditData.amount
                    : initialCreditData.amount;
            initialCreditData.creditProduct =
                actualCreditData.creditProduct && actualCreditData.creditProduct !== ''
                    ? actualCreditData.creditProduct
                    : initialCreditData.creditProduct;
            initialCreditData.creditPeriod =
                actualCreditData.creditPeriod && actualCreditData.creditPeriod !== ''
                    ? actualCreditData.creditPeriod
                    : initialCreditData.creditPeriod;
            initialCreditData.debitType =
                actualCreditData.debitType && actualCreditData.debitType !== ''
                    ? actualCreditData.debitType
                    : initialCreditData.debitType;
            initialCreditData.id =
                actualCreditData.id && actualCreditData.id !== '' ? actualCreditData.id : initialCreditData.id;

            this.setState({ initialCreditData: initialCreditData });

            //if remove blocking or soft block, no changes to the payment and limit.
            //if credit to cash, change only the limit
            if (
                newBlockingValue !== 'mrc.blocking-option.softblock' &&
                newBlockingValue !== 'mrc.blocking-option.removeblock'
            ) {
                actualCreditData.amount = 0;
                actualCreditData.creditProduct =
                    newBlockingValue === 'mrc.blocking-option.credittocash' ? initialCreditData.creditProduct : '';
                actualCreditData.creditPeriod =
                    newBlockingValue === 'mrc.blocking-option.credittocash' ? initialCreditData.creditPeriod : '';
                actualCreditData.debitType =
                    newBlockingValue === 'mrc.blocking-option.credittocash' ? initialCreditData.debitType : '';
            }
            this.setState({ initialCreditData: initialCreditData });
        } else {
            if (initialCreditData) {
                actualCreditData = { ...initialCreditData };
            }
        }
        return actualCreditData;
    }

    /**
     * test current state to be valid CreditData
     * @returns {boolean}
     */
    isValidCreditData() {
        if (this.state.blockingValue && this.state.blockingValue !== '') {
            return true;
        }
        let creditData = this.state || {};
        // convert empty debitType to null which is the value used unavailablePayments
        creditData = creditData.debitType === '' ? { ...creditData, debitType: null } : creditData;
        if (
            (creditData.creditProduct == null || creditData.creditProduct === '') &&
            (creditData.creditPeriod == null || creditData.creditPeriod === '') &&
            (creditData.debitType == null || creditData.debitType === '') &&
            (creditData.amount == null || Number.isNaN(creditData.amount))
        ) {
            return null;
        }
        if (
            (creditData.creditProduct == null || creditData.creditProduct === '') &&
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

    updateAmount(limit) {
        return limit !== undefined && limit !== null ? limit : null;
    }

    render() {
        let noDebitTypesToSelect = false;
        let noCreditPeriodsToSelect = false;
        if (this.props.requestedItem.customer.availablePayments) {
            noDebitTypesToSelect =
                this.extractDebitTypes(this.props.requestedItem.customer.availablePayments).length === 0;
            noCreditPeriodsToSelect =
                this.extractCreditPeriods(this.props.requestedItem.customer.availablePayments).length === 0;
        }
        const currentPayment = this.defineCurrentPayment();
        const currentAmount = this.state.amount;
        let activated = false;
        if (this.props.requestedItem.activationInfo !== undefined && this.props.requestedItem.activationInfo !== null) {
            if (
                '-1' == this.props.requestedItem.activationInfo.resultCode ||
                '0' == this.props.requestedItem.activationInfo.resultCode
            ) {
                activated = true;
            }
        }
        return (
            <div className="mrc-credit-data mrc-grid col-2 mrc-input-group">
                <div className="mrc-grid-left">
                    <div className="mrc-input">
                        <label>{lookup('mrc.creditdetails.creditcorrection')}</label>
                        <CurrentValue
                            country={this.props.requestedItem.customer.country}
                            type="limit"
                            value={currentPayment.limit}
                        />
                        <NumberInput
                            className="m-input-element"
                            name="creditcorrection"
                            initialValue={this.state.amount}
                            onChange={this.handleAmountChange}
                            disabled={
                                !this.props.paymentReadyToBeSelected ||
                                (this.state.blockingValue && this.state.blockingValue !== '')
                            }
                            shouldBePrefilledWith={this.updateAmount(currentAmount)}
                            newValue={this.state.amount}
                        />
                    </div>
                    <BlockingDropdown
                        id={this.props.blockingItemId}
                        updateDropdownValue={this.props.onBlockingChange}
                        value={this.props.blockingValue}
                        options={this.props.blockingOptions}
                        label={this.props.blockingLabel}
                        disabled={activated === true}
                    />
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
                            onChange={this.handleCreditProductChange}
                            value={this.value2Show(this.state.creditProduct)}
                            disabled={
                                !this.props.paymentReadyToBeSelected ||
                                (this.state.blockingValue && this.state.blockingValue !== '')
                            }
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
                            onChange={this.handleCreditPeriodChange}
                            value={this.value2Show(this.state.creditPeriod)}
                            disabled={
                                !this.props.paymentReadyToBeSelected ||
                                noCreditPeriodsToSelect ||
                                (this.state.blockingValue && this.state.blockingValue !== '')
                            }
                        >
                            {this.createCreditPeriodOptions()}
                        </select>
                        <img
                            htmlFor={'creditproduct-' + this.props.requestedItem.id}
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
                            onChange={this.handleDebitTypeChange}
                            value={this.value2Show(this.state.debitType)}
                            disabled={
                                !this.props.paymentReadyToBeSelected ||
                                noDebitTypesToSelect ||
                                (this.state.blockingValue && this.state.blockingValue !== '')
                            }
                        >
                            {this.createDebitTypeOptions()}
                        </select>
                        <img
                            htmlFor={'creditproduct-' + this.props.requestedItem.id}
                            className="mrc-icon-small mrc-down-icon"
                            src={ChevronDownIcon}
                        />
                    </div>
                </div>
            </div>
        );
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

    handleAmountChange = amount => {
        this.setState({ amount: parseFloat(amount) });
    };

    value2Show(value) {
        return value ? (value.includes('mrc.payment.') ? value : 'mrc.payment.' + value.split(' ').join('_')) : '';
    }

    defineNotNullValueOrDefault(currentValue, defaultValue) {
        return currentValue === null || currentValue.length === 0 ? defaultValue : currentValue;
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

    handleAutoFillCombos = changed_state => {
        if (changed_state.creditProduct !== undefined && changed_state.creditProduct !== '') {
            changed_state.debitType = '';
            changed_state.creditPeriod = '';
            if (
                getPossibleValues(
                    this.props.requestedItem.customer.availablePayments,
                    changed_state.creditProduct,
                    null
                ).length == 1
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
                ).length == 1
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

    defineCurrentPayment() {
        const customer = this.props.requestedItem && this.props.requestedItem.customer;

        const limit =
            customer && customer.creditLimit != null && !Number.isNaN(customer.creditLimit) ? customer.creditLimit : '';
        const payment = customer && customer.currentPayment;

        return { limit: limit, payment: payment };
    }
}

CreditData.propTypes = {
    headerTitle: PropTypes.string,
    requestedItem: PropTypes.object,
    paymentReadyToBeSelected: PropTypes.bool.isRequired,
    setCreditData: PropTypes.func,
    setValidity: PropTypes.func,
    handleRequestedGroupLimitChange: PropTypes.func,
    canCorrect: PropTypes.bool.isRequired,
    isNewCorrection: PropTypes.bool,
    onBlockingChange: PropTypes.func,
    blockingValue: PropTypes.string,
    blockingOptions: PropTypes.arrayOf(PropTypes.string),
    blockingLabel: PropTypes.string,
    blockingItemId: PropTypes.string,
    registerCallbackBlocking: PropTypes.func,
};
