import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import CoinReceive from '../../icons/coin-receive.svg';
import ProgressBar from '../../ProgressBar';
import Comments from '../../NewComments';
import Attachments from '../../Attachments';
import Sales from '../../Sales';
import { Route, Switch } from 'react-router-dom';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import '../../tabs.scss';
import { Accordion, Collapsible } from '../../Accordion';
import RequestSubmitted from './RequestSubmitted';
import { lookup } from '../../Util/translations';
import './index.scss';
import { RequestFieldPropTypes } from '../../AdditionalFieldsNew/AdditionalFieldsPropTypes';
import { filterAdditionalFieldsList } from '../../AdditionalFieldsNew/additionalFielsUtil';
import {
    additionalFieldMandatoryIsValid,
    additionalFieldIsValid,
} from '../../AdditionalFieldsNew/additionalFieldsValidation';
import CreditTabWip from '../../service-components/CreditTabWip';

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
        this.handleAdditionalFieldsOnSave = this.handleAdditionalFieldsOnSave.bind(this);
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
        if (
            Object.values(this.state.additionalFieldsValidations).length === 0 &&
            nextProps.additionalFields &&
            nextProps.additionalFields.requestFields
        ) {
            const additionalFields = nextProps.additionalFields;
            const newAdditionalFieldsValidations = this.state.additionalFieldsValidations;
            additionalFields.requestFields.forEach((field) => {
                const type = field.countryField.field.type;
                const oldValue = type === 'TEXTAREA' ? field.textValue : field.value;
                const valid =
                    additionalFieldMandatoryIsValid(field.countryField.mandatory, oldValue) &&
                    additionalFieldIsValid(field.countryField.validation, type, oldValue, field.creationTimestamp);
                newAdditionalFieldsValidations[field.id] = valid;
            });
            this.setState({
                additionalFieldsValidations: newAdditionalFieldsValidations,
            });
        }
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

    additionalFieldsValid() {
        return !(Object.values(this.state.additionalFieldsValidations).filter((value) => !value).length > 0);
    }

    anyCreditDataChanged(items) {
        const changedItem = items.find((item) => {
            const _limitType = _.get(item, 'limitType');
            const _paymentMethodType = _.get(item, 'paymentMethodType');
            if (_limitType !== 'CURRENT' || _paymentMethodType !== 'CURRENT') {
                return true;
            }

            const _isCashCustomer =
                _.isNil(_.get(item, 'customer.paymentAllowanceCd')) ||
                _.get(item, 'customer.paymentAllowanceCd') !== '3';
            return !_isCashCustomer && _.get(item, 'creditOption') === 'CREDITTOCASH';
        });
        return !_.isNil(changedItem);
    }

    creditDataValid(item) {
        const valid = _.get(item, 'valid');
        return !_.isNil(valid) && valid === true;
    }

    createSubmitButton() {
        const req = this.props.request;

        const allValid =
            _.get(req, 'data.requestedItems') && req.data.requestedItems.every((item) => this.creditDataValid(item));

        const anyChanged = _.get(req, 'data.requestedItems') && this.anyCreditDataChanged(req.data.requestedItems);

        const valid = allValid && anyChanged;

        return req.error ? null : (
            <Button
                status="primary" // for testing
                style={{ marginLeft: '0px', marginRight: '0px' }}
                text={lookup('creditlimit.limitrequest.submit')}
                icon={CoinReceive}
                type="submit"
                disabled={
                    req.loading ||
                    !(valid && this.additionalFieldsValid() && this.state.creditProgramValid) ||
                    this.props.request.data.requestDisabled
                }
                onClick={this.handleFormSubmit.bind(this, valid)}
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

    cancelCallback = function () {
        const req = this.props ? this.props.request : undefined;
        if (req && req.data && req.data.requestedCustomerId) {
            const target = `/customerstatus/${req.data.requestedCustomerId.country}/${req.data.requestedCustomerId.storeNumber}/${req.data.requestedCustomerId.customerNumber}`;
            this.props.history.replace(target);
        }
    }.bind(this);

    handleFormSubmit(e, creditDataValid) {
        e.preventDefault();
        if (!creditDataValid) {
            console.warn('LimitRequest: Form is not valid, abort submit.');
            return;
        }
        this.props.submitRequest(this.props.request.data.id);
    }

    handleAdditionalFieldsOnSave = (fields) => {
        const newAdditionalFieldsValidations = this.state.additionalFieldsValidations;
        fields.forEach((field) => {
            newAdditionalFieldsValidations[field.id] = true;
        });
        this.props.updateAdditionalFields(fields);
    };

    handleAdditionalFieldsOnChange = (elem, valid) => {
        const newAdditionalFieldsValidations = this.state.additionalFieldsValidations;
        newAdditionalFieldsValidations[elem.id] = valid;
        this.setState({
            additionalFieldsValidations: newAdditionalFieldsValidations,
        });
        if (valid) {
            this.props.updateAdditionalField(elem);
        }
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
        const customers = req.data && req.data.requestedItems.map((ri) => ri.customer);

        return (
            <CustomerDataGroup
                customers={customers}
                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
            />
        );
    }

    atLeastOneFieldIsInvalid(additionalFieldsList, additionalFieldsValidations) {
        if (additionalFieldsList === undefined || additionalFieldsList === null) {
            return false;
        }
        if (additionalFieldsValidations === undefined || additionalFieldsValidations === null) {
            return false;
        }
        let isInvalid = false;
        additionalFieldsList.forEach((addField) => {
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

    getDateFormatString() {
        const formatObj = new Intl.DateTimeFormat().formatToParts(new Date());
        return formatObj
            .map((obj) => {
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
                onSave={(newComment) => this.props.addComment(limitRequest.id, newComment)}
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
                attachments={(this.COLLATERALS_ATTACHMENTS ? this.COLLATERALS_ATTACHMENTS : []).map((a) => {
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
            customers: limitRequest.requestedItems.map((ri) => ri.customer),
        };
        return (
            <Sales
                limitRequestId={limitRequest.id}
                getMdwData={this.props.getMdwData.bind(this, mdwRequest)}
                createdFrom="approval"
            />
        );
    }

    createCreditTab() {
        if (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems) {
            return null;
        }
        const request = _.get(this.props, 'request.data');
        const customerName = (firstName, lastName) =>
            firstName && lastName ? firstName + ' ' + lastName : lastName ? lastName : null;
        const requestAdditionalFields = filterAdditionalFieldsList(
            _.get(this.props, 'additionalFields') ? this.props.additionalFields.requestFields : undefined,
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
            _.get(this.props, 'additionalFields') ? this.props.additionalFields.requestFields : undefined,
            'GROUP',
            'CREDIT_DATA'
        );
        const hasGroupAdditionalFields =
            groupAdditionalFields !== undefined && groupAdditionalFields !== null && groupAdditionalFields.length > 0
                ? true
                : false;
        const readOnly =
            !this.props.request.data ||
            this.props.request.loading ||
            this.state.canceled ||
            this.props.request.data.requestDisabled;
        const dateFormat = this.getDateFormatString();
        return (
            <CreditTabWip
                country={_.get(request, 'requestedCustomerId.country')}
                parent={'creditlimit'}
                groupLimit={{
                    exhausted: _.get(request, 'requestedItems')
                        ? _.sum(request.requestedItems.map((x) => _.get(x, 'customer.limitExhaustion')))
                        : null,
                    current: _.get(request, 'requestedItems')
                        ? _.sum(request.requestedItems.map((x) => _.get(x, 'customer.creditLimit')))
                        : null,
                    wish: this.state.requestedGroupLimit,
                }}
                customers={
                    _.get(request, 'requestedItems')
                        ? request.requestedItems.map((item) => {
                              const customerAdditionalFieldsList = filterAdditionalFieldsList(
                                  this.props.additionalFields ? this.props.additionalFields.requestFields : undefined,
                                  'CUSTOMER',
                                  'CREDIT_DATA',
                                  _.get(item, 'customer.country'),
                                  _.get(item, 'customer.storeNumber'),
                                  _.get(item, 'customer.customerNumber')
                              );
                              const hasCustomerAdditionalFields =
                                  customerAdditionalFieldsList !== undefined &&
                                  customerAdditionalFieldsList !== null &&
                                  customerAdditionalFieldsList.length > 0
                                      ? true
                                      : false;
                              const isAtLeastOneFieldIsInvalid =
                                  hasCustomerAdditionalFields &&
                                  this.atLeastOneFieldIsInvalid(
                                      customerAdditionalFieldsList,
                                      this.state.additionalFieldsValidations
                                  );
                              const itemId = _.get(item, 'id');
                              const availablePayments = _.get(item, 'customer.availablePayments');
                              const isCustomerBlocked =
                                  !_.isNil(_.get(item, 'customer.blockingReason')) ||
                                  !_.isNil(_.get(item, 'customer.checkoutCheckCode'));
                              const countriesWithDifferentBlockingCodes = this.props
                                  .countriesWithDifferentBlockingCodes;
                              const msgKeyPartCountry =
                                  _.get(item, 'customer.country') &&
                                  countriesWithDifferentBlockingCodes &&
                                  countriesWithDifferentBlockingCodes.length > 0 &&
                                  countriesWithDifferentBlockingCodes.includes(_.get(item, 'customer.country'))
                                      ? _.get(item, 'customer.country') + '.'
                                      : '';
                              const blockingReasonText = !_.isNil(_.get(item, 'customer.blockingReason'))
                                  ? lookup('mrc.blockingReason') +
                                    ': ' +
                                    lookup(
                                        'mrc.blockingReason.message.' +
                                            msgKeyPartCountry +
                                            _.get(item, 'customer.blockingReason')
                                    )
                                  : null;
                              const checkoutCheckCodeText = !_.isNil(_.get(item, 'customer.checkoutCheckCode'))
                                  ? lookup('mrc.checkoutCheckCode') +
                                    ': ' +
                                    lookup(
                                        'mrc.checkoutCheckCode.message.' +
                                            msgKeyPartCountry +
                                            _.get(item, 'customer.checkoutCheckCode')
                                    )
                                  : null;
                              return {
                                  onLimitChange: (
                                      amount,
                                      creditProduct,
                                      creditPeriod,
                                      debitType,
                                      limitType,
                                      paymentType
                                  ) => {
                                      this.props.setCreditDataWithType(
                                          request,
                                          {
                                              id: _.get(item, 'creditData.id'),
                                              amount,
                                              creditProduct,
                                              creditPeriod,
                                              debitType,
                                          },
                                          limitType,
                                          paymentType
                                      );
                                  },
                                  onExpiryChange: (amount, date) => {
                                      this.props.setLimitExpiry(request, itemId, {
                                          resetToLimitAmount: amount,
                                          limitExpiryDate: date,
                                          limitExpiryReminderDays: 14,
                                      });
                                  },
                                  onExpiryOnBlur(amount, event, currentDate) {
                                      const date = new Date(event.target.value);
                                      if (date >= new Date() + 1) {
                                          this.onExpiryChange(amount, date);
                                      } else {
                                          this.onExpiryChange(
                                              amount,
                                              currentDate == null ? null : new Date(currentDate)
                                          );
                                      }
                                  },
                                  onLimitAndExpiryChange: (
                                      amount,
                                      creditProduct,
                                      creditPeriod,
                                      debitType,
                                      expiryAmount,
                                      expiryDate,
                                      limitType,
                                      paymentType
                                  ) => {
                                      this.props.setCreditDataAndExpiry(
                                          request,
                                          itemId,
                                          {
                                              id: _.get(item, 'creditData.id'),
                                              amount,
                                              creditProduct,
                                              creditPeriod,
                                              debitType,
                                          },
                                          {
                                              resetToLimitAmount: expiryAmount,
                                              limitExpiryDate: expiryDate,
                                              limitExpiryReminderDays: 14,
                                          },
                                          limitType,
                                          paymentType
                                      );
                                  },
                                  onChangeCreditOption: (
                                      amount,
                                      creditProduct,
                                      creditPeriod,
                                      debitType,
                                      creditOption
                                  ) => {
                                      this.props.setCreditDataWithCreditOption(
                                          request,
                                          {
                                              id: _.get(item, 'creditData.id'),
                                              amount,
                                              creditProduct,
                                              creditPeriod,
                                              debitType,
                                          },
                                          creditOption
                                      );
                                  },
                                  name: customerName(
                                      _.get(item, 'customer.firstName'),
                                      _.get(item, 'customer.lastName')
                                  ),
                                  storeNumber: _.get(item, 'customer.storeNumber'),
                                  number: _.get(item, 'customer.customerNumber'),
                                  blockingInfo: {
                                      isBlocked: isCustomerBlocked,
                                      blockingReasonText: blockingReasonText,
                                      checkoutCheckCodeText: checkoutCheckCodeText,
                                  },
                                  availablePayments: availablePayments,
                                  limit: {
                                      current: {
                                          amount: _.get(item, 'customer.creditLimit'),
                                          product: _.get(item, 'customer.currentPayment.creditProduct'),
                                          period: _.get(item, 'customer.currentPayment.creditPeriod'),
                                          debitType: _.get(item, 'customer.currentPayment.debitType'),
                                          expiry: {
                                              date: _.get(item, 'currentLimitExpiry.limitExpiryDate'),
                                              amount: _.get(item, 'currentLimitExpiry.resetToLimitAmount'),
                                          },
                                      },
                                      wish: {
                                          amount: _.get(item, 'creditData.amount'),
                                          product: _.get(item, 'creditData.creditProduct'),
                                          period: _.get(item, 'creditData.creditPeriod'),
                                          debitType: _.get(item, 'creditData.debitType'),
                                          expiry: {
                                              date: _.get(item, 'requestedLimitExpiry.limitExpiryDate'),
                                              amount: _.get(item, 'requestedLimitExpiry.resetToLimitAmount'),
                                          },
                                      },
                                      limitType: _.get(item, 'limitType'),
                                      paymentMethodType: _.get(item, 'paymentMethodType'),
                                      creditOption: _.get(item, 'creditOption'),
                                      valid: _.get(item, 'valid') && !isAtLeastOneFieldIsInvalid,
                                      readOnly: readOnly,
                                  },
                                  additionalFields: {
                                      hasCustomerAdditionalFields: hasCustomerAdditionalFields,
                                      customerAdditionalFieldsList: customerAdditionalFieldsList,
                                      onChange: this.handleAdditionalFieldsOnChange,
                                      disabled: readOnly,
                                      editable: true,
                                  },
                                  isCashCustomer:
                                      _.isNil(_.get(item, 'customer.paymentAllowanceCd')) ||
                                      _.get(item, 'customer.paymentAllowanceCd') !== '3',
                              };
                          })
                        : []
                }
                creditProgram={{
                    limitRequestId: _.get(request, 'id'),
                    setCreditPrograms: this.props.setCreditPrograms.bind(this),
                    getCreditPrograms: this.props.getCreditPrograms.bind(this),
                    setValidity: this.setCreditProgramValidity.bind(this),
                    readOnly: readOnly,
                }}
                additionalFields={{
                    request: {
                        requestFields: requestAdditionalFields,
                        onChange: this.handleAdditionalFieldsOnSave,
                        editable: true,
                        disabled: readOnly,
                    },
                    hasRequest: hasRequestAdditionalFields,
                    group: {
                        requestFields: groupAdditionalFields,
                        onChange: this.handleAdditionalFieldsOnSave,
                        editable: true,
                        disabled: readOnly,
                    },
                    hasGroup: hasGroupAdditionalFields,
                }}
                dateFormat={dateFormat}
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
                                    <ErrorHandledTabPanel>{this.createCreditTab()}</ErrorHandledTabPanel>
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
                                        {this.createCreditTab()}
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
    setCreditDataWithType: PropTypes.func.isRequired,
    setCreditDataWithCreditOption: PropTypes.func.isRequired,
    setLimitExpiry: PropTypes.func.isRequired,
    setCreditDataAndExpiry: PropTypes.func.isRequired,
    submitRequest: PropTypes.func.isRequired,
    cancelRequest: PropTypes.func.isRequired,
    history: PropTypes.object,
    getMdwData: PropTypes.func,
    getCreditPrograms: PropTypes.func,
    setCreditPrograms: PropTypes.func,
    updateAdditionalField: PropTypes.func.isRequired,
    updateAdditionalFields: PropTypes.func.isRequired,
    countriesWithDifferentBlockingCodes: PropTypes.array,
    additionalFieldsInitValidations: PropTypes.object,
};
