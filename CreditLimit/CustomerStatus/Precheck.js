import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { lookup, numberDependentLookup } from '../../Util/translations';
import CheckmarkIcon from '../../icons/checkmark.svg';
import ErrorIcon from '../../icons/close-dark.svg';
import './index.scss';

export default class Precheck extends Component {
    constructor(props) {
        super(props);
    }

    static renderSuccess(data) {
        let successfulPrecheckedCustomers = data.customers.length;
        if (data.precheckErrors && data.precheckErrors.customers) {
            successfulPrecheckedCustomers -= data.precheckErrors.customers.length;
        }
        return (
            <div className="mrc-pre-checks">
                <div className="mrc-icon checkmark">
                    <img width="24" height="24" src={CheckmarkIcon} />
                </div>
                <p>
                    {numberDependentLookup('strategy.init.checks.successfulCheck').replace(
                        '%s',
                        successfulPrecheckedCustomers
                    )}
                </p>
            </div>
        );
    }

    static renderErrors(data) {
        if (!data.precheckErrors || data.precheckErrors.length <= 0) return null;
        return (
            <div className="mrc-pre-checks">
                <div className="mrc-icon error">
                    <img width="24" height="24" src={ErrorIcon} />
                </div>
                <p>
                    {numberDependentLookup('strategy.init.checks.errorCheck').replace('%s', data.precheckErrors.length)}
                </p>
            </div>
        );
    }

    renderErrorDetails(data) {
        if (!data.precheckErrors) return null;
        const errorElements = data.precheckErrors.map((error, idx) => {
            let fieldTranslation = error.field ? lookup(error.field) : '';
            let customers = [];
            if (error.reason !== undefined && error.reason === 'strategy.init.failed.uniformtype') {
                error.customers.forEach((customer) => {
                    if (customer.split(':').length > 1) {
                        const errorKey = customer.split(':')[1].trim();
                        const message = lookup(errorKey);
                        customers.push(customer.split(':')[0] + ': ' + message);
                    } else {
                        customers.push(lookup(customer));
                    }
                });
            } else {
                customers = error.customers;
            }
            return (
                <li key={idx}>
                    {lookup(error.reason).replace('%s', fieldTranslation)} {customers.join(', ')}.
                </li>
            );
        });
        return (
            <div className="mrc-pre-checks">
                <ul>{errorElements}</ul>
            </div>
        );
    }

    render() {
        if (!this.props.customers || !this.props.customers.data) return null;
        const data = this.props.customers.data;
        const errorElements = Precheck.renderErrors(data);
        return (
            <div className="mrc-pre-checks-group-wrapper">
                <div className="mrc-pre-checks-group">
                    {!errorElements ? Precheck.renderSuccess(data) : null}
                    {errorElements}
                    {errorElements ? this.renderErrorDetails(data) : null}
                </div>
            </div>
        );
    }
}

Precheck.propTypes = {
    customers: PropTypes.shape({
        data: PropTypes.shape({
            customers: PropTypes.array,
            precheckErrors: PropTypes.arrayOf(
                PropTypes.shape({
                    reason: PropTypes.string.isRequired,
                    field: PropTypes.string,
                    customers: PropTypes.arrayOf(PropTypes.string).isRequired,
                })
            ),
        }).isRequired,
    }),
};
