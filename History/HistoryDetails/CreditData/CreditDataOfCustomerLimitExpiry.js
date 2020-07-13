import React, { Component } from 'react';
import DefinitionList from '../../../DefinitionList';
import { PropTypes } from 'prop-types';
import { lookup } from '../../../Util/translations';
import MrcNumber from '../../../MrcNumber';
import MrcDate from '../../../MrcDate';

export default class CreditDataOfCustomerLimitExpiry extends Component {
    render() {
        const mrcPaymentPrefix = 'mrc.payment.';
        const appliedCreditProductLabel =
            this.props.appliedCreditProduct &&
            this.props.appliedCreditProduct !== null &&
            String(this.props.appliedCreditProduct).indexOf(mrcPaymentPrefix) > -1
                ? this.props.appliedCreditProduct
                : mrcPaymentPrefix + String(this.props.appliedCreditProduct).replace(' ', '_');
        const appliedCreditPeriodLabel =
            this.props.appliedCreditPeriod &&
            this.props.appliedCreditPeriod !== null &&
            String(this.props.appliedCreditPeriod).indexOf(mrcPaymentPrefix) > -1
                ? this.props.appliedCreditPeriod
                : mrcPaymentPrefix + String(this.props.appliedCreditPeriod).replace(' ', '_');
        const appliedDebitTypeLabel =
            this.props.appliedDebitType &&
            this.props.appliedDebitType !== null &&
            String(this.props.appliedDebitType).indexOf(mrcPaymentPrefix) > -1
                ? this.props.appliedDebitType
                : mrcPaymentPrefix + String(this.props.appliedDebitType).replace(' ', '_');
        const statusLabel =
            this.props.status && this.props.status !== null
                ? this.props.status === 'Activated'
                    ? 'mrc.creditdetails.limitExpiryResetActivated'
                    : this.props.status === 'Failed'
                    ? 'mrc.creditdetails.limitExpiryResetFailed'
                    : null
                : null;

        const list = [
            { term: 'mrc.creditdetails.limitExpiryDate', description: <MrcDate>{this.props.creationDate}</MrcDate> },
            { term: 'mrc.creditdetails.creditproduct', description: lookup(appliedCreditProductLabel) },
            { term: 'mrc.creditdetails.creditperiod', description: lookup(appliedCreditPeriodLabel) },
            { term: 'mrc.creditdetails.debitType', description: lookup(appliedDebitTypeLabel) },
            {
                term: 'mrc.creditdetails.amountBeforeLimitExpiry',
                description: (
                    <MrcNumber isCurrency country={this.props.countryCode}>
                        {this.props.amountBeforeExpiry}
                    </MrcNumber>
                ),
            },
            {
                term: 'mrc.creditdetails.amountAfterLimitExpiry',
                description: (
                    <MrcNumber isCurrency country={this.props.countryCode}>
                        {this.props.amount}
                    </MrcNumber>
                ),
            },
            {
                term: 'mrc.creditdetails.resetLimitExpiryResult',
                description: statusLabel !== null && lookup(statusLabel),
            },
        ];

        return (
            <DefinitionList
                className={'mrc-credit-data-limit-expiry'}
                title={'mrc.creditdetails.limitExpiry'}
                list={list}
            />
        );
    }
}

CreditDataOfCustomerLimitExpiry.propTypes = {
    countryCode: PropTypes.string,
    creationDate: PropTypes.string,
    appliedCreditProduct: PropTypes.string,
    appliedCreditPeriod: PropTypes.string,
    appliedDebitType: PropTypes.string,
    amountBeforeExpiry: PropTypes.number,
    amount: PropTypes.number,
    status: PropTypes.string,
};
