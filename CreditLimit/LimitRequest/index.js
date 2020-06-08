import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import CoinReceive from '../../icons/coin-receive.svg';
import ProgressBar from '../../ProgressBar';
import CreditData from '../CreditData';
import Comments from '../../NewComments';
import Attachments from '../../Attachments';
import Sales from '../../Sales';
import { Route, Switch } from 'react-router-dom';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import '../../tabs.scss';
import { Accordion, Collapsible } from '../../Accordion';
import RequestSubmitted from './RequestSubmitted';
import { displayName } from '../../Util';
import CustomerTrigger from '../../CustomerTrigger/presentation';
import CustomerGroupLimits from '../../CustomerGroupLimits';
import { lookup } from '../../Util/translations';
import CreditProgram from '../../CreditProgram';
import AdditionalFieldsSection from '../../AdditionalFields/AdditionalFieldsSection';
import './index.scss';
import { RequestFieldPropTypes } from '../../AdditionalFields/AdditionalFieldsPropTypes';
import { filterAdditionalFieldsList } from '../../AdditionalFields/additionalFielsUtil';

import * as _ from 'lodash';
import CustomerDataGroup from '../../CustomerDataGroup';

export default class LimitRequestLayout extends Component {
    FILE_TYPES = [''];
    COLLATERALS = [''];

    constructor(props) {
        super(props);
        // this.handleRequestedLimitChange = this.handleRequestedLimitChange.bind(this);
        this.state = {
            creditDataValid: false,
            creditProgramValid: false,
            applyCurrent: false,
            applyCurrentLimitAndExpiry: false,
            applyCurrentPayments: false,
            creditDataComponentsValid: {},
            currentGroupLimit: 0,
            availableGroupLimit: 0,
            exhaustionGroupLimit: 0,
            requestedGroupLimit: 0,
            approvedGroupLimit: 0,
            isApplyCurrentLimitAndExpiryClicked: false,
            additionalFieldsValidations: {},
        };

        this.props.showAuxControl({ back: true });
        this.props.loadRequest(this.props.match.params.id);
        this.props.loadAdditionalFields(this.props.match.params.id);
        this.props.updateUiPageTitle(lookup('creditlimit.limitrequest.title'));
        this.handleAdditionalFieldsOnChange = this.handleAdditionalFieldsOnChange.bind(this);
        this.handleAdditionalFieldsOnBlur = this.handleAdditionalFieldsOnBlur.bind(this);
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
        //
        // in case we got data, prepare it
        //
        if (nextProps.request && nextProps.request.data) {
            const req = nextProps.request.data;

            //
            // mark the requested customer
            //
            req.requestedItems.forEach(ri => this.markRequestedCustomer(req.requestedCustomerId, ri.customer));

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
                nextProps.request.data.requestedItems.map(item => {
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

    additionalFieldsValid() {
        return !(Object.values(this.state.additionalFieldsValidations).filter(value => !value).length > 0);
    }

    createSubmitButton() {
        const req = this.props.request;
        return req.error ? null : (
            <Button
                status="primary" // for testing
                style={{ marginLeft: '0px', marginRight: '0px' }}
                text={lookup('creditlimit.limitrequest.submit')}
                icon={CoinReceive}
                type="submit"
                disabled={
                    req.loading ||
                    !(this.state.creditDataValid && this.state.creditProgramValid && this.additionalFieldsValid()) ||
                    this.props.request.data.requestDisabled
                }
                onClick={this.handleFormSubmit.bind(this)}
            />
        );
    }

    createCancelButton() {
        const props = this.props;
        const req = props.request;
        return req.error ? null : (
            <Button
                text={lookup('mrc.actions.cancel')}
                id="mrc-cancel-button"
                status="secondary"
                disabled={this.state.canceled}
                onClick={() => {
                    this.setState({ ...this.state, canceled: true, enableSpinner: true });
                    this.props.cancelRequest(req.data.id, this.cancelCallback);
                }}
            />
        );
    }

    cancelCallback = function() {
        const req = this.props ? this.props.request : undefined;
        if (req && req.data && req.data.requestedCustomerId) {
            const target = `/customerstatus/${req.data.requestedCustomerId.country}/${req.data.requestedCustomerId.storeNumber}/${req.data.requestedCustomerId.customerNumber}`;
            this.props.history.replace(target);
        }
    }.bind(this);

    handleFormSubmit(e) {
        e.preventDefault();
        if (!(this.state && this.state.creditDataValid)) {
            console.warn('Form is not valid, abort submit.');
            return;
        }
        this.props.submitRequest(this.props.request.data.id);
    }

    handleAdditionalFieldsOnChange = (elem, valid) => {
        const newAdditionalFieldsValidations = this.state.additionalFieldsValidations;
        newAdditionalFieldsValidations[elem.id] = valid;
        this.setState({
            additionalFieldsValidations: newAdditionalFieldsValidations,
        });
    };

    handleAdditionalFieldsOnBlur = (elem, valid) => {
        if (valid) {
            this.props.updateAdditionalField(elem);
        } else {
            this.handleAdditionalFieldsOnChange(elem, valid);
        }
    };

    createCustomerDetailsPanel(req) {
        // in case there is some data, retrieve list of customers from list of requestedItems
        const customers = req.data && req.data.requestedItems.map(ri => ri.customer);

        return (
            <CustomerDataGroup
                customers={customers}
                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
            />
        );
    }

    createToggles() {
        return (
            <div className="credit-options">
                <div className="mrc-credit-options">
                    <div className="mrc-radio-button">
                        <label className="m-radioButton" htmlFor="one">
                            <input
                                type="checkbox"
                                className="m-radioButton-input"
                                id="one"
                                value={this.state.applyCurrent}
                                onClick={e => this.onApplyCurrentChange(e)}
                                defaultChecked={this.state.applyCurrent === true}
                            />
                            <div className="m-radioButton-inputIcon" />

                            <span className="m-radioButton-label">
                                <p>{lookup('creditlimit.limitrequest.toggles.applyCurrent')}</p>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    createGroupLimitInfos() {
        return (
            <CustomerGroupLimits
                country={this.props.request.data.requestedItems[0].customer.country}
                exhaustionGroupLimit={this.state.exhaustionGroupLimit}
                requestedGroupLimit={this.state.requestedGroupLimit}
                currentGroupLimit={this.state.currentGroupLimit}
                availableGroupLimit={this.state.availableGroupLimit}
                hideApprovedGroupLimit={true}
            />
        );
    }

    onApplyCurrentChange(e) {
        this.setState({
            applyCurrent: !(e.currentTarget.value === 'true'),
            applyCurrentLimitAndExpiry: !(e.currentTarget.value === 'true'),
            applyCurrentPayments: !(e.currentTarget.value == 'true'),
            isApplyCurrentLimitAndExpiryClicked: true,
        });
        if (this.state.isApplyCurrentLimitAndExpiryClickedCallbacks) {
            for (const [id, callback] of Object.entries(this.state.isApplyCurrentLimitAndExpiryClickedCallbacks)) {
                callback(id, !(e.currentTarget.value === 'true') ? true : false);
            }
        }
    }

    registerCallbackOnApplyCurrentLimitAndExpiryChange(id, callback) {
        this.setState(state => {
            let isApplyCurrentLimitAndExpiryClickedCallbacks = [];
            if (state.isApplyCurrentLimitAndExpiryClickedCallbacks) {
                for (const [id, callback] of Object.entries(state.isApplyCurrentLimitAndExpiryClickedCallbacks)) {
                    isApplyCurrentLimitAndExpiryClickedCallbacks[id] = callback;
                }
            }
            isApplyCurrentLimitAndExpiryClickedCallbacks[id] = callback;

            return { isApplyCurrentLimitAndExpiryClickedCallbacks: isApplyCurrentLimitAndExpiryClickedCallbacks };
        });
    }

    handleRequestedGroupLimitChange() {
        let requestedGroupLimitNew = 0;
        if (this.props.request != null && this.props.request.data != null) {
            this.props.request.data.requestedItems.map(item => {
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

    atLeastOneFieldIsInvalid(additionalFieldsList, additionalFieldsValidations) {
        if (additionalFieldsList === undefined || additionalFieldsList === null) {
            return false;
        }
        if (additionalFieldsValidations === undefined || additionalFieldsValidations === null) {
            return false;
        }
        let isInvalid = false;
        additionalFieldsList.forEach(addField => {
            if (addField !== undefined && addField !== null && addField.id !== undefined && addField.id !== null) {
                if (
                    additionalFieldsValidations[addField.id] !== undefined &&
                    additionalFieldsValidations[addField.id] === false
                ) {
                    isInvalid = true;
                }
            }
        });
        return isInvalid;
    }

    createGroupPanels(requestedItems) {
        return requestedItems.map((item, i) => {
            const limitRequest = this.props.request.data;
            const customer = item.customer;

            const additionalFieldsList = filterAdditionalFieldsList(
                this.props.additionalFields !== undefined && this.props.additionalFields !== null
                    ? this.props.additionalFields.requestFields
                    : undefined,
                'CUSTOMER',
                'CREDIT_DATA',
                customer.country,
                customer.storeNumber,
                customer.customerNumber
            );
            const hasAdditionalFields =
                additionalFieldsList !== undefined && additionalFieldsList !== null && additionalFieldsList.length > 0
                    ? true
                    : false;
            const creditDataClass = hasAdditionalFields ? 'span-1-2' : 'span-1-3';

            const key = customer.storeNumber + '/' + customer.customerNumber;
            const trigger = (
                <CustomerTrigger
                    customer={customer}
                    current={customer.creditLimit}
                    requested={item.creditData.amount ? item.creditData.amount : null}
                    isWithWarning={
                        (customer.blockingReason != undefined && customer.blockingReason != null) ||
                        (customer.checkoutCheckCode != undefined && customer.checkoutCheckCode != null) ||
                        (hasAdditionalFields &&
                            this.atLeastOneFieldIsInvalid(additionalFieldsList, this.state.additionalFieldsValidations))
                    }
                />
            );

            const dateFormat = this.getDateFormatString();
            return (
                <Collapsible open={i === 0} key={key} trigger={trigger}>
                    <div className="mrc-ui-col-3">
                        <div className={creditDataClass}>
                            <CreditData
                                key={item.creditData.id}
                                headerTitle={
                                    lookup('creditlimit.limitrequest.headers.creditrequest') +
                                    ' ' +
                                    displayName(item.customer)
                                }
                                paymentReadyToBeSelected={true}
                                requestedItem={item}
                                setCreditData={this.props.setCreditData.bind(this, limitRequest)}
                                setLimitExpiry={this.props.setLimitExpiry.bind(this, limitRequest)}
                                setValidity={this.setComponentValidity.bind(this, item.id)}
                                handleRequestedGroupLimitChange={this.handleRequestedGroupLimitChange.bind(this)}
                                applyCurrentLimitAndExpiry={false}
                                applyCurrentPayments={this.state.applyCurrentPayments}
                                isApplyCurrentLimitAndExpiryClicked={false}
                                dateFormat={dateFormat}
                                currentPayment={this.defineCurrentPayment(item)}
                                registerCallbackOnApplyCurrentLimitAndExpiryChange={this.registerCallbackOnApplyCurrentLimitAndExpiryChange.bind(
                                    this
                                )}
                                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
                            />
                        </div>
                        {hasAdditionalFields ? (
                            <div className="mrc-credit-data mrc-input-group">
                                <AdditionalFieldsSection
                                    requestFields={additionalFieldsList}
                                    onChange={this.handleAdditionalFieldsOnChange}
                                    onBlur={this.handleAdditionalFieldsOnBlur}
                                />
                            </div>
                        ) : null}
                    </div>
                </Collapsible>
            );
        });
    }

    createRequestPanel() {
        if (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems) {
            return null;
        }
        const groupPanels = this.createGroupPanels(this.props.request.data.requestedItems);
        const requestAdditionalFields = filterAdditionalFieldsList(
            this.props.additionalFields !== undefined && this.props.additionalFields !== null
                ? this.props.additionalFields.requestFields
                : undefined,
            'REQUEST',
            'CREDIT_DATA'
        );
        const hasRequestAdditionalFields =
            requestAdditionalFields !== undefined &&
            requestAdditionalFields !== null &&
            requestAdditionalFields.length > 0
                ? true
                : false;
        const groupAdditionalFields = filterAdditionalFieldsList(
            this.props.additionalFields !== undefined && this.props.additionalFields !== null
                ? this.props.additionalFields.requestFields
                : undefined,
            'GROUP',
            'CREDIT_DATA'
        );
        const hasGroupAdditionalFields =
            groupAdditionalFields !== undefined && groupAdditionalFields !== null && groupAdditionalFields.length > 0
                ? true
                : false;
        return (
            <Accordion>
                <div className="mrc-ui-col-3 small-margin-bottom">
                    <div>
                        {this.createCreditProgramSelection()}
                        <div className="mrc-input-group">
                            {this.createToggles()}
                            {this.props.request.data.requestedItems.length > 1 ? this.createGroupLimitInfos() : null}
                        </div>
                    </div>
                    {hasRequestAdditionalFields ? (
                        <div className="mrc-credit-data mrc-input-group small-margin">
                            <span
                                className="additional-fields-background-text"
                                title={lookup('additional.fields.request.title')}
                            ></span>
                            <AdditionalFieldsSection
                                requestFields={requestAdditionalFields}
                                onChange={this.handleAdditionalFieldsOnChange}
                                onBlur={this.handleAdditionalFieldsOnBlur}
                            />
                        </div>
                    ) : null}
                    {hasGroupAdditionalFields ? (
                        <div className="mrc-credit-data mrc-input-group small-margin">
                            <span
                                className="additional-fields-background-text"
                                title={lookup('additional.fields.group.title')}
                            ></span>
                            <AdditionalFieldsSection
                                requestFields={groupAdditionalFields}
                                onChange={this.handleAdditionalFieldsOnChange}
                                onBlur={this.handleAdditionalFieldsOnBlur}
                            />
                        </div>
                    ) : null}
                </div>
                {groupPanels}{' '}
            </Accordion>
        );
    }

    defineCurrentPayment(requestedItem) {
        const customer = requestedItem && requestedItem.customer;

        const limit =
            customer && customer.creditLimit != null && !Number.isNaN(customer.creditLimit) ? customer.creditLimit : '';
        const payment = customer && customer.currentPayment;
        return { limit: limit, payment: payment };
    }

    getDateFormatString() {
        const formatObj = new Intl.DateTimeFormat().formatToParts(new Date());
        return formatObj
            .map(obj => {
                switch (obj.type) {
                    case 'day':
                        return 'dd';
                    case 'month':
                        return 'MM';
                    case 'year':
                        return 'yyyy';
                    default:
                        return obj.value;
                }
            })
            .join('');
    }

    createCreditProgramSelection() {
        const limitRequest = this.props.request.data;
        return (
            <div className="mrc-detail">
                <CreditProgram
                    limitRequestId={limitRequest.id}
                    setCreditPrograms={this.props.setCreditPrograms.bind(this)}
                    getCreditPrograms={this.props.getCreditPrograms.bind(this)}
                    setValidity={this.setCreditProgramValidity.bind(this)}
                />
            </div>
        );
    }

    setComponentValidity(id, valid) {
        const newValidity = this.state.creditDataComponentsValid;
        newValidity[id] = valid;

        const requestor = this.props.request.data.requestedItems.find(request => request.customer.requestedCustomer);
        const requestorCreditDataIsValid = newValidity[requestor.id];

        this.setState({
            ...this.state,
            creditDataComponentsValid: newValidity,
            creditDataValid:
                Object.values(newValidity).every(v => v == true || v == null) && requestorCreditDataIsValid == true,
        });
    }

    setCreditProgramValidity(valid) {
        this.setState({ ...this.state, creditProgramValid: valid });
    }

    createCommentsPanel() {
        if (!this.props.request.data) return null;
        const limitRequest = this.props.request.data;
        return (
            <Comments
                comments={limitRequest.comments}
                disabled={!this.props.request.data || this.props.request.loading}
                onSave={newComment => this.props.addComment(limitRequest.id, newComment)}
            />
        );
    }

    createAttachmentsPanel() {
        if (!this.props.request.data) return null;

        const limitRequest = this.props.request.data || {};
        if (limitRequest.fileTypes) this.FILE_TYPES = limitRequest.fileTypes;
        if (limitRequest.collateralAttachments) this.COLLATERALS_ATTACHMENTS = limitRequest.collateralAttachments;
        return (
            <Attachments
                noPlaceholder={true}
                noDeletedAttachmentsToggle={true}
                disabled={!this.props.request.data || this.props.request.loading}
                readonly={!this.props.request.data || this.props.request.loading}
                attachments={(this.COLLATERALS_ATTACHMENTS ? this.COLLATERALS_ATTACHMENTS : []).map(a => {
                    return a.deleted
                        ? {
                              ...a,
                              status: 'deleted',
                              secondaryInteraction: a.isCollateral ? null : 'restore',
                              handleSecondaryAction: () => this.props.restoreAttachment(limitRequest.id, a.id),
                          }
                        : {
                              ...a,
                              status: 'normal',
                              secondaryInteraction: a.isCollateral ? null : 'delete',
                              handleSecondaryAction: () => this.props.deleteAttachment(limitRequest.id, a.id),
                          };
                })}
                addAttachment={(fileType, file, title, expiryDate, amount, metadataJson) =>
                    this.props.addAttachment(fileType, limitRequest.id, file, title, expiryDate, amount, metadataJson)
                }
                fileTypes={this.FILE_TYPES}
                country={limitRequest.requestedCustomerId.country}
            />
        );
    }

    createSalesPanel() {
        if (!this.props.request.data) return null;
        const limitRequest = this.props.request.data;
        const mdwRequest = {
            requestId: limitRequest.id,
            customers: limitRequest.requestedItems.map(ri => ri.customer),
        };
        return (
            <Sales
                limitRequestId={limitRequest.id}
                getMdwData={this.props.getMdwData.bind(this, mdwRequest)}
                createdFrom="approval"
            />
        );
    }

    componentDidUpdate() {
        const req = this.props.request;
        const path = 'submitted';
        if (!this.props.history.location.pathname.endsWith(path) && req.data && req.data.submitInfo) {
            const target = `/limitrequests/${req.data.id}/${path}`;
            this.props.history.replace(target);
        }
        if (this.state.isApplyCurrentLimitAndExpiryClicked) {
            this.setState({
                isApplyCurrentLimitAndExpiryClicked: false,
            });
        }
    }

    render() {
        const req = this.props.request;
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
                        <form method="POST" className="mrc-limit-request">
                            {this.createProgressBar()}
                            {this.props.isTablet ? (
                                <Tabs forceRenderTabPanel={true}>
                                    <TabList>
                                        <Tab>{lookup('mrc.customerdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.creditdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.sales.title')}</Tab>
                                        <Tab>{lookup('mrc.comments.title')}</Tab>
                                        <Tab>{lookup('mrc.attachments.title')}</Tab>
                                    </TabList>
                                    <ErrorHandledTabPanel>{this.createCustomerDetailsPanel(req)}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createRequestPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createSalesPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCommentsPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createAttachmentsPanel()}</ErrorHandledTabPanel>
                                </Tabs>
                            ) : (
                                <Accordion>
                                    <Collapsible trigger={lookup('mrc.customerdetails.title')}>
                                        {this.createCustomerDetailsPanel(req)}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.creditdetails.title')}>
                                        {this.createRequestPanel()}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.sales.title')}>
                                        {this.createSalesPanel()}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.comments.title')}>
                                        {this.createCommentsPanel()}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.attachments.title')}>
                                        {this.createAttachmentsPanel()}
                                    </Collapsible>
                                </Accordion>
                            )}
                            <div className="mrc-btn-group">
                                {this.createCancelButton()}
                                {this.createSubmitButton()}
                            </div>
                        </form>
                    )}
                />
            </Switch>
        );
    }
}

LimitRequestLayout.propTypes = {
    cleanup: PropTypes.func.isRequired,
    updateUiPageTitle: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    loadRequest: PropTypes.func.isRequired,
    loadAdditionalFields: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isTablet: PropTypes.bool,
    request: PropTypes.object.isRequired,
    additionalFields: PropTypes.shape({ requestFields: PropTypes.arrayOf(RequestFieldPropTypes) }),
    addComment: PropTypes.func.isRequired,
    addAttachment: PropTypes.func.isRequired,
    restoreAttachment: PropTypes.func.isRequired,
    deleteAttachment: PropTypes.func.isRequired,
    setCreditData: PropTypes.func.isRequired,
    setLimitExpiry: PropTypes.func.isRequired,
    submitRequest: PropTypes.func.isRequired,
    cancelRequest: PropTypes.func.isRequired,
    history: PropTypes.object,
    getMdwData: PropTypes.func,
    getCreditPrograms: PropTypes.func,
    setCreditPrograms: PropTypes.func,
    updateAdditionalField: PropTypes.func.isRequired,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
