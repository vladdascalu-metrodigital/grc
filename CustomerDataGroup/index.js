import React, { Component } from 'react';

import './index.scss';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import SingleCustomerData from './SingleCustomerData';

export default class CustomerDataGroup extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <h2 className="mrc-ui-customer-tab-title">{lookup('mrc.customerdata.title')}</h2>
                    {this.renderCustomersInGroup()}
                </div>
            </React.Fragment>
        );
    }

    renderCustomersInGroup() {
        if (!this.props.customers) return null;

        return this.props.customers.map((customer, i) => {
            return (
                <SingleCustomerData
                    customer={customer}
                    countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
                    open={i === 0}
                />
            );
        });
    }
}

CustomerDataGroup.propTypes = {
    customers: PropTypes.array,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
