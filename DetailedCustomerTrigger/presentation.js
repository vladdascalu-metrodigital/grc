import './index.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { displayName } from '../Util';
import { lookup } from '../Util/translations';
import Attention from '../icons/attention.svg';

export default class DetailedCustomerTrigger extends Component {
    PLACEHOLDER = '-';

    constructor(props) {
        super(props);
    }

    displayName() {
        return displayName(this.props.customer);
    }

    asNumber = (value, country) => {
        if (this.isValidAmount(value))
            return (
                <mrc-number dynamic={value} show-currency-for-country={country}>
                    {value}
                </mrc-number>
            );
        else return this.PLACEHOLDER;
    };
    asNumberForAvailable = (value1, value2, country) => {
        if (this.isValidAmount(value1))
            return (
                <mrc-number dynamic={value1} show-currency-for-country={country}>
                    {value1 - value2}
                </mrc-number>
            );
        else return this.PLACEHOLDER;
    };

    displayCustomerWarnings() {
        if (this.props.isWithWarning !== undefined && this.props.isWithWarning === true) {
            return <img className="attention" src={Attention} alt="Blocked" />;
        }
    }

    render() {
        return (
            <div className={this.getTriggerClassName()}>
                {this.displayCustomerWarnings()}
                <span>
                    {this.props.customer.requestedCustomer ? '*' : ''}{' '}
                    {this.props.customer.storeNumber + '/' + this.props.customer.customerNumber} {this.displayName()}
                </span>
                {this.displayActivation()}
                {this.evaluateCreatedFromAndShowSeparateView()}
            </div>
        );
    }

    evaluateCreatedFromAndShowSeparateView() {
        if (this.isValidAmount(this.props.current) || this.isValidAmount(this.props.requested)) {
            return (
                <div>
                    <table className={this.getTableClassName()}>
                        <tbody>
                            <tr key="current">
                                <td>{lookup('mrc.creditdetails.available') + ':'} </td>
                                <td>
                                    {this.asNumberForAvailable(
                                        this.props.current,
                                        this.props.customer.limitExhaustion,
                                        this.props.customer.country
                                    )}
                                </td>
                                <td>{lookup('mrc.creditdetails.current') + ': '}</td>
                                <td className={this.getLimitFontClassName()}>
                                    {this.asNumber(this.props.current, this.props.customer.country)}
                                </td>
                                {this.getProductColumn(this.props.cProduct)}
                                {this.getPeriodColumn(this.props.cPeriod)}
                                {this.getDebitTypeColumn(this.props.cDebitType)}
                                {this.getLimitExpiryColumn(this.props.cLimitExpiryDate)}
                                {this.getLimitExpiryValueColumn(this.props.cLimitExpiryValue)}
                            </tr>
                            <tr key="requested">
                                <td>{lookup('mrc.creditdetails.limitExhaustion') + ':'} </td>
                                <td>
                                    {this.asNumber(this.props.customer.limitExhaustion, this.props.customer.country)}
                                </td>
                                <td>{lookup('mrc.creditdetails.requested') + ': '}</td>
                                <td className={this.getLimitFontClassName()}>
                                    {this.asNumber(this.props.requested, this.props.customer.country)}
                                </td>
                                {this.getProductColumn(this.props.rProduct)}
                                {this.getPeriodColumn(this.props.rPeriod)}
                                {this.getDebitTypeColumn(this.props.rDebitType)}
                                {this.getLimitExpiryColumn(this.props.rLimitExpiryDate)}
                                {this.getLimitExpiryValueColumn(this.props.rLimitExpiryValue)}
                            </tr>
                            {this.displayApprovedLimit()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    displayApprovedLimit() {
        if (this.isValidAmount(this.props.approved)) {
            return (
                <tr key="approved">
                    <td></td>
                    <td></td>
                    <td>{lookup('mrc.creditdetails.applied') + ': '}</td>
                    <td className={this.getLimitFontClassName()}>
                        {this.asNumber(this.props.approved, this.props.customer.country)}
                    </td>
                    {this.getProductColumn(this.props.aProduct)}
                    {this.getPeriodColumn(this.props.aPeriod)}
                    {this.getDebitTypeColumn(this.props.aDebitType)}
                </tr>
            );
        }
    }

    displayActivation() {
        if (
            this.props.customer.activationStatus !== undefined &&
            this.props.customer.activationStatus !== null &&
            this.props.customer.activationStatus !== ''
        ) {
            const statusClass =
                this.props.customer.activationResult !== undefined &&
                this.props.customer.activationResult !== null &&
                this.props.customer.activationResult === 'ok'
                    ? 'span-success'
                    : 'span-error';
            return <span className={statusClass}>{this.props.customer.activationStatus}</span>;
        }
        return null;
    }

    isValidAmount(value) {
        return (value !== undefined && value !== null && value !== '' && !Number.isNaN(value)) || value === 0;
    }

    getLimitExpiryColumn(limitExpiry) {
        if (limitExpiry !== undefined && limitExpiry !== null) {
            return (
                <td>
                    <mrc-date>{limitExpiry}</mrc-date>
                </td>
            );
        }
        return null;
    }

    getLimitExpiryValueColumn(limitExpiry) {
        if (limitExpiry !== undefined && limitExpiry !== null) {
            return <td>{this.asNumber(limitExpiry, this.props.customer.country)}</td>;
        }
        return null;
    }

    getDebitTypeColumn(debitTypeValue) {
        if (this.isAnyValuePresent(this.props.cDebitType, this.props.rDebitType, this.props.aDebitType)) {
            return <td className={this.getDebitTypeFontClassName()}>{lookup(debitTypeValue)}</td>;
        }
        return null;
    }

    getPeriodColumn(periodValue) {
        if (this.isAnyValuePresent(this.props.cPeriod, this.props.rPeriod, this.props.aPeriod)) {
            return <td className={this.getPeriodFontClassName()}>{lookup(periodValue)}</td>;
        }
        return null;
    }

    getProductColumn(productValue) {
        if (this.isAnyValuePresent(this.props.cProduct, this.props.rProduct, this.props.aProduct)) {
            return <td className={this.getProductFontClassName()}>{lookup(productValue)}</td>;
        }
        return null;
    }

    getLimitFontClassName() {
        if (this.isAnyValueChanged(this.props.approved, this.props.current, this.props.requested)) {
            return 'td-changed-data';
        }
        return 'td-not-changed-data';
    }

    getDebitTypeFontClassName() {
        if (this.isAnyValueChanged(this.props.aDebitType, this.props.cDebitType, this.props.rDebitType)) {
            return 'td-changed-data';
        }
        return 'td-not-changed-data';
    }

    getPeriodFontClassName() {
        if (this.isAnyValueChanged(this.props.aPeriod, this.props.cPeriod, this.props.rPeriod)) {
            return 'td-changed-data';
        }
        return 'td-not-changed-data';
    }

    getProductFontClassName() {
        if (this.isAnyValueChanged(this.props.aProduct, this.props.cProduct, this.props.rProduct)) {
            return 'td-changed-data';
        }
        return 'td-not-changed-data';
    }

    getTableClassName() {
        if (this.areThereChanges()) {
            return 'mrc-detailed-customer-trigger-table previousAmounts mrc-trigger-with-data-changed';
        }
        return 'mrc-detailed-customer-trigger-table previousAmounts mrc-trigger-without-changed-data';
    }

    getTriggerClassName() {
        if (this.areThereChanges()) {
            return 'mrc-detailed-customer-trigger previousAmounts mrc-trigger-with-data-changed';
        }
        return 'mrc-detailed-customer-trigger previousAmounts mrc-trigger-without-changed-data';
    }

    isAnyValuePresent(value1, value2, value3) {
        return (
            (value1 !== undefined && value1 !== null) ||
            (value2 !== undefined && value2 !== null) ||
            (value3 !== undefined && value3 !== null)
        );
    }

    bothValuesArePresentOrNot(value1, value2) {
        return (value1 !== undefined && value2 !== undefined) || (value1 !== null && value2 !== null);
    }

    isValueChanged(value1, value2) {
        return this.bothValuesArePresentOrNot(value1, value2) && value1 !== value2;
    }

    // approvedValue could be null if approve stage is not finished
    isAnyValueChanged(ifValueIsNullThenEquals, value1, value2) {
        return (
            (this.bothValuesArePresentOrNot(value1, value2) && value1 !== value2) ||
            (ifValueIsNullThenEquals !== null &&
                ifValueIsNullThenEquals !== undefined &&
                value2 !== ifValueIsNullThenEquals) ||
            (ifValueIsNullThenEquals !== null &&
                ifValueIsNullThenEquals !== undefined &&
                value1 !== ifValueIsNullThenEquals)
        );
    }

    areThereChanges() {
        return (
            this.isAnyValueChanged(this.props.approved, this.props.current, this.props.requested) ||
            this.isAnyValueChanged(this.props.aProduct, this.props.cProduct, this.props.rProduct) ||
            this.isAnyValueChanged(this.props.aPeriod, this.props.cPeriod, this.props.rPeriod) ||
            this.isAnyValueChanged(this.props.aDebitType, this.props.cDebitType, this.props.rDebitType)
        );
    }
}

DetailedCustomerTrigger.propTypes = {
    customer: PropTypes.object.isRequired,
    current: PropTypes.number,
    requested: PropTypes.number,
    approved: PropTypes.number,
    aDebitType: PropTypes.string,
    cDebitType: PropTypes.string,
    rDebitType: PropTypes.string,
    aProduct: PropTypes.string,
    cProduct: PropTypes.string,
    rProduct: PropTypes.string,
    aPeriod: PropTypes.string,
    cPeriod: PropTypes.string,
    rPeriod: PropTypes.string,
    cLimitExpiryDate: PropTypes.object,
    rLimitExpiryDate: PropTypes.object,
    cLimitExpiryValue: PropTypes.object,
    rLimitExpiryValue: PropTypes.object,
    isWithWarning: PropTypes.bool,
};
