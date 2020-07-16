import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/index';
import ProgressBar from '../../ProgressBar';
import CreditData from '../CreditData';
import Comments from '../../Comments';
import Attachments from '../../Attachments';
import { Route, Switch } from 'react-router-dom';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import '../../tabs.scss';
import { Accordion, Collapsible } from '../../Accordion';
import RequestSubmitted from './RequestSubmitted';
import { displayName } from '../../Util';
import CustomerTrigger from '../../CustomerTrigger/presentation';
import { lookup } from '../../Util/translations';
import './index.scss';
import MrcSpinner from '../../Util/MrcSpinner';
import CustomerGroupLimits from '../../CustomerGroupLimits';
import BlockingDropdown from '../BlockingDropdown';

import * as _ from 'lodash';
import CustomerDataGroup from '../../CustomerDataGroup';

export default class CreditCorrectionLayout extends Component {
    FILE_TYPES = [''];
    canBlock = false;
    canCorrect = false;
    ALL_BLOCKING_OPTIONS = [
        'mrc.blocking-option.hardblock',
        'mrc.blocking-option.generalblock',
        'mrc.blocking-option.softblock',
        'mrc.blocking-option.credittocash',
        'mrc.blocking-option.removeblock',
    ];
    HARD_BLOCKING_OPTIONS = ['mrc.blocking-option.hardblock', 'mrc.blocking-option.generalblock'];
    DE_BLOCKING_OPTIONS = [null, 'mrc.blocking-option.hardblock', 'mrc.blocking-option.credittocash'];
    PL_BLOCKING_OPTIONS = [
        null,
        'mrc.blocking-option.generalblock',
        'mrc.blocking-option.softblock',
        'mrc.blocking-option.credittocash',
        'mrc.blocking-option.removeblock',
    ];
    AT_BLOCKING_OPTIONS = [null, 'mrc.blocking-option.softblock'];
    DEFAULT_BLOCKING_OPTIONS = [null, 'mrc.blocking-option.hardblock'];

    constructor(props) {
        super(props);
        // this.handleRequestedLimitChange = this.handleRequestedLimitChange.bind(this);
        this.state = {
            creditDataValid: false,
            creditDataComponentsValid: {},
            currentGroupLimit: 0,
            availableGroupLimit: 0,
            exhaustionGroupLimit: 0,
            requestedGroupLimit: 0,
            approvedGroupLimit: 0,
            canceled: false,
            enableSpinner: false,
            newComment: '',
            blockingValues: {},
            isBlockingUpdated: false,
            blockingCallbacks: {},
        };
        this.addNewComment = this.addNewComment.bind(this);
        this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
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
    }

    UNSAFE_componentWillMount() {
        this.props.showAuxControl({ back: true });
        this.props.loadRequest(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.cleanup();
    }

    componentDidUpdate(prevState) {
        if (prevState.enableSpinner) {
            this.setState({ enableSpinner: false });
        }
    }

    /**
     * @overload livecycle callback to check for valid data actually loaded
     *
     * @param nextProps
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.props.updateUiPageTitle(lookup('creditcorrection.limitrequest.title'));
        //
        // in case we got data, prepare it
        //
        if (nextProps.request && nextProps.request.data) {
            const req = nextProps.request.data;

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
            if (nextProps.request != null && nextProps.request.data != null) {
                nextProps.request.data.requestedItems.map((item) => {
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
                this.setState({
                    currentGroupLimit: currentGroupLimit,
                    requestedGroupLimit: requestedGroupLimit,
                    availableGroupLimit: availableGroupLimit,
                    exhaustionGroupLimit: exhaustionGroupLimit,
                });
            }
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

    createProgressBar() {
        const request = this.props.request.data;
        if (request) {
            const totalSteps = request.containsContracting ? 4 : 3;
            return <ProgressBar name={lookup('mrc.phase.initialization')} step={1} totalSteps={totalSteps} />;
        } else {
            return null;
        }
    }

    createButtons() {
        const creditCorrectionRequest = this.props.request.data;
        var disabled = true;
        this.canBlock = creditCorrectionRequest.canBlock;
        this.canCorrect = creditCorrectionRequest.canCorrect;
        if (creditCorrectionRequest != null) {
            const notNullActivations = creditCorrectionRequest.requestedItems.filter((ri) => ri.activationInfo != null);
            if (notNullActivations.length === 0) {
                disabled = false;
            } else {
                const unsuccessfullActivations = notNullActivations.filter(
                    (a) => a.activationInfo.resultCode !== '0' && a.activationInfo.resultCode !== '-1'
                );
                if (unsuccessfullActivations.length !== 0) {
                    disabled = false;
                }
            }
        }
        return (
            <div className="mrc-btn-group">
                {
                    <Button
                        text={lookup('creditcorrection.cancel')}
                        id="mrc-cancel-button"
                        status="secondary"
                        disabled={disabled || this.state.canceled}
                        onClick={() => {
                            this.setState({ ...this.state, canceled: true, enableSpinner: true });
                            this.props.cancel(creditCorrectionRequest.id);
                        }}
                    />
                }
                <Button
                    text={lookup('creditcorrection.applychanges')}
                    id="mrc-applychanges-button"
                    status={!(this.state.creditDataValid && !this.state.canceled) || disabled ? 'secondary' : 'success'}
                    disabled={
                        !(this.state.creditDataValid && !this.state.canceled) ||
                        disabled ||
                        this.props.request.data.requestsDisabled
                    }
                    onClick={() => {
                        this.setState({ enableSpinner: true });
                        this.props.submitRequest(creditCorrectionRequest.id, 'APPROVED');
                    }}
                />
            </div>
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (!(this.state && this.state.creditDataValid)) {
            console.warn('Form is not valid, abort submit.');
            return;
        }
        this.props.submitRequest(this.props.request.data.id);
    }

    createCustomerDetailsPanel(req) {
        // in case there is some data, retrieve list of customers from list of requestedItems
        const customers = req.data && req.data.requestedItems.map((ri) => ri.customer);

        return <CustomerDataGroup customers={customers} />;
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

    createRequestPanel() {
        let paymentReadyToBeSelected = false;
        if (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems) {
            return null;
        } else {
            paymentReadyToBeSelected = true;
        }
        const activated = this.props.request.data.activated !== undefined ? this.props.request.data.activated : false;
        const groupPanels = this.props.request.data.requestedItems.map((item, i) => {
            const creditCorrectionRequest = this.props.request.data;
            let editable = true;
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
                workaroundCustomer.activationResult =
                    item.activationInfo.resultCode != null &&
                    (item.activationInfo.resultCode === '0' || item.activationInfo.resultCode === '-1')
                        ? 'ok'
                        : 'failed';
            }
            if (
                activated ||
                (item.activationInfo != null &&
                    item.activationInfo.resultCode != null &&
                    (item.activationInfo.resultCode === '0' || item.activationInfo.resultCode === '-1'))
            ) {
                editable = false;
            }
            workaroundCustomer.lastName = item.customer.customerLastName + ' ' + activationSuffix + ' '; //just for showing the message of activation
            workaroundCustomer.customerLastName = item.customer.customerLastName + ' ' + activationSuffix + ' '; //just for showing the message of activation
            const key = workaroundCustomer.storeNumber + '/' + workaroundCustomer.customerNumber;
            if (this.state.creditDataById && this.state.creditDataById[item.id]) {
                item.creditData = this.state.creditDataById[item.id];
            }
            const trigger = (
                <CustomerTrigger
                    customer={workaroundCustomer}
                    current={item.customer.creditLimit}
                    requested={item.creditData.amount ? item.creditData.amount : null}
                />
            );

            if (item.creditData.blockingOption && !item.creditData.blockingOption.includes('mrc.blocking-option.')) {
                item.creditData.blockingOption = 'mrc.blocking-option.'.concat(
                    item.creditData.blockingOption.toLowerCase()
                );
            }

            return (
                <Collapsible open={i === 0} key={key} trigger={trigger}>
                    <CreditData
                        key={item.creditData.id}
                        headerTitle={
                            lookup('creditcorrection.limitrequest.headers.creditrequest') +
                            ' ' +
                            displayName(item.customer)
                        }
                        paymentReadyToBeSelected={
                            paymentReadyToBeSelected &&
                            editable &&
                            !this.state.canceled &&
                            this.props.request.data.canCorrect
                        }
                        requestedItem={item}
                        setCreditData={
                            paymentReadyToBeSelected && editable && !this.state.canceled
                                ? this.props.setCreditData.bind(this, creditCorrectionRequest)
                                : null
                        }
                        setValidity={this.setComponentValidity.bind(this, item.id)}
                        handleRequestedGroupLimitChange={this.handleRequestedGroupLimitChange.bind(this)}
                        canCorrect={this.props.request.data.canCorrect}
                        isNewCorrection={this.props.isNewCorrection}
                        onBlockingChange={this.onBlockingDropdownChange}
                        blockingItemId={item.id}
                        blockingOptions={this.createBlockingOptions(item.customer.country)}
                        blockingLabel={lookup('mrc.blocking.customer-dropdown')}
                        blockingValue={
                            this.state.blockingValues && this.state.blockingValues[item.id]
                                ? this.state.blockingValues[item.id]
                                : ''
                        }
                        updateBlocking={this.state.isBlockingUpdated}
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

    setComponentValidity(id, valid) {
        const newValidity = this.state.creditDataComponentsValid;
        newValidity[id] = valid;

        const requestor = this.props.request.data.requestedItems.find((request) => request.customer.requestedCustomer);
        const requestorCreditDataIsValid = newValidity[requestor.id];

        this.setState({
            ...this.state,
            creditDataComponentsValid: newValidity,
            creditDataValid:
                Object.values(newValidity).every((v) => v === true || v == null) && requestorCreditDataIsValid === true,
        });
    }

    handleNewCommentChange(text) {
        this.setState({ newComment: text === undefined || text === null ? '' : text });
    }

    addNewComment = () => {
        if (!this.props.request.data) return;

        const creditCorrectionRequest = this.props.request.data;
        const comment = this.state.newComment;
        this.setState({ newComment: '' });
        if (comment.trim().length > 0) {
            this.props.addComment(creditCorrectionRequest.id, comment);
        }
    };

    createCommentsPanel() {
        if (!this.props.request.data) return null;
        const creditCorrectionRequest = this.props.request.data;
        return (
            <Comments
                ready={this.props.request.data && !this.props.request.loading}
                newComment={this.state.newComment}
                data={creditCorrectionRequest.comments}
                addComment={this.addNewComment}
                handleNewCommentChange={this.handleNewCommentChange}
                addCommentTitle={lookup('mrc.comments.addcomment')}
            />
        );
    }

    createAttachmentsPanel() {
        const creditCorrectionRequest = this.props.request.data || {};
        if (creditCorrectionRequest.fileTypes) this.FILE_TYPES = creditCorrectionRequest.fileTypes;

        const activated = creditCorrectionRequest.activated !== undefined ? creditCorrectionRequest.activated : false;
        const disabled = this.state.canceled || activated;
        const attachments = creditCorrectionRequest.attachments;

        return (
            <Attachments
                noDeletedAttachmentsToggle={true}
                noPlaceholder={true}
                attachments={(attachments ? attachments : []).map((a) => {
                    return a.deleted
                        ? /* eslint-disable */
                          // restore is not used for credit correction at the
                          // moment. Left in for possible future use
                          {
                              ...a,
                              status: 'deleted',
                              secondaryInteraction: disabled ? null : 'restore',
                              handleSecondaryAction: () =>
                                  this.props.restoreAttachment(creditCorrectionRequest.id, a.id),
                          }
                        : {
                              ...a,
                              status: 'normal',
                              secondaryInteraction: disabled ? null : 'delete',
                              handleSecondaryAction: () =>
                                  this.props.deleteAttachment(creditCorrectionRequest.id, a.id),
                          };
                    /* eslint-enable */
                })}
                addAttachment={(fileType, file, title) =>
                    this.props.addAttachment(fileType, creditCorrectionRequest.id, file, title)
                }
                readonly={disabled}
                disabled={disabled}
                fileTypes={this.FILE_TYPES}
                country={
                    creditCorrectionRequest && creditCorrectionRequest.requestedCustomerId
                        ? creditCorrectionRequest.requestedCustomerId.country.toLowerCase()
                        : null
                }
            />
        );
    }

    createBlockingOptions(country) {
        let returnValue = null;
        switch (country) {
            case 'DE':
                returnValue = this.DE_BLOCKING_OPTIONS;
                break;
            case 'AT':
                returnValue = this.AT_BLOCKING_OPTIONS;
                break;
            case 'PL':
                returnValue = this.PL_BLOCKING_OPTIONS;
                break;
            default:
                returnValue = this.PL_BLOCKING_OPTIONS;
        }
        return returnValue;
    }

    blockingCallback = (id, callback) => {
        const blockingCallbacks = this.state.blockingCallbacks;
        blockingCallbacks[id] = callback;
        this.setState({ blockingCallbacks: blockingCallbacks });
    };

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

    render() {
        const req = this.props.request;
        if (
            this.state.enableSpinner &&
            (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems)
        ) {
            return <MrcSpinner></MrcSpinner>;
        }
        if (
            !this.state.enableSpinner &&
            this.props.request.loading &&
            (!this.props.request.data || !this.props.request.data.requestedItems)
        ) {
            return <MrcSpinner></MrcSpinner>;
        }
        if (!this.state.enableSpinner && (!this.props.request.data || !this.props.request.data.requestedItems)) {
            return <MrcSpinner></MrcSpinner>;
        }
        return (
            <Switch>
                <Route
                    path="*/submitted"
                    render={() => {
                        return <RequestSubmitted data={this.props.request.data} />;
                    }}
                />

                <Route
                    path="*"
                    render={() => (
                        <form method="POST" className="mrc-limit-request" onSubmit={this.handleFormSubmit.bind(this)}>
                            {this.createProgressBar()}
                            {this.props.isTablet ? (
                                <Tabs forceRenderTabPanel={true}>
                                    <TabList>
                                        <Tab>{lookup('mrc.creditdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.customerdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.comments.title')}</Tab>
                                        <Tab>{lookup('mrc.attachments.title')}</Tab>
                                    </TabList>
                                    <ErrorHandledTabPanel>{this.createRequestPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCustomerDetailsPanel(req)}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCommentsPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createAttachmentsPanel()}</ErrorHandledTabPanel>
                                </Tabs>
                            ) : (
                                <Accordion>
                                    <Collapsible trigger={lookup('mrc.creditdetails.title')}>
                                        {this.createRequestPanel()}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.customerdetails.title')}>
                                        {this.createCustomerDetailsPanel(req)}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.comments.title')}>
                                        {this.createCommentsPanel()}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.attachments.title')}>
                                        {this.createAttachmentsPanel()}
                                    </Collapsible>
                                </Accordion>
                            )}
                            {this.createButtons()}
                        </form>
                    )}
                />
            </Switch>
        );
    }
}

CreditCorrectionLayout.propTypes = {
    cleanup: PropTypes.func.isRequired,
    updateUiPageTitle: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    loadRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isTablet: PropTypes.bool,
    request: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    addAttachment: PropTypes.func.isRequired,
    restoreAttachment: PropTypes.func.isRequired,
    deleteAttachment: PropTypes.func.isRequired,
    setCreditData: PropTypes.func.isRequired,
    submitRequest: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    history: PropTypes.object,
    isNewCorrection: PropTypes.bool,
};
