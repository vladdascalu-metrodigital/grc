import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {displayName} from '../Util';
import {lookup} from '../Util/translations';


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

    render() {
        return (<div className='mrc-customer-trigger'>
            <span>{this.props.customer.requestedCustomer ? '*' : ''} {this.props.customer.storeNumber + '/' + this.props.customer.customerNumber} {this.displayName()}</span>
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
}


CustomerTrigger.propTypes = {
    customer: PropTypes.object.isRequired,
    current: PropTypes.number,
    requested: PropTypes.number
};
