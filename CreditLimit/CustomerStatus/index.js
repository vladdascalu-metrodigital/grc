import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomerInfo from './CustomerInfo';
import RequestCredit from './RequestCredit';
import LimitStatus from './LimitStatus';
import PendingRequestInfo from './PendingRequestInfo';
import { Route, Switch } from 'react-router-dom';
import { lookup } from '../../Util/translations';
import Precheck from './Precheck';
import { displayName } from '../../Util/index';
import RecentRequestsInfo from '../../RecentRequestsInfo';
import './index.scss';
import CustomerDataGroup from '../../CustomerDataGroup';
import MainContent from '../../MainContent';

export default class CustomerStatusLayout extends Component {
    constructor(props) {
        super(props);
        const { country, storeNumber, customerNumber } = this.buildCustomerInfoData();
        this.props.loadCustomerData(country, storeNumber, customerNumber);
        this.props.loadPendingRequest(country, storeNumber, customerNumber);
        this.props.loadRecentRequests(country, storeNumber, customerNumber);
        this.props.showAuxControl({ back: true });
    }

    componentWillUnmount() {
        this.props.cleanup();
    }

    /**
     * @overload livecycle callback to check for valid data actually loaded
     *
     * @param nextProps
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.props.updateUiPageTitle(lookup('mrc.apps.limitcheck'));
        //
        // in case we got data, prepare it
        //
        if (nextProps.customers && nextProps.customers.data) {
            const cust = nextProps.customers.data.customers;

            // this is the requesting customer
            const reqCust = this.buildCustomerInfoData();

            //
            // mark the requested customer
            //
            cust.forEach(c => this.markRequestedCustomer(reqCust, c));

            //
            // sort by customerID, taking the requestedCustomer first
            //
            cust.sort((custa, custb) => {
                if (custa.requestedCustomer) return -1;
                if (custb.requestedCustomer) return 1;

                if (custa.storeNumber !== custb.storeNumber) {
                    return Number.parseInt(custa.storeNumber) - Number.parseInt(custb.storeNumber);
                }

                return Number.parseInt(custa.customerNumber) - Number.parseInt(custb.customerNumber);
            });
        }
    }

    /*
        private helper
     */
    markRequestedCustomer(reqCust, cust) {
        if (
            reqCust.country === cust.country &&
            reqCust.storeNumber === cust.storeNumber &&
            reqCust.customerNumber === cust.customerNumber
        ) {
            cust.requestedCustomer = true;
        }
    }

    buildCustomerInfoData() {
        const params = this.props.match.params;
        return {
            customerNumber: decodeURIComponent(params.customerNumber),
            storeNumber: decodeURIComponent(params.storeNumber),
            name: this.displayName(this.getCustomer()),
            country: decodeURIComponent(params.country),
        };
    }

    getCustomer() {
        if (!this.props.customers || !this.props.customers.data) {
            return null;
        }
        return this.props.customers.data.customers.filter(
            customer =>
                customer.customerNumber == this.props.match.params.customerNumber &&
                customer.storeNumber == this.props.match.params.storeNumber
        )[0];
    }

    displayName(customer) {
        if (customer == null) {
            return 'No name';
        }
        return displayName(customer);
    }

    render() {
        if (!this.props.customers || !this.props.customers.data) return null;
        const cid = this.buildCustomerInfoData();
        let btnDisabledRequests = this.props.customers.data.requestsDisabled
            ? this.props.customers.data.requestsDisabled
            : false;
        let btnDisabledPrechecks = false;
        if (this.props.customers.data.precheckErrors) {
            btnDisabledPrechecks = this.props.customers.data.precheckErrors.length > 0;
        }
        return (
            <Switch>
                <Route
                    path="*/customerdetails"
                    render={() => {
                        return (
                            <MainContent>
                                <CustomerDataGroup
                                    customers={this.props.customers.data.customers}
                                    countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
                                />
                            </MainContent>
                        );
                    }}
                />
                <Route
                    path="*"
                    render={() => (
                        <div className="mrc-customer-status">
                            <LimitStatus requestedCustomer={this.getCustomer()} customers={this.props.customers} />
                            <CustomerInfo data={cid} showLink={!!this.props.customers.data} match={this.props.match} />
                            <PendingRequestInfo pendingRequest={this.props.pendingRequest} />
                            <Precheck customers={this.props.customers} />
                            <RequestCredit
                                selectedCustomerInfo={cid}
                                disabledRequests={btnDisabledRequests}
                                disabledPrechecks={btnDisabledPrechecks}
                                {...this.props}
                            />
                            {this.props.recentRequests.loading ? null : (
                                <RecentRequestsInfo
                                    recentRequests={this.props.recentRequests}
                                    isTablet={this.props.isTablet}
                                />
                            )}
                        </div>
                    )}
                />
            </Switch>
        );
    }
}

CustomerStatusLayout.propTypes = {
    cleanup: PropTypes.func.isRequired,
    loadCustomerData: PropTypes.func.isRequired,
    loadPendingRequest: PropTypes.func.isRequired,
    loadRecentRequests: PropTypes.func.isRequired,
    updateUiPageTitle: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    customers: PropTypes.object.isRequired, // For LimitStatus and RequestCredit
    match: PropTypes.object.isRequired,
    pendingRequest: PropTypes.object.isRequired,
    recentRequests: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    isTablet: PropTypes.bool,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
