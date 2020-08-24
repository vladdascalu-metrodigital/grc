import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import CoinReceive from '../../icons/coin-receive.svg';
import ProgressBar from '../../ProgressBar';
import Comments from '../../Comments';
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
import {
    filterAdditionalFieldsList,
    hasAdditionalFields,
    atLeastOneFieldIsInvalid,
} from '../../AdditionalFieldsNew/additionalFielsUtil';
import {
    additionalFieldMandatoryIsValid,
    additionalFieldIsValid,
} from '../../AdditionalFieldsNew/additionalFieldsValidation';
import { createBlockingInfo } from '../../Util/blockingInfoUtils';
import CreditDataTab from '../../CreditDataTab';

import * as _ from 'lodash';
import { List } from 'immutable';
import CustomerDataGroup from '../../CustomerDataGroup';
import { displayName } from '../../Util';
import { dataForPrepayment } from '../../Util/creditDataUtils';

export default class LimitRequestLayout extends Component {
    FILE_TYPES = [''];
    COLLATERALS = [''];
    PLACEHOLDER_TYPES = [''];

    constructor(props) {
        super(props);
        // this.handleRequestedLimitChange = this.handleRequestedLimitChange.bind(this);
        this.state = {
            creditDataValid: false,
            creditProgramValid: props.parent === 'prepayment',
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
        props.parent !== 'prepayment' && this.props.loadAdditionalFields(this.props.match.params.id);
        this.props.updateUiPageTitle(lookup('creditlimit.limitrequest.title'));
        this.handleAdditionalFieldsOnChange = this.handleAdditionalFieldsOnChange.bind(this);
        this.handleAdditionalFieldsOnSave = this.handleAdditionalFieldsOnSave.bind(this);
        this.handleAdditionalFieldsOnBlur = this.handleAdditionalFieldsOnBlur.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

            const _isPrepaymentCustomer = dataForPrepayment(
                _.get(item, 'customer.creditLimit'),
                _.get(item, 'customer.paymentAllowanceCd'),
                _.get(item, 'customer.creditSettleTypeCd'),
                _.get(item, 'customer.creditSettlePeriodCd'),
                _.get(item, 'customer.creditSettleFrequencyCd')
            );
            if (_.get(item, 'creditOption') === 'PREPAYMENT' && !_isPrepaymentCustomer) {
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
                onClick={(e) => this.handleFormSubmit(e, valid)}
            />
        );
    }

    createCancelButton() {
        const props = this.props;
        const isPrepayment = props.parent === 'prepayment';
        const req = props.request;
        return req.error ? null : (
            <Button
                text={lookup('mrc.actions.cancel')}
                id="mrc-cancel-button"
                status="secondary"
                disabled={this.state.canceled}
                onClick={() => {
                    this.setState({ ...this.state, canceled: true, enableSpinner: true });
                    this.props.cancelRequest(req.data.id, () => this.cancelCallback(isPrepayment));
                }}
            />
        );
    }

    cancelCallback = function (isPrepayment) {
        const req = this.props ? this.props.request : undefined;
        if (req && req.data && req.data.requestedCustomerId) {
            let prefix = 'customerstatus';
            if (isPrepayment) {
                prefix = 'prepayment';
            }
            const target = `/${prefix}/${req.data.requestedCustomerId.country}/${req.data.requestedCustomerId.storeNumber}/${req.data.requestedCustomerId.customerNumber}`;
            this.props.history.replace(target);
        }
    }.bind(this);

    handleFormSubmit = (e, creditDataValid) => {
        e.preventDefault();
        if (!creditDataValid) {
            console.warn('LimitRequest: Form is not valid, abort submit.');
            return;
        }
        this.props.submitRequest(this.props.request.data.id);
    };

    handleAdditionalFieldsOnSave = (fields) => {
        const newAdditionalFieldsValidations = this.state.additionalFieldsValidations;
        fields.forEach((field) => {
            newAdditionalFieldsValidations[field.id] = true;
        });
        this.setState({
            additionalFieldsValidations: newAdditionalFieldsValidations,
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
        const nonePlaceholderDefined =
            limitRequest.placeholderTypes === undefined ||
            limitRequest.placeholderTypes === null ||
            (limitRequest.placeholderTypes !== undefined &&
                limitRequest.placeholderTypes !== null &&
                limitRequest.placeholderTypes.length == 1 &&
                limitRequest.placeholderTypes[0] === 'none');
        if (limitRequest.fileTypes) this.FILE_TYPES = limitRequest.fileTypes;
        if (limitRequest.collateralAttachments !== undefined && limitRequest.collateralAttachments !== null) {
            this.COLLATERALS_ATTACHMENTS = limitRequest.collateralAttachments;
        } else {
            this.COLLATERALS_ATTACHMENTS = [];
        }
        if (limitRequest.placeholderTypes)
            this.PLACEHOLDER_TYPES = limitRequest.placeholderTypes
                ? limitRequest.placeholderTypes
                : limitRequest.fileTypes;

        const _attachments = List(this.COLLATERALS_ATTACHMENTS);
        const _placeholders = List(
            _.uniqBy(limitRequest.placeholders, 'fileType')
                .map((ph) => {
                    return { ...ph, status: 'missing', secondaryInteraction: 'add' };
                })
                .filter((ph) => _attachments.filter((a) => !a.deleted && a.fileType === ph.fileType).isEmpty())
        );

        const withDeleteRestore = _attachments.map((a) => {
            return a.deleted
                ? {
                      ...a,
                      status: 'deleted',
                      secondaryInteraction: a.isCollateral ? null : 'restore',
                      handleSecondaryAction: () =>
                          this.props.restoreAttachment(limitRequest.id, limitRequest.version, a.id),
                  }
                : {
                      ...a,
                      status: 'normal',
                      secondaryInteraction: a.isCollateral ? null : 'delete',
                      handleSecondaryAction: () =>
                          this.props.deleteAttachment(limitRequest.id, limitRequest.version, a.id),
                  };
        });

        const addAttachment = (fileType, file, title, expiryDate, amount, metadata) => {
            this.props.addAttachment(
                fileType,
                limitRequest.id,
                file,
                title,
                limitRequest.version,
                expiryDate,
                amount,
                metadata
            );
        };

        const country = limitRequest.requestedCustomerId ? limitRequest.requestedCustomerId.country : null;

        const attachmentsAndPlaceholders = withDeleteRestore
            .concat(
                _placeholders.map((a) => {
                    return {
                        ...a,
                        disabled: false,
                        secondaryInteraction: 'delete',
                        handlePrimaryAction: () => null,
                        handleSecondaryAction: () =>
                            this.props.deletePlaceholder(limitRequest.id, limitRequest.version, a.id),
                    };
                })
            )
            .toArray();

        const fileTypes = List(this.FILE_TYPES).toArray();
        const placeholderTypes = List(this.PLACEHOLDER_TYPES).toArray();

        return (
            <Attachments
                noPlaceholder={nonePlaceholderDefined}
                contractUrl={null}
                noDeletedAttachmentsToggle={true}
                disabled={!this.props.request.data || this.props.request.loading}
                readonly={!this.props.request.data || this.props.request.loading}
                attachments={attachmentsAndPlaceholders}
                addAttachment={addAttachment}
                fileTypes={fileTypes}
                placeholderTypes={placeholderTypes}
                country={country}
                currentApprover={''}
                savePlaceholder={(fileType) => {
                    const matchingFileType = (x) => x.filter((a) => a.fileType === fileType);

                    if (!matchingFileType(_placeholders).isEmpty()) {
                        _.flowRight(this.props.showError, lookup)('limitRequest.errors.duplicatePlaceholder');
                    } else if (
                        !matchingFileType(_attachments)
                            .filter((a) => !a.deleted)
                            .isEmpty()
                    ) {
                        _.flowRight(this.props.showError, lookup)('limitRequest.errors.attachmentAlreadyUploaded');
                    } else {
                        this.props.addPlaceholder(limitRequest.id, limitRequest.version, fileType);
                    }
                }}
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
        const { parent } = this.props;
        const request = _.get(this.props, 'request.data');
        const requestAdditionalFields = filterAdditionalFieldsList(
            _.get(this.props, 'additionalFields') ? this.props.additionalFields.requestFields : undefined,
            'REQUEST',
            'CREDIT_DATA'
        );
        const hasRequestAdditionalFields = hasAdditionalFields(requestAdditionalFields);
        const groupAdditionalFields = filterAdditionalFieldsList(
            _.get(this.props, 'additionalFields') ? this.props.additionalFields.requestFields : undefined,
            'GROUP',
            'CREDIT_DATA'
        );
        const hasGroupAdditionalFields = hasAdditionalFields(groupAdditionalFields);
        const readOnly =
            !this.props.request.data ||
            this.props.request.loading ||
            this.state.canceled ||
            this.props.request.data.requestDisabled;
        const dateFormat = this.getDateFormatString();
        const isPrepaymentEnabled =
            this.props.countriesWithPrepayment !== undefined &&
            this.props.countriesWithPrepayment !== null &&
            this.props.countriesWithPrepayment.length > 0 &&
            this.props.countriesWithPrepayment.includes(_.get(request, 'requestedCustomerId.country'));
        return (
            <CreditDataTab
                country={_.get(request, 'requestedCustomerId.country')}
                parent={parent !== undefined ? parent : 'creditlimit'}
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
                              const hasCustomerAdditionalFields = hasAdditionalFields(customerAdditionalFieldsList);
                              const isAtLeastOneFieldIsInvalid =
                                  hasCustomerAdditionalFields &&
                                  atLeastOneFieldIsInvalid(
                                      customerAdditionalFieldsList,
                                      this.state.additionalFieldsValidations
                                  );
                              const itemId = _.get(item, 'id');
                              const availablePayments = _.get(item, 'customer.availablePayments');
                              const isPrepaymentCustomer = dataForPrepayment(
                                  _.get(item, 'customer.creditLimit'),
                                  _.get(item, 'customer.paymentAllowanceCd'),
                                  _.get(item, 'customer.creditSettleTypeCd'),
                                  _.get(item, 'customer.creditSettlePeriodCd'),
                                  _.get(item, 'customer.creditSettleFrequencyCd')
                              );
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
                                      current: isPrepaymentCustomer
                                          ? {
                                                amount: null,
                                                product: null,
                                                period: null,
                                                debitType: null,
                                                expiry: {
                                                    date: null,
                                                    amount: null,
                                                },
                                            }
                                          : {
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
                                  isPrepaymentCustomer: isPrepaymentCustomer,
                                  limitExhaustion: _.get(item, 'customer.limitExhaustion'),
                              };
                          })
                        : []
                }
                creditProgram={
                    parent !== 'prepayment'
                        ? {
                              limitRequestId: _.get(request, 'id'),
                              setCreditPrograms: this.props.setCreditPrograms.bind(this),
                              getCreditPrograms: this.props.getCreditPrograms.bind(this),
                              setValidity: this.setCreditProgramValidity.bind(this),
                              readOnly: readOnly,
                          }
                        : undefined
                }
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
                isPrepaymentEnabled={isPrepaymentEnabled}
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
        const { parent } = this.props;
        const isPrepayment = parent === 'prepayment';
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
                                        {!isPrepayment ? <Tab>{lookup('mrc.sales.title')}</Tab> : null}
                                        <Tab>{lookup('mrc.comments.title')}</Tab>
                                        <Tab>{lookup('mrc.attachments.title')}</Tab>
                                    </TabList>
                                    <ErrorHandledTabPanel>{this.createCustomerDetailsPanel(req)}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCreditTab()}</ErrorHandledTabPanel>
                                    {!isPrepayment ? (
                                        <ErrorHandledTabPanel>{this.createSalesPanel()}</ErrorHandledTabPanel>
                                    ) : null}
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
                                    {!isPrepayment ? (
                                        <Collapsible trigger={lookup('mrc.sales.title')}>
                                            {this.createSalesPanel()}
                                        </Collapsible>
                                    ) : null}
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
    showError: PropTypes.func,
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
    addPlaceholder: PropTypes.func,
    deletePlaceholder: PropTypes.func,
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
    countriesWithPrepayment: PropTypes.array,
    parent: PropTypes.string,
};
