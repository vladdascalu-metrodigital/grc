import React, { Component } from 'react';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import CreditDataTab from '../../CreditDataTab';
import PropTypes from 'prop-types';
import '../../tabs.scss';
import HistoryStatusBar from '../Shared/HistoryStatusBar';
import RequestDetails from '../Shared/RequestDetails';
import { lookup } from '../../Util/translations';
import { Accordion, Collapsible } from '../../Accordion';
import Sales from './Sales';
import Payments from './Payments';
import Scoring from './Scoring';
import Strategy from './Strategy';
import Comments from '../../Comments';
import Attachments from '../../Attachments';
import Button from '../../Button';
import AuditTrail from './AuditTrail';
import * as _ from 'lodash';
import ErrorHandler from '../../ErrorHandler';
import Management from './Management';
import { RequestFieldPropTypes } from '../../AdditionalFields/AdditionalFieldsPropTypes';
import { filterAdditionalFieldsByCode, filterAdditionalFieldsList } from '../../AdditionalFields/additionalFielsUtil';
import { CommentPropTypes } from '../../Comments/CommentsPropTypes';
import CustomerDataGroup from '../../CustomerDataGroup';
import * as util from '../../ApprovalService/ApprovalProcess/util';
import { createBlockingInfo } from '../../Util/blockingInfoUtils';
import { dataForPrepayment, dataForPrepaymentWithPrefix } from '../../Util/creditDataUtils';
import { hasAdditionalFields } from '../../AdditionalFields/additionalFielsUtil';

export default class HistoryDetailsPresentation extends Component {
    FILE_TYPES = [''];
    constructor(props) {
        super(props);
        this.state = {};
    }

    customerDetailsPanel(requestData) {
        const customers = requestData ? requestData.map((ri) => ri.customerData) : null;
        return (
            <CustomerDataGroup
                customers={customers}
                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
            />
        );
    }

    buttons(params) {
        const isRetriable = _.get(params.auditTrailDetails, 'phaseSet.0.items.0.additionalInfo.isRetriable');
        const requestType = _.get(params.requestStatus, 'requestType');
        const editable = !this.props.buttonsDisabled;
        if (isRetriable && requestType != 'LIMIT_EXPIRY') {
            return (
                <div className="mrc-btn-group">
                    <Button
                        status={editable ? 'success' : 'secondary'}
                        text={lookup('history.retry')}
                        onClick={() => this.props.retry(params.requestId)}
                        disabled={!editable}
                    />
                    <Button
                        status={editable ? 'error' : 'secondary'}
                        text={lookup('history.cancel')}
                        onClick={() => this.props.cancelActivation(params.requestId)}
                        disabled={!editable}
                    />
                </div>
            );
        } else if (params.status === 'Pending' || params.status === 'Claimed' || params.status === 'Review_Pending') {
            return (
                <div className="mrc-btn-group">
                    <Button
                        status={'secondary'}
                        text={lookup('history.button.go-to-approval')}
                        onClick={() => {
                            window.location =
                                this.props.approvalServiceUrl + '/approvalprocessbyrequestid/' + params.requestId;
                        }}
                    />
                </div>
            );
        } else {
            return null;
        }
    }

    desktopView(params) {
        const startTabIndex = params.topManagementTabEnabled ? 2 : 1;
        const isNotCreditCorrectionRequest =
            params === undefined ||
            params.requestStatus === undefined ||
            params.requestStatus.requestType !== 'CREDIT_CORRECTION';
        const isPrepayment = _.get(params, 'requestStatus.isPrepayment');
        return (
            <Tabs forceRenderTabPanel={true} defaultIndex={startTabIndex}>
                <TabList>
                    {params.topManagementTabEnabled ? <Tab>{lookup('mrc.topmanagement.title')}</Tab> : null}
                    <Tab>{lookup('mrc.customerdetails.title')}</Tab>
                    <Tab>{lookup('mrc.creditdetails.title')}</Tab>
                    {isNotCreditCorrectionRequest && !isPrepayment ? (
                        <React.Fragment>
                            <Tab>{lookup('mrc.sales.title')}</Tab>
                            <Tab>{lookup('mrc.payments.title')}</Tab>
                            <Tab>{lookup('mrc.scores.title')}</Tab>
                            <Tab>{lookup('mrc.strategy.title')}</Tab>
                        </React.Fragment>
                    ) : null}
                    <Tab>{lookup('mrc.comments.title')}</Tab>
                    <Tab>{lookup('mrc.attachments.title')}</Tab>
                    <Tab>{lookup('mrc.audittrail.title')}</Tab>
                </TabList>
                {params.topManagementTabEnabled ? (
                    <ErrorHandledTabPanel>
                        <Management
                            requestData={params.requestData}
                            requestedCustomerId={params.requestedCustomerId}
                            totalTurnover={params.totalTurnover}
                            profitability={params.groupProfitability}
                            country={params.countryCode}
                            mobile={false}
                            recommendations={params.recommendations}
                            validMccScore={params.validMccScore}
                        />
                    </ErrorHandledTabPanel>
                ) : null}
                <ErrorHandledTabPanel>
                    {params.requestData ? this.customerDetailsPanel(params.requestData) : null}
                </ErrorHandledTabPanel>
                <ErrorHandledTabPanel>
                    <Accordion>
                        <CreditDataTab {...createCreditDataProps(params)} />
                    </Accordion>
                </ErrorHandledTabPanel>
                {isNotCreditCorrectionRequest && !isPrepayment ? (
                    <React.Fragment>
                        <ErrorHandledTabPanel>
                            <Sales salesOverviews={params.salesOverviews} />
                        </ErrorHandledTabPanel>
                        <ErrorHandledTabPanel>
                            <Payments paymentsOverviews={params.paymentsOverviews} />
                        </ErrorHandledTabPanel>
                        <ErrorHandledTabPanel>
                            <Scoring
                                scores={params.scores}
                                historicExtScores={params.historicExtScores}
                                country={params.countryCode}
                                host={window.location.origin}
                            />
                        </ErrorHandledTabPanel>
                        <ErrorHandledTabPanel>
                            <Strategy
                                strategyKeyIndicatorsData={params.strategyKeyIndicatorsData}
                                approvalProcess={params.approvalProcess}
                                countryCode={params.countryCode}
                            />
                        </ErrorHandledTabPanel>
                    </React.Fragment>
                ) : null}
                <ErrorHandledTabPanel>
                    <Comments
                        comments={params.comments}
                        timeoutDate={params.approvalProcess && params.approvalProcess.automaticDecisionAt}
                        disabled={true}
                    />
                </ErrorHandledTabPanel>
                <ErrorHandledTabPanel>
                    <Attachments
                        noDeletedAttachmentsToggle={true}
                        disabled={false}
                        noAddButton={true}
                        customerName={params.customerName}
                        country={params.countryCode}
                        attachments={
                            /* eslint-disable */
                            params.attachments
                                ? params.attachments
                                      .map((a) => {
                                          return { ...a, status: 'normal', contentUri: a.uri };
                                      })
                                      .filter((a) => !a.markedForDeletion)
                                : null
                            /* eslint-enable */
                        }
                    />
                </ErrorHandledTabPanel>
                <ErrorHandledTabPanel>
                    <AuditTrail auditTrailDetails={params.auditTrailDetails} status={params.status} />
                </ErrorHandledTabPanel>
            </Tabs>
        );
    }

    mobileView(params) {
        const isNotCreditCorrectionRequest =
            params === undefined ||
            params.requestStatus === undefined ||
            params.requestStatus.requestType !== 'CREDIT_CORRECTION';
        const isPrepayment = _.get(params, 'requestStatus.isPrepayment');
        return (
            <Accordion>
                {params.topManagementTabEnabled ? (
                    <Collapsible trigger={lookup('mrc.topmanagement.title')}>
                        <Management
                            requestData={params.requestData}
                            requestedCustomerId={params.requestedCustomerId}
                            totalTurnover={params.totalTurnover}
                            profitability={params.groupProfitability}
                            country={params.countryCode}
                            mobile={true}
                            recommendations={params.recommendations}
                        />
                    </Collapsible>
                ) : null}
                <Collapsible trigger={lookup('mrc.customerdetails.title')}>
                    {params.requestData ? this.customerDetailsPanel(params.requestData) : null}
                </Collapsible>
                <Collapsible trigger={lookup('mrc.creditdetails.title')}>
                    <CreditDataTab {...createCreditDataProps(params)} />
                </Collapsible>
                {isNotCreditCorrectionRequest && !isPrepayment ? (
                    <React.Fragment>
                        <Collapsible trigger={lookup('mrc.sales.title')}>
                            <Sales salesOverviews={params.salesOverviews} />
                        </Collapsible>
                        <Collapsible trigger={lookup('mrc.payments.title')}>
                            <Payments paymentsOverviews={params.paymentsOverviews} />
                        </Collapsible>
                        <Collapsible trigger={lookup('mrc.scores.title')}>
                            <Scoring
                                scores={params.scores}
                                historicExtScores={params.historicExtScores}
                                country={params.countryCode}
                                host={window.location.origin}
                            />
                        </Collapsible>
                        <Collapsible trigger={lookup('mrc.strategy.title')}>
                            <Strategy
                                strategyKeyIndicatorsData={params.strategyKeyIndicatorsData}
                                approvalProcess={params.approvalProcess}
                                countryCode={params.countryCode}
                            />
                        </Collapsible>
                    </React.Fragment>
                ) : null}
                <Collapsible trigger={lookup('mrc.comments.title')}>
                    <ErrorHandler>
                        <Comments
                            comments={params.comments}
                            timeoutDate={params.approvalProcess && params.approvalProcess.automaticDecisionAt}
                            disabled={true}
                        />
                    </ErrorHandler>
                </Collapsible>
                <Collapsible trigger={lookup('mrc.attachments.title')}>
                    <Attachments
                        noDeletedAttachmentsToggle={true}
                        disabled={true}
                        noAddButton={true}
                        customerName={params.customerName}
                        country={params.countryCode}
                        attachments={
                            /* eslint-disable */
                            params.attachments
                                ? params.attachments
                                      .map((a) => {
                                          return { ...a, status: 'normal' };
                                      })
                                      .filter((a) => !a.markedForDeletion)
                                : null
                            /* eslint-enable */
                        }
                    />
                </Collapsible>
                <Collapsible trigger={lookup('mrc.audittrail.title')}>
                    <AuditTrail auditTrailDetails={params.auditTrailDetails} status={params.status} />
                </Collapsible>
            </Accordion>
        );
    }

    // Calculates group profitability according to formula
    // (C1%*C1$+ C2%*C2$+ C3%*C3$) / (C1$+C2$+C3$)
    // where C% = profitability
    //       C$ = turnower last 6m
    getGroupProfitability() {
        const _requestFields = _.get(this.props, 'additionalFields.requestFields');
        if (_.isNil(_requestFields)) {
            return null;
        }
        const profitabilityAdditionalFields = filterAdditionalFieldsByCode(_requestFields, 'percprofitability');
        if (_.isEmpty(profitabilityAdditionalFields)) {
            return null;
        }
        if (_.isNil(this.state.mdwData)) {
            return _.sum(profitabilityAdditionalFields.map((f) => f.value)) / profitabilityAdditionalFields.length;
        }
        let groupProfitability = 0;
        let totalTurnoverL6m = 0;
        this.state.mdwData.map((mdwCustomer) => {
            const customerProfitability = profitabilityAdditionalFields.filter(
                (rf) =>
                    rf.storeNumber === mdwCustomer.customerCreditData.storeNumber &&
                    rf.customerNumber === mdwCustomer.customerCreditData.customerNumber &&
                    rf.country === mdwCustomer.customer.country
            );
            const _customerProfitability = _.get(customerProfitability, '[0].value');
            if (!_.isNil(customerProfitability) && !_.isNil(_customerProfitability)) {
                groupProfitability += _customerProfitability * mdwCustomer.customerCreditData.sellValNspL6m;
                totalTurnoverL6m += mdwCustomer.customerCreditData.sellValNspL6m;
            }
        });

        return totalTurnoverL6m !== 0 ? groupProfitability / totalTurnoverL6m : null;
    }

    render() {
        if (this.props.error) {
            return null;
        }
        const consolidatedOverview = _.find(
            this.props.salesOverviews,
            (x) => _.get(x, 'customerId.customerNumber') === 'consolidated-group-id'
        );
        const totalTurnover = consolidatedOverview
            ? _.get(consolidatedOverview, 'totalQuintet.l12m')
            : this.props.salesOverviews && this.props.salesOverviews.length > 0
            ? _.get(this.props.salesOverviews[0], 'totalQuintet.l12m')
            : null;
        const groupProfitability = this.getGroupProfitability();
        const params = {
            approvalProcess: this.props.approvalProcess,
            countryCode: _.get(this.props, 'customerData.country'),
            groupLimit: this.props.groupLimit,
            salesOverviews: this.props.salesOverviews,
            paymentsOverviews: this.props.paymentsOverviews,
            scores: this.props.scores,
            historicExtScores: this.props.historicExtScores,
            strategyKeyIndicatorsData: this.props.strategyKeyIndicatorsData,
            comments: this.props.comments,
            attachments: this.props.attachments,
            auditTrailDetails: this.props.auditTrailDetails,
            requestData: this.props.requestData,
            requestStatus: this.props.requestStatus,
            validMccScore: this.props.validMccScore,
            customerName: _.get(this.props, 'customerData.displayName'),
            status: _.get(this.props, 'requestStatus.status'),
            requestId: _.get(this.props, 'approvalProcess.request.id'),
            requestedCustomerId: _.get(this.props, 'approvalProcess.request.requestedCustomerId'),
            totalTurnover: totalTurnover,
            recommendations: this.props.recommendations,
            groupProfitability: groupProfitability,
            countriesWithDifferentBlockingCodes: this.props.countriesWithDifferentBlockingCodes,
            additionalFields: this.props.additionalFields,
            selectedCreditProgram: this.props.selectedCreditProgram,
            activated: this.props.activated,
            topManagementTabEnabled: this.props.topManagementTabEnabled,
        };

        return (
            <div className="mrc-main">
                {this.props.notificationShowing ? null : (
                    <HistoryStatusBar statusBar={this.props.statusBar} countryCode={params.countryCode} />
                )}
                <RequestDetails requestStatus={this.props.requestStatus} countryCode={params.countryCode} />
                {this.props.isTablet ? this.desktopView(params) : this.mobileView(params)}
                {this.buttons(params)}
            </div>
        );
    }
}

export const createCreditDataProps = (params) => {
    const isPrepayment = _.get(params, 'requestStatus.isPrepayment');
    const requestFields =
        params.additionalFields !== undefined && params.additionalFields.requestFields !== undefined
            ? params.additionalFields.requestFields
            : undefined;

    const requestAdditionalFields = filterAdditionalFieldsList(requestFields, 'REQUEST', 'CREDIT_DATA');
    const hasRequestAdditionalFields = hasAdditionalFields(requestAdditionalFields);

    const groupAdditionalFields = filterAdditionalFieldsList(requestFields, 'GROUP', 'CREDIT_DATA');
    const hasGroupAdditionalFields = hasAdditionalFields(groupAdditionalFields);
    return {
        //
        // Shape data a littly bit for consistency with business terminology
        //
        country: params.countryCode,
        parent: 'history',
        isPrepaymentRequest: isPrepayment,
        groupLimit: {
            exhausted: _.get(params, 'groupLimit.limitExhaustion'),
            old: _.get(params, 'groupLimit.current'),
            wish: _.get(params, 'groupLimit.requested'),
            current: _.get(params, 'groupLimit.applied'),
            activated: _.get(params, 'groupLimit.activated'),
        },
        activated: _.get(params, 'activated'),
        additionalFields: {
            request: {
                requestFields: requestAdditionalFields,
                onChange: () => null,
                editable: false,
                disabled: true,
            },
            hasRequest: hasRequestAdditionalFields,
            group: {
                requestFields: groupAdditionalFields,
                onChange: () => null,
                editable: false,
                disabled: true,
            },
            hasGroup: hasGroupAdditionalFields,
        },
        creditProgram:
            params.selectedCreditProgram !== undefined &&
            !_.isNil(params.selectedCreditProgram) &&
            params.selectedCreditProgram !== ''
                ? {
                      defaultText: params.selectedCreditProgram,
                      readOnly: true,
                  }
                : null,
        dateFormat: util.dateFormatString(),
        historyRequestType: _.get(params, 'requestStatus.requestType'),
        // All customers
        customers:
            /* eslint-disable */
            _.get(params, 'requestData')
                ? _.get(params, 'requestData').map((data) => {
                      const country = _.get(data, 'customerData.country');
                      const storeNumber = _.get(data, 'customerData.storeNumber');
                      const customerNumber = _.get(data, 'customerData.customerNumber');
                      const customerAdditionalFields = filterAdditionalFieldsList(
                          params.additionalFields !== undefined &&
                              params.additionalFields !== null &&
                              params.additionalFields.requestFields !== undefined &&
                              params.additionalFields.requestFields !== null
                              ? params.additionalFields.requestFields
                              : null,
                          'CUSTOMER',
                          'CREDIT_DATA',
                          country,
                          storeNumber,
                          customerNumber
                      );

                      return {
                          name: _.get(data, 'customerData.displayName'),
                          storeNumber,
                          number: customerNumber,
                          blockingInfo: createBlockingInfo(
                              params.countriesWithDifferentBlockingCodes,
                              _.get(data, 'customerData.blockingReason'),
                              _.get(data, 'customerData.checkoutCheckCode'),
                              _.get(data, 'customerData.country')
                          ),
                          limit: {
                              old:
                                  _.get(params, 'requestStatus.requestType') === 'LIMIT_EXPIRY'
                                      ? {
                                            amount: _.get(params, 'requestStatus.amountBeforeExpiry'),
                                            product: _.get(params, 'requestStatus.creditProduct'),
                                            period: _.get(params, 'requestStatus.creditPeriod'),
                                            debitType: _.get(params, 'requestStatus.debitType'),
                                            expiry: {
                                                date: _.get(params, 'requestStatus.creationDate'),
                                                amount: _.get(params, 'requestStatus.amount'),
                                            },
                                        }
                                      : {
                                            amount: _.get(data, 'current.creditLimit'),
                                            product: _.get(data, 'current.creditProduct'),
                                            period: _.get(data, 'current.creditPeriod'),
                                            debitType: _.get(data, 'current.debitType'),
                                            expiry: {
                                                date: _.get(data, 'currentLimitExpiryDate'),
                                                amount: _.get(data, 'currentResetToLimitAmount'),
                                            },
                                        },
                              wish:
                                  _.get(params, 'requestStatus.requestType') === 'LIMIT_EXPIRY' ||
                                  _.get(params, 'requestStatus.requestType') === 'CREDIT_CORRECTION'
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
                                            amount: _.get(data, 'requested.creditLimit'),
                                            product: _.get(data, 'requested.creditProduct'),
                                            period: _.get(data, 'requested.creditPeriod'),
                                            debitType: _.get(data, 'requested.debitType'),
                                            expiry: {
                                                date: _.get(data, 'requestedLimitExpiryDate'),
                                                amount: _.get(data, 'requestedResetToLimitAmount'),
                                            },
                                            blockingOption: _.get(data, 'requested.blockingOption'),
                                            creditOption: dataForPrepaymentWithPrefix(
                                                params.countryCode,
                                                _.get(data, 'requested.creditLimit'),
                                                '3',
                                                _.get(data, 'requested.creditProduct'),
                                                _.get(data, 'requested.creditPeriod'),
                                                _.get(data, 'requested.debitType')
                                            )
                                                ? 'PREPAYMENT'
                                                : undefined,
                                        },
                              current:
                                  _.get(params, 'requestStatus.requestType') === 'LIMIT_EXPIRY'
                                      ? {
                                            amount: _.get(params, 'requestStatus.amount'),
                                            product: _.get(params, 'requestStatus.creditProduct'),
                                            period: _.get(params, 'requestStatus.creditPeriod'),
                                            debitType: _.get(params, 'requestStatus.debitType'),
                                            expiry: {
                                                date: null,
                                                amount: null,
                                            },
                                        }
                                      : {
                                            amount: _.get(data, 'applied.creditLimit'),
                                            product: _.get(data, 'applied.creditProduct'),
                                            period: _.get(data, 'applied.creditPeriod'),
                                            debitType: _.get(data, 'applied.debitType'),
                                            expiry: {
                                                date:
                                                    _.get(params, 'requestStatus.status') === 'Blocked'
                                                        ? null
                                                        : _.get(data, 'limitExpiryDate'),
                                                amount:
                                                    _.get(params, 'requestStatus.status') === 'Blocked'
                                                        ? null
                                                        : _.get(data, 'resetToLimitAmount'),
                                            },
                                            blockingOption: _.get(data, 'applied.blockingOption'),
                                            creditOption: dataForPrepaymentWithPrefix(
                                                params.countryCode,
                                                _.get(data, 'applied.creditLimit'),
                                                '3',
                                                _.get(data, 'applied.creditProduct'),
                                                _.get(data, 'applied.creditPeriod'),
                                                _.get(data, 'applied.debitType')
                                            )
                                                ? 'PREPAYMENT'
                                                : undefined,
                                        },
                              readOnly: true,
                          },
                          availablePayments: [], //TBD: here we should add maybe all the values already selected for customers ?!?!??!
                          onExpiryChange: () => null,
                          onLimitChange: () => null,
                          onLimitAndExpiryChange: () => null,
                          onChangeCreditOption: () => null,
                          isCashCustomer:
                              _.isNil(_.get(data, 'customerData.paymentAllowanceCd')) ||
                              _.get(data, 'customerData.paymentAllowanceCd') !== '3',
                          isPrepaymentCustomer: dataForPrepayment(
                              _.get(data, 'customerData.creditLimit'),
                              _.get(data, 'customerData.paymentAllowanceCd'),
                              _.get(data, 'customerData.creditSettleTypeCd'),
                              _.get(data, 'customerData.creditSettlePeriodCd'),
                              _.get(data, 'customerData.creditSettleFrequencyCd')
                          ),
                          limitExhaustion: _.get(data, 'customerData.limitExhaustion'),
                          additionalFields: {
                              hasCustomerAdditionalFields: !_.isEmpty(customerAdditionalFields),
                              customerAdditionalFieldsList: customerAdditionalFields,
                              onChange: () => null,
                              editable: false,
                              disabled: true,
                          },
                          failedActivation: _.get(data, 'failedActivation'),
                      };
                  })
                : [],
        /* eslint-enable */
    };
};

HistoryDetailsPresentation.propTypes = {
    error: PropTypes.bool,
    isTablet: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    notificationShowing: PropTypes.string,
    getMdwData: PropTypes.func,
    requestData: PropTypes.array,
    approvalProcess: PropTypes.object,
    groupLimit: PropTypes.object,
    salesOverviews: PropTypes.array,
    paymentsOverviews: PropTypes.object,
    scores: PropTypes.array,
    historicExtScores: PropTypes.array,
    strategyKeyIndicatorsData: PropTypes.object,
    comments: PropTypes.arrayOf(CommentPropTypes),
    attachments: PropTypes.array,
    auditTrailDetails: PropTypes.object,
    requestStatus: PropTypes.object,
    validMccScore: PropTypes.object,
    statusBar: PropTypes.object,
    countryCode: PropTypes.string,
    retry: PropTypes.func,
    cancelActivation: PropTypes.func,
    cancelApproval: PropTypes.func,
    recommendations: PropTypes.array,
    history: PropTypes.object,
    additionalFields: PropTypes.shape({ requestFields: PropTypes.arrayOf(RequestFieldPropTypes) }),
    approvalServiceUrl: PropTypes.string,
    countriesWithDifferentBlockingCodes: PropTypes.array,
    selectedCreditProgram: PropTypes.string,
    activated: PropTypes.bool,
    topManagementTabEnabled: PropTypes.bool,
};
