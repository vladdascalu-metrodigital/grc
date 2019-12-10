import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {displayName} from '../Util';
import {lookup} from '../Util/translations';
import Attention from '../icons/attention.svg';


export default class CustomerTrigger extends Component {
    PLACEHOLDER = '-';

    constructor(props) {
        super(props);
    }

    displayName() {
        return displayName(this.props.customer);
    }

    asNumber = (value, country) => {
        if (this.isValidAmount(value)) return <mrc-number show-currency-for-country={country}>{value}</mrc-number>;
        else return this.PLACEHOLDER;
    }

    displayCustomerWarnings() {
        if (this.props.isWithWarning != undefined && this.props.isWithWarning != null && this.props.isWithWarning == true) {
            return (<img className="attention" src={Attention} alt="Blocked"></img>);
        }
    }

    render() {
        return (<div className='mrc-customer-trigger'>
            {this.displayCustomerWarnings()}
            <span>{this.props.customer.requestedCustomer ? '*' : ''} {this.props.customer.storeNumber + '/' + this.props.customer.customerNumber} {this.displayName()}</span>
            {this.displayActivation()}
            {this.evaluateCreatedFromAndShowSeparateView()}
        </div>);
    }

    evaluateCreatedFromAndShowSeparateView() {
        if (this.isValidAmount(this.props.current) || this.isValidAmount(this.props.requested)) {
            return (<div className='previousAmounts'>
                <div> {lookup('mrc.creditdetails.current') + ':'} {this.asNumber(this.props.current, this.props.customer.country)}</div>
                <div> {lookup('mrc.creditdetails.requested') + ':'} {this.asNumber(this.props.requested, this.props.customer.country)}</div>
            </div>);
        }
    }

    isValidAmount(value) {
        return (value !== undefined && value !== null && value !== '' && !Number.isNaN(value)) || value === 0;
    }

    displayActivation() {
        if(this.props.customer.activationStatus !== undefined && this.props.customer.activationStatus !== null && this.props.customer.activationStatus !== '') {
            const statusClass = this.props.customer.activationResult !== undefined && this.props.customer.activationResult !== null && this.props.customer.activationResult === 'ok' ? 'span-success' : 'span-error';
            return (<span className={statusClass}>{this.props.customer.activationStatus}</span>);
        }
        return null;
    }
}


CustomerTrigger.propTypes = {
    customer: PropTypes.object.isRequired,
    current: PropTypes.number,
    requested: PropTypes.number,
    isWithWarning: PropTypes.bool
};
