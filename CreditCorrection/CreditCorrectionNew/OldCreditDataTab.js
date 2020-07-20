import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreditData from '../CreditDataNew';
import '../../tabs.scss';
import { Accordion, Collapsible } from '../../Accordion';
import { displayName } from '../../Util';
import CustomerTrigger from '../../CustomerTrigger/presentation';
import { lookup } from '../../Util/translations';
import './index.scss';
import CustomerGroupLimits from '../../CustomerGroupLimits';
import BlockingDropdown from '../BlockingDropdown';

import * as _ from 'lodash';

export default class OldCreditDataTab extends Component {
    ALL_BLOCKING_OPTIONS = [
        'mrc.blocking-option.hardblock',
        'mrc.blocking-option.generalblock',
        'mrc.blocking-option.softblock',
        'mrc.blocking-option.credittocash',
        'mrc.blocking-option.removeblock',
    ];
    HARD_BLOCKING_OPTIONS = ['mrc.blocking-option.hardblock', 'mrc.blocking-option.generalblock'];
    COUNTRY_BLOCKING_OPTIONS = {
        DE: [null, 'mrc.blocking-option.hardblock', 'mrc.blocking-option.credittocash'],
        PL: [
            null,
            'mrc.blocking-option.generalblock',
            'mrc.blocking-option.softblock',
            'mrc.blocking-option.credittocash',
            'mrc.blocking-option.removeblock',
        ],
        AT: [null, 'mrc.blocking-option.softblock'],
    };

    constructor(props) {
        super(props);
        this.state = {
            creditDataValid: false,
            creditDataComponentsValid: {},
            currentGroupLimit: 0,
            availableGroupLimit: 0,
            exhaustionGroupLimit: 0,
            requestedGroupLimit: 0,
            blockingValues: {},
            blockingCallbacks: {},
        };
        this.onBlockingDropdownChange = this.onBlockingDropdownChange.bind(this);
        this.blockingCallback = this.blockingCallback.bind(this);

        //when we block a customer, the payment doesn't change in MCFM and we need to invalidate it manually
        if (
            this.props.request.data &&
            this.props.request.data.requestedItems &&
            this.props.request.data.requestedItems[0].customer &&
            this.props.request.data.requestedItems[0].customer.creditLimitStatus === 'blocked'
        ) {
            this.props.request.data.requestedItems.map((item) => {
                item.creditData.id = '';
                item.creditData.creditProduct = '';
                item.creditData.creditPeriod = '';
                item.creditData.debitType = '';
            });
        }

        if (this.props.request.data && this.props.request.data !== null) {
            this.state = {
                ...this.state,
                ...this.setGeneralData(this.props.request.data),
            };
        }
    }

    /**
     * @overload livecycle callback to check for valid data actually loaded
     *
     * @param nextProps
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        //
        // in case we got data, prepare it
        //
        if (nextProps.request && nextProps.request.data) {
            const req = nextProps.request.data;

            this.setState({ ...this.setGeneralData(req) });
        }
    }

    setGeneralData(req) {
        //
        // mark the requested customer
        //
        req.requestedItems.forEach((ri) => this.markRequestedCustomer(req.requestedCustomerId, ri.customer));

        //
        // sort by customerID, taking the requestedCustomer first
        //
        req.requestedItems.sort((a, b) => {
            const custa = a.customer;
            const custb = b.customer;
            if (custa.requestedCustomer) return -1;
            if (custb.requestedCustomer) return 1;

            if (custa.storeNumber !== custb.storeNumber) {
                return Number.parseInt(custa.storeNumber) - Number.parseInt(custb.storeNumber);
            }

            return Number.parseInt(custa.customerNumber) - Number.parseInt(custb.customerNumber);
        });
        let currentGroupLimit = 0;
        let requestedGroupLimit = 0;
        let availableGroupLimit = 0;
        let exhaustionGroupLimit = 0;
        req.requestedItems.map((item) => {
            currentGroupLimit += item.customer.creditLimit;
            const amount =
                !_.isNil(item.creditData.amount) && !_.isNaN(item.creditData.amount)
                    ? item.creditData.amount
                    : !_.isNil(item.customer.creditLimit)
                    ? item.customer.creditLimit
                    : 0;
            requestedGroupLimit += amount;
            exhaustionGroupLimit += item.customer.limitExhaustion;
        });
        availableGroupLimit = currentGroupLimit - exhaustionGroupLimit;
        return {
            currentGroupLimit: currentGroupLimit,
            requestedGroupLimit: requestedGroupLimit,
            availableGroupLimit: availableGroupLimit,
            exhaustionGroupLimit: exhaustionGroupLimit,
        };
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

    setComponentValidity(id, valid) {
        const newValidity = this.state.creditDataComponentsValid;
        newValidity[id] = valid;

        const requestor = this.props.request.data.requestedItems.find((request) => request.customer.requestedCustomer);
        const requestorCreditDataIsValid = newValidity[requestor.id];
        const creditDataValid =
            Object.values(newValidity).every((v) => v === true || v == null) && requestorCreditDataIsValid === true;

        if (creditDataValid !== this.state.creditDataValid) {
            this.props.onCreditDataValidChange(creditDataValid);
        }

        this.setState({
            ...this.state,
            creditDataComponentsValid: newValidity,
            creditDataValid: creditDataValid,
        });
    }

    createBlockingOptions(country) {
        if (this.COUNTRY_BLOCKING_OPTIONS[country]) {
            return this.COUNTRY_BLOCKING_OPTIONS[country];
        }

        return [];
    }

    onBlockingDropdownChange(id, newBlockingValue) {
        const blockingValues = { ...this.state.blockingValues };

        // remove blocks for all the customers in the group if one of them goes from hard block to any other option
        if (
            this.HARD_BLOCKING_OPTIONS.includes(blockingValues[id]) &&
            !this.HARD_BLOCKING_OPTIONS.includes(newBlockingValue)
        ) {
            this.props.request.data.requestedItems.map((item) => {
                if (item.id === id) {
                    blockingValues[item.id] = newBlockingValue;
                    this.state.blockingCallbacks[item.id] && this.state.blockingCallbacks[item.id](newBlockingValue);
                } else if (this.HARD_BLOCKING_OPTIONS.includes(blockingValues[item.id])) {
                    blockingValues[item.id] = '';
                    this.state.blockingCallbacks[item.id] && this.state.blockingCallbacks[item.id]('');
                }
            });
            blockingValues['groupLevel'] = '';
        }

        //set blocking to all the customers in the group if the new blocking value is HARDBLOCK or GENERALBLOCK, or if the Group Level Dropdown was selected
        if (this.HARD_BLOCKING_OPTIONS.includes(newBlockingValue) || id === 'groupLevel') {
            this.props.request.data.requestedItems.map((item) => {
                this.state.blockingCallbacks[item.id] && this.state.blockingCallbacks[item.id](newBlockingValue);
                blockingValues[item.id] = newBlockingValue;
            });
            blockingValues['groupLevel'] = newBlockingValue;
        } else {
            //set blocking only to the customer which selected the blocking dropdown, when not having a group blocking
            blockingValues['groupLevel'] = '';

            this.props.request.data.requestedItems.map((item) => {
                if (item.id === id) {
                    this.state.blockingCallbacks[item.id] && this.state.blockingCallbacks[item.id](newBlockingValue);
                    blockingValues[item.id] = newBlockingValue;
                }
            });
        }
        this.setState({ blockingValues: blockingValues });
    }

    createToggles() {
        return <div className="credit-options">{}</div>;
    }

    createGroupLimitInfos() {
        return (
            <CustomerGroupLimits
                country={this.props.request.data.requestedItems[0].customer.country}
                exhaustionGroupLimit={this.state.exhaustionGroupLimit}
                requestedGroupLimit={this.state.requestedGroupLimit}
                currentGroupLimit={this.state.currentGroupLimit}
                availableGroupLimit={this.state.availableGroupLimit}
            />
        );
    }

    handleRequestedGroupLimitChange() {
        let requestedGroupLimitNew = 0;
        if (this.props.request != null && this.props.request.data != null) {
            this.props.request.data.requestedItems.map((item) => {
                const amount =
                    !_.isNil(item.creditData.amount) && !_.isNaN(item.creditData.amount)
                        ? item.creditData.amount
                        : !_.isNil(item.customer.creditLimit)
                        ? item.customer.creditLimit
                        : 0;
                requestedGroupLimitNew += amount;
            });
            this.setState({
                requestedGroupLimit: requestedGroupLimitNew,
            });
        }
    }

    blockingCallback = (id, callback) => {
        const blockingCallbacks = this.state.blockingCallbacks;
        blockingCallbacks[id] = callback;
        this.setState({ blockingCallbacks: blockingCallbacks });
    };

    customerSuccessActivation(customer) {
        if (
            !customer ||
            customer === null ||
            !customer.activationInfo ||
            customer.activationInfo === null ||
            !customer.activationInfo.resultCode ||
            customer.activationInfo.resultCode === null
        ) {
            return false;
        }

        return customer.activationInfo.resultCode === '0' || customer.activationInfo.resultCode === '-1';
    }

    render() {
        if (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems) {
            return null;
        }
        const requestData = this.props.request.data;

        const activated = requestData.activated !== undefined ? requestData.activated : false;
        //TODO: don't get canceled from the state, get it from the request.... what will happen if the user refreshes the page ?
        const disabled = this.state.canceled || !requestData.canCorrect || activated;

        const groupPanels = requestData.requestedItems.map((item, i) => {
            const workaroundCustomer = {
                storeNumber: item.customer.storeNumber,
                customerNumber: item.customer.customerNumber,
                firstName: item.customer.customerFirstName,
                lastName: item.customer.customerLastName,
                customerFirstName: item.customer.customerFirstName,
                customerLastName: item.customer.customerLastName,
                requestedCustomer: item.customer.requestedCustomer,
                country: item.customer.country,
                activationResult: '',
                activationStatus: '',
                limitExhaustion: item.customer.limitExhaustion,
            };
            const activationSuffix =
                item.activationInfo != null && item.activationInfo.resultCode != null ? ' -> ' : '';
            if (item.activationInfo != null && item.activationInfo.resultStatus != null) {
                workaroundCustomer.activationStatus = lookup('history.' + item.activationInfo.resultStatus);
                workaroundCustomer.activationResult = this.customerSuccessActivation(item) ? 'ok' : 'failed';
            }
            const customerDisabled = disabled || this.customerSuccessActivation(item);
            workaroundCustomer.lastName = item.customer.customerLastName + ' ' + activationSuffix + ' '; //just for showing the message of activation
            workaroundCustomer.customerLastName = item.customer.customerLastName + ' ' + activationSuffix + ' '; //just for showing the message of activation
            const key = workaroundCustomer.storeNumber + '/' + workaroundCustomer.customerNumber;

            const trigger = (
                <CustomerTrigger
                    customer={workaroundCustomer}
                    current={item.customer.creditLimit}
                    requested={item.creditData.amount ? item.creditData.amount : null}
                />
            );

            // don't think we need this, we can handle the translation when we show the blocking option and don't use
            // the entire label in the business logic
            // if (item.creditData.blockingOption && !item.creditData.blockingOption.includes('mrc.blocking-option.')) {
            //     item.creditData.blockingOption = 'mrc.blocking-option.'.concat(
            //         item.creditData.blockingOption.toLowerCase()
            //     );
            // }

            return (
                <Collapsible open={i === 0} key={key} trigger={trigger}>
                    <CreditData
                        key={item.creditData.id}
                        headerTitle={
                            lookup('creditcorrection.limitrequest.headers.creditrequest') +
                            ' ' +
                            displayName(item.customer)
                        }
                        paymentReadyToBeSelected={!customerDisabled}
                        requestedItem={item}
                        setCreditData={!customerDisabled ? this.props.setCreditData.bind(this, requestData) : null}
                        setValidity={this.setComponentValidity.bind(this, item.id)}
                        handleRequestedGroupLimitChange={this.handleRequestedGroupLimitChange.bind(this)}
                        canCorrect={this.props.request.data.canCorrect}
                        onBlockingChange={this.onBlockingDropdownChange}
                        blockingItemId={item.id}
                        blockingOptions={this.createBlockingOptions(item.customer.country)}
                        blockingLabel={lookup('mrc.blocking.customer-dropdown')}
                        blockingValue={
                            this.state.blockingValues && this.state.blockingValues[item.id]
                                ? this.state.blockingValues[item.id]
                                : ''
                        }
                        registerCallbackBlocking={this.blockingCallback}
                    />
                </Collapsible>
            );
        });
        if (this.props.request.data.requestedItems.length > 1) {
            return (
                <Accordion>
                    {this.createToggles()}
                    {this.createGroupLimitInfos()}
                    <BlockingDropdown
                        id="groupLevel"
                        updateDropdownValue={this.onBlockingDropdownChange}
                        value={this.state.blockingValues ? this.state.blockingValues['groupLevel'] : ''}
                        options={this.createBlockingOptions(this.props.request.data.requestedItems[0].customer.country)}
                        label={lookup('mrc.blocking.group-dropdown')}
                    />
                    {groupPanels}{' '}
                </Accordion>
            );
        } else {
            return (
                <Accordion>
                    {this.createToggles()} {groupPanels}{' '}
                </Accordion>
            );
        }
    }
}

OldCreditDataTab.propTypes = {
    request: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.shape({
            activated: PropTypes.bool,
            canBlock: PropTypes.bool,
            canCorrect: PropTypes.bool,

            requestedItems: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    customer: PropTypes.shape({
                        country: PropTypes.string,
                        storeNumber: PropTypes.string,
                        customerNumber: PropTypes.string,
                        customerFirstName: PropTypes.string,
                        customerLastName: PropTypes.string,
                        requestedCustomer: PropTypes.bool,
                        limitExhaustion: PropTypes.number,
                        creditLimit: PropTypes.number,
                        creditLimitStatus: PropTypes.string,
                        currentPayment: PropTypes.shape({
                            creditProduct: PropTypes.string,
                            creditPeriod: PropTypes.string,
                            debitType: PropTypes.string,
                        }),
                        availablePayments: PropTypes.arrayOf(
                            PropTypes.shape({
                                creditProduct: PropTypes.string,
                                creditPeriod: PropTypes.string,
                                debitType: PropTypes.string,
                            })
                        ),
                    }),
                    creditData: PropTypes.shape({
                        id: PropTypes.string,
                        amount: PropTypes.number,
                        initialAmount: PropTypes.number,
                        creditProduct: PropTypes.string,
                        creditPeriod: PropTypes.string,
                        debitType: PropTypes.string,
                        blockingOption: PropTypes.string,
                    }),
                    activationInfo: PropTypes.shape({
                        resultCode: PropTypes.string,
                        resultMessage: PropTypes.string,
                        resultStatus: PropTypes.string,
                    }),
                })
            ),
        }),
    }),
    onCreditDataValidChange: PropTypes.func,
    setCreditData: PropTypes.func,
};
