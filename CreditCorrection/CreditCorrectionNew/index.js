import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/index';
import ProgressBar from '../../ProgressBar';
import Comments from '../../Comments';
import Attachments from '../../Attachments';
import { Route, Switch } from 'react-router-dom';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import '../../tabs.scss';
import { Accordion, Collapsible } from '../../Accordion';
import RequestSubmitted from './RequestSubmitted';
import { lookup } from '../../Util/translations';
import './index.scss';
import MrcSpinner from '../../Util/MrcSpinner';

import CustomerDataGroup from '../../CustomerDataGroup';
import * as _ from 'lodash';
import CreditDataTab from '../../CreditDataTab';
import { displayName } from '../../Util';
import { createBlockingInfo } from '../../Util/blockingInfoUtils';

export default class CreditCorrectionLayout extends Component {
    FILE_TYPES = [''];

    constructor(props) {
        super(props);
        this.state = {
            canceled: false,
            enableSpinner: false,
            newComment: '',
        };
        this.addNewComment = this.addNewComment.bind(this);
        this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.props.showAuxControl({ back: true });
        this.props.loadRequest(this.props.match.params.id);
        this.props.updateUiPageTitle(lookup('creditcorrection.limitrequest.title'));
    }

    componentWillUnmount() {
        this.props.cleanup();
    }

    componentDidUpdate(prevState) {
        if (prevState.enableSpinner) {
            this.setState({ enableSpinner: false });
        }
    }

    createProgressBar() {
        const request = this.props.request.data;
        if (request) {
            return <ProgressBar name={lookup('mrc.phase.initialization')} step={1} totalSteps={3} />;
        } else {
            return null;
        }
    }

    createButtons(valid) {
        const creditCorrectionRequest = this.props.request.data;
        let disabled = true;
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
            /*
            <SimpleActionDock
                onCancel={() => {
                    this.setState({ ...this.state, canceled: true, enableSpinner: true });
                    this.props.cancel(creditCorrectionRequest.id);
                }}
                onApply={() => {
                    this.setState({ enableSpinner: true });
                    this.props.submitRequest(creditCorrectionRequest.id, 'APPROVED');
                }}
                applyDisabled={
                    !(valid && !this.state.canceled) ||
                    disabled ||
                    this.props.request.data.requestsDisabled
                }
                cancelDisabled={disabled || this.state.canceled}
            />
            */
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
                    status={!(valid && !this.state.canceled) || disabled ? 'secondary' : 'success'}
                    disabled={!(valid && !this.state.canceled) || disabled || this.props.request.data.requestsDisabled}
                    onClick={() => {
                        this.setState({ enableSpinner: true });
                        this.props.submitRequest(creditCorrectionRequest.id, 'APPROVED');
                    }}
                />
            </div>
        );
    }

    handleFormSubmit(e, valid) {
        e.preventDefault();
        if (!valid) {
            console.warn('Form is not valid, abort submit.');
            return;
        }
        this.props.submitRequest(this.props.request.data.id);
    }

    createCustomerDetailsPanel(req) {
        // in case there is some data, retrieve list of customers from list of requestedItems
        const customers = req.data && req.data.requestedItems.map((ri) => ri.customer);

        return (
            <CustomerDataGroup
                customers={customers}
                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
            />
        );
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

    createCreditTab() {
        if (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems) {
            return null;
        }

        const request = _.get(this.props, 'request.data');
        const activationSubmitted = request.activationSubmitted !== undefined ? request.activationSubmitted : false;
        const sucActivated = request.activated !== undefined ? request.activated : false;
        const disabled = this.state.canceled || !request.canCorrect;

        const groupLimit = this.createGroupLimit(request);
        return (
            <CreditDataTab
                country={_.get(request, 'requestedCustomerId.country')}
                parent={'creditcorrection'}
                groupLimit={{
                    exhausted: _.get(groupLimit, 'exhausted'),
                    current: _.get(groupLimit, 'current'),
                    new: _.get(groupLimit, 'new'),
                    activated: _.get(groupLimit, 'activated'),
                }}
                customers={
                    _.get(request, 'requestedItems')
                        ? request.requestedItems.map((item) => {
                              const availablePayments = _.get(item, 'customer.availablePayments');
                              const failedActivation = this.isFailedActivation(item);
                              const activationResult =
                                  item.activationInfo != null && item.activationInfo.resultStatus != null
                                      ? lookup('history.' + item.activationInfo.resultStatus)
                                      : failedActivation
                                      ? lookup('history.requestActivationFailedUnknown')
                                      : null;
                              const editable = (!activationSubmitted || failedActivation) && !sucActivated;
                              const isCashCustomer = _.get(item, 'cashCustomer') === true;
                              return {
                                  onLimitChange: (amount, initialAmount, creditProduct, creditPeriod, debitType) => {
                                      this.props.setCreditData(request.id, {
                                          id: _.get(item, 'creditData.id'),
                                          amount,
                                          initialAmount,
                                          creditProduct,
                                          creditPeriod,
                                          debitType,
                                      });
                                  },
                                  onChangeCreditOption: (
                                      amount,
                                      initialAmount,
                                      creditProduct,
                                      creditPeriod,
                                      debitType,
                                      creditOption
                                  ) => {
                                      this.props.setCreditDataWithCreditOption(request.id, creditOption, {
                                          id: _.get(item, 'creditData.id'),
                                          amount,
                                          initialAmount,
                                          creditProduct,
                                          creditPeriod,
                                          debitType,
                                      });
                                  },
                                  name: displayName(_.get(item, 'customer')),
                                  storeNumber: _.get(item, 'customer.storeNumber'),
                                  number: _.get(item, 'customer.customerNumber'),
                                  blockingInfo: createBlockingInfo(
                                      this.props.countriesWithDifferentBlockingCodes,
                                      _.get(item, 'customer.blockingReason'),
                                      _.get(item, 'customer.checkoutCheckCode'),
                                      _.get(item, 'customer.country')
                                  ),
                                  availablePayments: availablePayments,
                                  limit: {
                                      current: {
                                          amount: isCashCustomer ? null : _.get(item, 'customer.creditLimit'),
                                          product: isCashCustomer
                                              ? null
                                              : _.get(item, 'customer.currentPayment.creditProduct'),
                                          period: isCashCustomer
                                              ? null
                                              : _.get(item, 'customer.currentPayment.creditPeriod'),
                                          debitType: isCashCustomer
                                              ? null
                                              : _.get(item, 'customer.currentPayment.debitType'),
                                          expiry: {
                                              date: isCashCustomer
                                                  ? null
                                                  : _.get(item, 'currentLimitExpiry.limitExpiryDate'),
                                              amount: isCashCustomer
                                                  ? null
                                                  : _.get(item, 'currentLimitExpiry.resetToLimitAmount'),
                                          },
                                      },
                                      new: {
                                          amount: _.get(item, 'creditData.amount'),
                                          product: _.get(item, 'creditData.creditProduct'),
                                          period: _.get(item, 'creditData.creditPeriod'),
                                          debitType: _.get(item, 'creditData.debitType'),
                                          initialAmount: _.get(item, 'creditData.initialAmount'),
                                          blockingOption: _.get(item, 'creditData.blockingOption'),
                                      },
                                      creditOption: _.get(item, 'creditOption'),
                                      valid: _.get(item, 'valid'),
                                      readOnly: !editable || disabled,
                                  },
                                  isCashCustomer: isCashCustomer,
                                  limitExhaustion: _.get(item, 'customer.limitExhaustion'),
                                  failedActivation: failedActivation,
                                  activationResult: activationResult,
                              };
                          })
                        : []
                }
                activated={activationSubmitted}
                disabled={disabled}
                selectedGroupAction={_.get(request, 'selectedGroupAction')}
                handleChangeGroupAction={(selectedGroupAction) => {
                    this.props.changeSelectedGroupAction(request.id, selectedGroupAction);
                }}
            />
        );
    }

    isFailedActivation(item) {
        return (
            item.activationInfo != null &&
            item.activationInfo.resultStatus != null &&
            !(
                item.activationInfo.resultCode != null &&
                (item.activationInfo.resultCode === '0' || item.activationInfo.resultCode === '-1')
            )
        );
    }

    createGroupLimit(req) {
        let currentGroupLimit = 0;
        let requestedGroupLimit = 0;
        let exhaustionGroupLimit = 0;
        let activatedGroupLimit = 0;
        req.requestedItems.map((item) => {
            const currentLimit = item.customer.creditLimit !== undefined ? item.customer.creditLimit : 0;
            currentGroupLimit += currentLimit;
            const isRemoveBlock = _.get(item, 'creditData.blockingOption') === 'REMOVEBLOCK';
            const amount = isRemoveBlock
                ? currentLimit
                : !_.isNil(item.creditData.amount) && !_.isNaN(item.creditData.amount)
                ? item.creditData.amount
                : currentLimit;
            requestedGroupLimit += amount;
            exhaustionGroupLimit += item.customer.limitExhaustion !== undefined ? item.customer.limitExhaustion : 0;
            const failedActivation = this.isFailedActivation(item);
            const isNoChange =
                _.get(item, 'creditOption') === 'NONE' && _.isNil(_.get(item, 'creditData.blockingOption'));
            const activatedAmount = isNoChange || failedActivation ? currentLimit : amount;
            activatedGroupLimit += activatedAmount;
        });
        return {
            current: currentGroupLimit,
            new: requestedGroupLimit,
            exhausted: exhaustionGroupLimit,
            activated: activatedGroupLimit,
        };
    }

    creditDataValid(item) {
        const valid = _.get(item, 'valid');
        return !_.isNil(valid) && valid === true;
    }

    anyCreditDataChanged(items) {
        const changedItem = items.find((item) => {
            return !(_.get(item, 'creditOption') === 'NONE' && _.isNil(_.get(item, 'creditData.blockingOption')));
        });
        return !_.isNil(changedItem);
    }

    render() {
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

        const req = this.props.request.data;
        const allValid = _.get(req, 'requestedItems') && req.requestedItems.every((item) => this.creditDataValid(item));
        const anyChanged = _.get(req, 'requestedItems') && this.anyCreditDataChanged(req.requestedItems);
        const valid = allValid && anyChanged;
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
                        <form
                            method="POST"
                            className="mrc-limit-request"
                            onSubmit={this.handleFormSubmit.bind(this, valid)}
                        >
                            {this.createProgressBar()}
                            {this.props.isTablet ? (
                                <Tabs forceRenderTabPanel={true}>
                                    <TabList>
                                        <Tab>{lookup('mrc.creditdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.customerdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.comments.title')}</Tab>
                                        <Tab>{lookup('mrc.attachments.title')}</Tab>
                                    </TabList>
                                    <ErrorHandledTabPanel>{this.createCreditTab()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCustomerDetailsPanel(req)}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCommentsPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createAttachmentsPanel()}</ErrorHandledTabPanel>
                                </Tabs>
                            ) : (
                                <Accordion>
                                    <Collapsible trigger={lookup('mrc.creditdetails.title')}>
                                        {this.createCreditTab()}
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
                            {this.createButtons(valid)}
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
    countriesWithDifferentBlockingCodes: PropTypes.array,
    changeSelectedGroupAction: PropTypes.func,
    setCreditDataWithCreditOption: PropTypes.func,
};
