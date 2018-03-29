import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Moment from 'react-moment';
import CustomerDetailsDE from './CustomerDetails_DE';
import CustomerDetailsEN from './CustomerDetails_EN';
import './index.scss';

export default class CustomerDetails extends Component {

    createCustomerDetails(customers) {
        const myLocale = Moment.globalLocale || '';
        switch (myLocale.toLowerCase()) {
            case 'en':
                return customers.map((c,i) => <CustomerDetailsEN key={i} customer={c}/>);
            case 'de':
                return customers.map((c,i) => <CustomerDetailsDE key={i} customer={c}/>);
            default:
                console.warn('Falling back to EN because users country is: ' + myLocale);
                return customers.map((c,i) => <CustomerDetailsEN key={i} customer={c}/>);
        }
    }

    render() {
        if (!this.props.customers || this.props.customers.length <= 0) {
            return <div>No customer loaded.</div>;
        }
        let limit = 100;
        //const hint = this.props.customers.length > limit ? <div key='end'>Only the first {{limit}} customers are displayed.</div> : null;
        return (
            <section className='mrc-customers-details'>
                {this.createCustomerDetails(
                    this.props.customers.filter(c => !!c)).filter((c, idx) => idx <= limit)
                }
            </section>
        );
    }
}

CustomerDetails.propTypes = {
    customers: PropTypes.array
};


