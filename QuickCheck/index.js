import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomerInfo from './CustomerInfo';
import RequestQuick from './RequestQuick';
import LimitStatus from './LimitStatus';
import CustomerDetailsGroup from '../CreditLimit/CustomerDetailsGroup';
import { Route, Switch } from 'react-router-dom';
import Panel from '../Panel';
import { lookup } from '../Util/translations';
import { displayName } from '../Util/index';
import RecentRequestsInfo from '../RecentRequestsInfo';
import './index.scss';

export default class QuickStatusLayout extends Component {
    constructor(props) {
        super(props);
        const { country, storeNumber, customerNumber } = this.buildCustomerInfoData();
        this.props.loadCustomerData(country, storeNumber, customerNumber);
        // this.props.loadcustomerRequest(country, storeNumber, customerNumber);
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
        this.props.updateUiPageTitle(lookup('mrc.apps.quickcheck'));
        //
        // in case we got data, prepare it
        //
        if (nextProps.customers && nextProps.customers.data && !nextProps.customers.data.error) {
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
        if (this.props.customers.data.error) {
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
        if (this.props.customers.data.error) return <h2 className="not-found">{lookup('mrc.qcr.notenabled')}</h2>;
        const cid = this.buildCustomerInfoData();
        let btnDisabled = false;
        const precheckErrors = this.props.customers.data.precheckErrors.filter(function(element) {
            return element.reason !== 'strategy.init.failed.runningRequest';
        });
        if (precheckErrors) {
            btnDisabled = precheckErrors.length > 0;
        }
        return (
            <Switch>
                <Route
                    path="*/customerdetails"
                    render={() => {
                        const customerStatusLink = this.props.match.url.replace('/customerdetails', '');
                        return (
                            <Panel
                                className="customer-status-details-panel"
                                title={lookup('mrc.customerdetails.title')}
                                closeTo={customerStatusLink}
                            >
                                <CustomerDetailsGroup
                                    customers={this.props.customers.data.customers}
                                    countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
                                />
                            </Panel>
                        );
                    }}
                />
                <Route
                    path="*"
                    render={() => (
                        <div className="mrc-customer-status">
                            {<LimitStatus requestedCustomer={this.getCustomer()} customers={this.props.customers} />}
                            <CustomerInfo data={cid} showLink={!!this.props.customers.data} match={this.props.match} />
                            <RequestQuick selectedCustomerInfo={cid} disabled={btnDisabled} {...this.props} />
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

QuickStatusLayout.propTypes = {
    cleanup: PropTypes.func.isRequired,
    loadCustomerData: PropTypes.func.isRequired,
    // loadPendingRequest: PropTypes.func.isRequired,
    loadRecentRequests: PropTypes.func.isRequired,
    updateUiPageTitle: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    customers: PropTypes.object.isRequired, // For LimitStatus and RequestCredit
    match: PropTypes.object.isRequired,
    pendingRequest: PropTypes.object.isRequired,
    recentRequests: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    requestQuick: PropTypes.func.isRequired,
    isTablet: PropTypes.bool,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
