import React, { Component } from 'react';
import DefinitionList from '../../../DefinitionList';
import { lookup } from '../../../Util/translations';
import { PropTypes } from 'prop-types';
import { addBlockingCodesWarnings } from '../../Shared/WarningUtils';
import * as _ from 'lodash';

export default class CreditDataOfCustomer extends Component {
    creditLimit(countryCode, current, requested, applied) {
        const list = [
            {
                term: 'mrc.creditdetails.current',
                description: <mrc-number show-currency-for-country={countryCode}>{current.creditLimit}</mrc-number>,
            },
            {
                term: 'mrc.creditdetails.requested',
                description: <mrc-number show-currency-for-country={countryCode}>{requested.creditLimit}</mrc-number>,
            },
            {
                term: 'mrc.creditdetails.applied',
                description: <mrc-number show-currency-for-country={countryCode}>{applied.creditLimit}</mrc-number>,
            },
        ];

        return (
            // the className is used in tests
            <DefinitionList
                className={'mrc-credit-data-credit-limit'}
                title={'mrc.creditdetails.creditlimit'}
                list={list}
            />
        );
    }

    creditProduct(current, requested, applied) {
        const list = [
            { term: 'mrc.creditdetails.current', description: <span>{lookup(current.creditProduct)}</span> },
            { term: 'mrc.creditdetails.requested', description: <span>{lookup(requested.creditProduct)}</span> },
            { term: 'mrc.creditdetails.applied', description: <span>{lookup(applied.creditProduct)}</span> },
        ];

        return (
            // the className is used in tests
            <DefinitionList
                className={'mrc-credit-data-credit-product'}
                title={'mrc.creditdetails.creditproduct'}
                list={list}
            />
        );
    }

    creditPeriod(current, requested, applied) {
        const list = [
            { term: 'mrc.creditdetails.current', description: <span>{lookup(current.creditPeriod)}</span> },
            { term: 'mrc.creditdetails.requested', description: <span>{lookup(requested.creditPeriod)}</span> },
            { term: 'mrc.creditdetails.applied', description: <span>{lookup(applied.creditPeriod)}</span> },
        ];

        return (
            // the className is used in tests
            <DefinitionList
                className={'mrc-credit-data-credit-period'}
                title={'mrc.creditdetails.creditperiod'}
                list={list}
            />
        );
    }

    debitType(current, requested, applied) {
        const list = [
            { term: 'mrc.creditdetails.current', description: <span>{lookup(current.debitType)}</span> },
            { term: 'mrc.creditdetails.requested', description: <span>{lookup(requested.debitType)}</span> },
            { term: 'mrc.creditdetails.applied', description: <span>{lookup(applied.debitType)}</span> },
        ];

        return (
            // the className is used in tests
            <DefinitionList
                className={'mrc-credit-data-payment-type'}
                title={'mrc.creditdetails.debitType'}
                list={list}
            />
        );
    }

    limitExpiry(expiryDate, resetAmount, countryCode) {
        if (_.isNil(expiryDate)) {
            return null;
        }
        const list = [
            {
                term: 'mrc.creditdetails.limitExpiryDate',
                description: expiryDate !== null ? <mrc-date>{expiryDate}</mrc-date> : null,
            },
            {
                term: 'mrc.creditdetails.limitExpiryReset',
                description: <mrc-number show-currency-for-country={countryCode}>{resetAmount}</mrc-number>,
            },
        ];

        return (
            <DefinitionList
                className={'mrc-credit-data-limit-expiry'}
                title={'mrc.creditdetails.requestedLimitExpiry'}
                list={list}
            />
        );
    }

    blockingOption(applied) {
        if (!applied.blockingOption) {
            return null;
        }

        const list = [
            {
                term: 'mrc.blockingoption.applied',
                description: <span>{lookup('mrc.blocking-option.' + applied.blockingOption.toLowerCase())}</span>,
            },
        ];

        return (
            // the className is used in tests
            <DefinitionList
                className={'mrc-credit-data-credit-product'}
                title={'mrc.creditdetails.blockingoption'}
                list={list}
            />
        );
    }

    render() {
        return (
            <div className="mrc-credit-details">
                {addBlockingCodesWarnings(
                    this.props.checkoutCheckCode,
                    this.props.blockingReason,
                    this.props.addCountryInKeyForWarning,
                    this.props.countryCode
                )}
                {this.creditLimit(this.props.countryCode, this.props.current, this.props.requested, this.props.applied)}
                {this.creditProduct(this.props.current, this.props.requested, this.props.applied)}
                {this.creditPeriod(this.props.current, this.props.requested, this.props.applied)}
                {this.debitType(this.props.current, this.props.requested, this.props.applied)}
                {this.limitExpiry(this.props.limitExpiryDate, this.props.resetToLimitAmount, this.props.countryCode)}
                {this.blockingOption(this.props.applied)}
            </div>
        );
    }
}

CreditDataOfCustomer.propTypes = {
    current: PropTypes.object,
    requested: PropTypes.object,
    applied: PropTypes.object,
    countryCode: PropTypes.string,
    limitExpiryDate: PropTypes.string,
    resetToLimitAmount: PropTypes.number,
    checkoutCheckCode: PropTypes.number,
    blockingReason: PropTypes.string,
    addCountryInKeyForWarning: PropTypes.bool,
};
