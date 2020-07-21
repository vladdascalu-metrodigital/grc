import './index.scss';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import React, { Component } from 'react';
import ProgressBar from '../../ProgressBar';
import AuditTrailPresentation from '../AuditTrail/AuditTrailPresentation';
import CreditData from '../CreditData/presentation';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import { Accordion, Collapsible } from '../../Accordion';
import Sales from '../../Sales';
import '../../tabs.scss';
import PropTypes from 'prop-types';
import Button from '../../Button/index';
import Comments from '../../Comments';
import Payments from '../Payments';
import Scoring from '../Scoring';
import Strategy from '../Strategy';
import Management from '../Management';
import Attachments from '../../Attachments';
import MrcSpinner from '../../Util/MrcSpinner';
import DetailedCustomerTrigger from '../../DetailedCustomerTrigger/presentation';
import { lookup } from '../../Util/translations';
import RequestInfoAction from '../../RequestInfoAction';
import HistoryRequestsIcon from '../../icons/request-history.svg';
import ArrowRightIcon from '../../icons/arrow-right.svg';
import SlidingPane from 'react-sliding-pane/dist/react-sliding-pane.js';
import RecentRequestsInfo from '../RecentRequests/RecentRequestsInfo';
import AdditionalFieldsSection from '../../AdditionalFields/AdditionalFieldsSection';
import { RequestFieldPropTypes } from '../../AdditionalFields/AdditionalFieldsPropTypes';
import { filterAdditionalFieldsList, filterAdditionalFieldsByCode } from '../../AdditionalFields/additionalFielsUtil';
import ErrorHandler from '../../ErrorHandler';
import CustomerGroupLimits from '../../CustomerGroupLimits';

import * as util from './util';
import * as _ from 'lodash';
import { List } from 'immutable';
import AutoDecisionReviewReason from './AutoDecisionReviewReason';
import CustomerDataGroup from '../../CustomerDataGroup';

const SENT_BACK = 'SENT_BACK';
const INFO_PROVIDED = 'INFO_PROVIDED';
const MRC_SYSTEM = 'MRC';
const TOP_MANAGEMENT_TAB_ENABLED_COUNTRIES = ['DE'];

export class ApprovalProcessPresentation extends Component {
    FILE_TYPES = [''];

    // Sort by customerId
    static approvalItemsSorter(item1, item2) {
        const cust1 = item1.customer;
        const cust2 = item2.customer;
        if (cust1.requestedCustomer) return -1;
        if (cust2.requestedCustomer) return 1;

        if (cust1.storeNumber !== cust2.storeNumber) {
            return Number.parseInt(cust1.storeNumber) - Number.parseInt(cust2.storeNumber);
        }

        return Number.parseInt(cust1.customerNumber) - Number.parseInt(cust2.customerNumber);
    }

    constructor(props) {
        super(props);
        this.state = {
            attachments: [],
            currentGroupLimit: 0,
            requestedGroupLimit: 0,
            approvedGroupLimit: 0,
            availableGroupLimit: 0,
            exhaustionGroupLimit: 0,
            approvedLimits: null,
            mdwData: null,
            mdwRequestCompleted: false,
            historicCollateral: null,
            isPaneOpen: false,
            selectedTabIndex: null,
            currentStepType: null,
            isCurrentUserAbleToCancel: null,
            validMccScore: null,
            isValidMccScoreChanged: true,
            additionalFieldsValidations: {},
        };

        if (this.props.process.data) {
            props.process.data.approvalItems.sort(ApprovalProcessPresentation.approvalItemsSorter);
        }

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleFetchHistoricCollateralOnOpening = this.handleFetchHistoricCollateralOnOpening.bind(this);

        this.upsertRecommendation = this.upsertRecommendation.bind(this);
        this.deleteRecommendation = this.deleteRecommendation.bind(this);

        this.updateValidMccScoreChangedFlag = this.updateValidMccScoreChangedFlag.bind(this);
        this.handleAdditionalFieldsOnChange = this.handleAdditionalFieldsOnChange.bind(this);
        this.handleAdditionalFieldsOnBlur = this.handleAdditionalFieldsOnBlur.bind(this);
        this.toggleReviewReasonModal = this.toggleReviewReasonModal.bind(this);
        this.onReviewReasonSave = this.onReviewReasonSave.bind(this);
    }

    onReviewReasonSave() {
        const process = this.props.process.data || null;
        const newReviewReason = this.state.newReviewReason;
        this.props.addReviewReason(process.id, newReviewReason, process.version).then((result) => {
            if (result !== null) {
                this.props.reviewDecision(process.id, process.version, false, process.followUpState);
                this.setState({ newReviewReason: undefined });
            }
        });
    }

    handleAmountChange(amount, i) {
        this.setState((prevState) => {
            let approvedLimits = prevState.approvedLimits ? prevState.approvedLimits : [];
            approvedLimits[i] = amount;
            return { approvedLimits: approvedLimits };
        });
    }

    updateNotification(approval) {
        if (approval && !approval.claimedBySomebodyElse && approval.state !== 'CANCELLED') {
            const limitExpiryModifiedInPreviousStage =
                !approval ||
                _.find(approval.approvalItems, (x) => _.get(x, 'requestedLimitExpiry.modifiedInContracting'));

            if (this.state.currentStepType === 'CONTRACT_SIGNING') {
                const [lastStep, thisStep] = _.takeRight(approval.steps, 2).map((a) => a.type);
                if (lastStep === 'CONTRACT_VALIDATION' && thisStep === 'CONTRACT_SIGNING') {
                    this.props.showInfo(lookup('approval.message.request.uploadContractAgain'));
                } else if (!util.placeholdersUploaded(approval)) {
                    this.props.showInfo(lookup('approval.message.request.uploadContract'));
                } else {
                    this.props.hideNotification();
                }
            } else if (this.state.currentStepType === 'CONTRACT_VALIDATION') {
                if (approval.state === 'COMPLETED' || approval.state === 'CONTRACT_VALIDATED') {
                    this.props.hideNotification();
                } else {
                    this.props.showInfo(
                        lookup(
                            limitExpiryModifiedInPreviousStage
                                ? 'approval.message.request.validateContractWithWarning'
                                : 'approval.message.request.validateContract'
                        )
                    );
                }
            }
        }
    }

    componentDidUpdate() {
        const approval = this.props.process.data || null;

        this.updateNotification(approval);

        if (approval && !this.state.mdwRequestCompleted) {
            this.props.getMdwData(approval).then((result) => {
                this.setState({ mdwData: result, mdwRequestCompleted: true });
            });
        }
        if (approval && !this.state.currentStepType) {
            this.setState({ currentStepType: _.get(approval, 'currentStep.type') });
        }
        if (approval && this.state.isValidMccScoreChanged) {
            this.props.getValidMccScore(approval.request.id).then((result) => {
                this.setState({ validMccScore: result, isValidMccScoreChanged: false });
            });
        }
        const isCurrentUserAbleToCancel =
            approval !== null &&
            approval.currentUserPositions !== undefined &&
            approval.currentUserPositions !== null &&
            approval.currentUserPositions.includes('CM');
        if (approval !== null && this.state.isCurrentUserAbleToCancel == null) {
            this.setState({
                isCurrentUserAbleToCancel: isCurrentUserAbleToCancel,
            });
        }
    }

    componentDidMount() {
        const approval = this.props.process.data || null;
        if (approval && _.isNil(this.state.approvedLimits)) {
            const approvedAmounts = approval.approvalItems.map((x) => _.get(x, 'approvedCreditData.amount', null));
            const currentCreditAmounts = approval.approvalItems.map((x) => _.get(x, 'currentCreditData.amount', null));
            const requestedAmounts = approval.approvalItems.map((x) => _.get(x, 'requestedCreditData.amount', 0));

            const _approvedAmounts = approvedAmounts.map((a, i) =>
                _.isNil(a) ? (_.isNil(currentCreditAmounts[i]) ? 0 : currentCreditAmounts[i]) : a
            );

            this.setState({
                approvedLimits: _.sum(_approvedAmounts) === 0 ? requestedAmounts : _approvedAmounts,
            });
        }
    }

    assignmentPanel() {
        const process = this.props.process.data || {};
        const assignedTo = process.assignedTo == null ? '' : process.assignedTo;

        return (
            <div className="mrc-assign-user">
                <div className="mrc-claiming-wrapper">
                    {process.assignableByCurrentUser &&
                    !process.assignedToCurrentUserAlready &&
                    process.assignedUserAlready ? (
                        <p className="mrc-assigned-name span-metro-blue">
                            {lookup('approval.assign.assignedUser')} {assignedTo}.
                        </p>
                    ) : null}

                    {process.assignableByCurrentUser &&
                    process.assignedToCurrentUserAlready &&
                    process.assignedUserAlready ? (
                        <p className="mrc-assigned-name span-metro-blue">
                            {lookup('approval.assign.assignedToCurrentUser')}.
                        </p>
                    ) : null}
                </div>
                <div className="mrc-assignment-buttons mrc-btn-group">
                    {process.assignableByCurrentUser && !process.assignedToCurrentUserAlready ? (
                        <Button
                            text={lookup('approval.assign.assignToMe')}
                            id="mrc-assign-button"
                            status="secondary"
                            onClick={() => this.props.assignUser(process.id, true)}
                        />
                    ) : null}
                    {process.assignableByCurrentUser && process.assignedUserAlready ? (
                        <Button
                            text={lookup('approval.assign.unassign')}
                            id="mrc-unassign-button"
                            status="secondary"
                            onClick={() => this.props.assignUser(process.id, false)}
                        />
                    ) : null}
                </div>
            </div>
        );
    }

    updateValidMccScoreChangedFlag(changed) {
        if (changed) {
            this.setState({ isValidMccScoreChanged: changed });
        }
    }

    upsertRecommendation = (id, content, rating) => {
        const approval = this.props.process.data || {};
        if (content.trim().length > 0) {
            if (id) {
                this.props.saveRecommendation(approval.id, approval.version, id, content, rating);
            } else {
                this.props.addRecommendation(approval.id, content, rating, approval.version);
            }
        }
    };

    deleteRecommendation = (id) => {
        const approval = this.props.process.data || {};
        this.props.deleteRecommendation(approval.id, approval.version, id);
    };

    commentsPanel() {
        const approval = this.props.process.data || {};
        return (
            <Comments
                comments={approval.comments}
                disabled={!approval.editableByCurrentUser}
                onSave={(newValue) => this.props.addComment(approval.id, newValue, approval.version)}
                timeoutDate={approval.automaticDecisionAt}
            />
        );
    }

    contractUrl(country) {
        switch (country) {
            case 'PL':
                return 'https://confluence.metrosystems.net/display/MRC/Contracts+PL';
            case 'RO':
                return 'https://confluence.metrosystems.net/display/MRC/Contracts+RO';
            case 'RS':
                return 'https://confluence.metrosystems.net/display/MRC/Contracts+RS';
            case 'HR':
                return 'https://confluence.metrosystems.net/display/MRC/Contract+HR';
            default:
                return null;
        }
    }

    attachmentsPanel() {
        const approval = this.props.process.data || {};

        if (approval.fileTypes) {
            this.FILE_TYPES = approval.fileTypes;
        }
        if (approval.fileTypesForCC) {
            this.FILE_TYPES_FOR_CC = approval.fileTypesForCC;
        }

        const _attachments = List(approval.attachments);
        const _placeholders = List(
            _.uniqBy(approval.placeholders, 'fileType')
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
                      handleSecondaryAction: () => this.props.restoreAttachment(approval.id, approval.version, a.id),
                  }
                : {
                      ...a,
                      status: 'normal',
                      secondaryInteraction: a.isCollateral ? null : 'delete',
                      handleSecondaryAction: () => this.props.deleteAttachment(approval.id, approval.version, a.id),
                  };
        });

        const addAttachment = (fileType, file, title, expiryDate, amount, metadata) => {
            this.props.addAttachment(
                fileType,
                approval.id,
                file,
                title,
                approval.version,
                expiryDate,
                amount,
                metadata
            );
        };

        const country = approval.request ? approval.request.country : null;
        const isContractingStep = util.isContractingStep(this.state.currentStepType);

        const attachmentsAndPlaceholders = withDeleteRestore
            .concat(
                isContractingStep
                    ? _placeholders
                    : _placeholders.map((a) => {
                          return {
                              ...a,
                              disabled: !approval.editableByCurrentUser,
                              secondaryInteraction: 'delete',
                              handlePrimaryAction: () => null,
                              handleSecondaryAction: () =>
                                  this.props.deletePlaceholder(approval.id, approval.version, a.id),
                          };
                      })
            )
            .toArray();

        const hasContracting = !List(approval.pendingContractingPositions).isEmpty();
        const currentApprover = _.get(approval, 'currentStep.requiredPosition');
        const _fileTypes =
            !isContractingStep && currentApprover === 'CC' ? List(this.FILE_TYPES_FOR_CC) : List(this.FILE_TYPES);

        const fileTypes = hasContracting ? _fileTypes.push('contracting').toArray() : _fileTypes.toArray();

        return (
            <Attachments
                noPlaceholder={isContractingStep || !hasContracting}
                contractUrl={this.contractUrl(country)}
                disabled={!approval.editableByCurrentUser}
                attachments={attachmentsAndPlaceholders}
                readonly={!approval.editableByCurrentUser}
                addAttachment={addAttachment}
                fileTypes={fileTypes}
                country={country}
                currentApprover={currentApprover}
                savePlaceholder={(fileType) => {
                    const matchingFileType = (x) => x.filter((a) => a.fileType === fileType);

                    if (!matchingFileType(_placeholders).isEmpty()) {
                        _.flowRight(this.props.showError, lookup)('approval.error.duplicatePlaceholder');
                    } else if (
                        !matchingFileType(_attachments)
                            .filter((a) => !a.deleted)
                            .isEmpty()
                    ) {
                        _.flowRight(this.props.showError, lookup)('approval.error.attachmentAlreadyUploaded');
                    } else {
                        this.props.addPlaceholder(approval.id, approval.version, fileType);
                    }
                }}
            />
        );
    }

    createCollateralsRetryBlock() {
        const approval = this.props.process.data || {};
        if (approval.collateralsFailed === true) {
            return (
                <div className="mrc-collateral-retry">
                    <div className="mrc-collateral-retry-buttons mrc-btn-group">
                        <p>{lookup('approval.collateral.failed')}: </p>
                        <button
                            ref={(btn) => {
                                this.collateralRetryButton = btn;
                            }}
                            id="mrc-collateral-button"
                            className="mrc-secondary-button"
                            type="button"
                            onClick={this.handleCollateralsRetryButtonClick}
                            disabled={!approval.editableByCurrentUser}
                        >
                            {lookup('approval.collateral.retry')}
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }

    historicCollateralBlock() {
        const approval = this.props.process.data || {};
        if (
            approval.historicCollateralEnabled !== undefined &&
            approval.historicCollateralEnabled !== null &&
            approval.historicCollateralEnabled === true
        ) {
            return (
                <Accordion>
                    <Collapsible
                        open={this.state.historicCollateral !== null}
                        key={approval.id}
                        onOpening={this.handleFetchHistoricCollateralOnOpening}
                        trigger={lookup('approval.collateral.fetchHistoricData')}
                    >
                        {this.historicCollateralDetails(this.state.historicCollateral, approval)}
                    </Collapsible>
                </Accordion>
            );
        }
        return null;
    }

    handleCollateralsRetryButtonClick = () => {
        this.collateralRetryButton.setAttribute('disabled', 'disabled');
        const approval = this.props.process.data || {};
        this.props.collateralRetry(approval);
    };

    handleFetchHistoricCollateralOnOpening = () => {
        const approval = this.props.process.data || {};
        if (this.state.historicCollateral !== null || !approval.editableByCurrentUser) {
            return;
        }
        this.props.fetchHistoricCollateral(approval).then((result) => {
            this.setState({ historicCollateral: result === undefined ? null : result });
        });
    };

    historicCollateralDetails(historicCollateral, approval) {
        if (approval.fileTypes) {
            this.FILE_TYPES = approval.fileTypes;
        }

        if (historicCollateral === null) {
            return (
                <div className="mrc-attachments">
                    <div className="mrc-detail">{lookup('approval.error.fetchHistoricCollateralFailed')}</div>
                </div>
            );
        }

        return (
            <Attachments
                noDeletedAttachmentsToggle={true}
                readonly={!approval.editableByCurrentUser}
                disabled={!approval.editableByCurrentUser}
                noAddButton={true}
                attachments={historicCollateral.map((a) => {
                    return { ...a, status: 'normal' };
                })}
                fileTypes={this.FILE_TYPES}
                country={approval.country}
            />
        );
    }

    salesPanel() {
        if (!util.isStandardStep(this.state.currentStepType)) {
            return null;
        }
        const approval = this.props.process.data || {};
        return <Sales getMdwData={() => this.props.getMdwData(approval)} />;
    }

    paymentsPanel() {
        if (!util.isStandardStep(this.state.currentStepType)) {
            return null;
        }
        const approval = this.props.process.data || {};
        return <Payments getPaymentsData={() => this.props.getPaymentsData(approval.id)} />;
    }

    scoringPanel() {
        if (!util.isStandardStep(this.state.currentStepType)) {
            return null;
        }
        const approval = this.props.process.data || {};
        const host = window.location.origin;

        return (
            <Scoring
                approvalId={approval.id}
                getScoringData={() => this.props.getScoringData(approval)}
                getHistoricScoringData={this.props.getHistoricScoringData}
                addExtScore={this.props.addExtScore.bind(this, approval)}
                country={approval.country}
                storeNumber={approval.approvalItems[0].customer.storeNumber}
                customerNumber={approval.approvalItems[0].customer.customerNumber}
                requestId={approval.request.id}
                disabled={!approval.editableByCurrentUser}
                host={host}
                showScoringError={this.props.showScoringError}
                hideScoringError={this.props.hideScoringError}
                historicExternalScoreFailed={approval.historicExternalScoreFailed}
                historicExternalScoreRetry={this.props.historicExternalScoreRetry}
                updateValidMccScoreChangedFlag={this.updateValidMccScoreChangedFlag}
            />
        );
    }

    strategyPanel() {
        if (!util.isStandardStep(this.state.currentStepType)) {
            return null;
        }
        const country = _.get(this.props, 'process.data.country');
        const approval = this.props.process.data || {};
        return <Strategy getStrategyData={() => this.props.getStrategyData(approval.id)} country={country} />;
    }

    // Calculates group profitability according to formula
    // (C1%*C1$+ C2%*C2$+ C3%*C3$) / (C1$+C2$+C3$)
    // where C% = profitability
    //       C$ = turnower last 6m
    getGroupProfitability() {
        const _requestFields = _.get(this.props, 'additionalFields.data.requestFields');
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

    management(process, currency, l12mTurnover) {
        return (
            <Management
                buttonsDisabled={!process.editableByCurrentUser}
                mobile={true}
                currency={currency}
                currentUser={_.get(this.props, 'process.data.claimedBy')}
                approvalItems={process.approvalItems}
                totalTurnover={l12mTurnover}
                profitability={this.getGroupProfitability()}
                recommendations={process.recommendations}
                upsertRecommendation={this.upsertRecommendation}
                deleteRecommendation={this.deleteRecommendation}
                saveRecommendation={this.upsertRecommendation}
                newRecommendation={this.state.newRecommendation}
                editedRecommendation={this.state.editedRecommendation}
                validMccScore={this.state.validMccScore}
                approvedGroupLimit={this.approvedGroupLimit(process, this.state.creditData)}
                requestedGroupLimit={this.state.requestedGroupLimit}
            />
        );
    }

    /**
     * @overload lifecycle callback to check for valid data actually loaded
     *
     * @param nextProps
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        //
        // when data is actually loaded, use the suitable creditdata as my internal state
        //
        const process = nextProps.process.data;
        //
        // If there is creditdata, use it *as is*.
        // The second condition needs some explanation (and see bugs https://jira.metrosystems.net/browse/MRC-2069 and https://jira.metrosystems.net/browse/MRC-2070):
        // Actually the creditData is only used when it first gets available.
        // Later, adding a comment or an attachment will update the whole structure of the approval including the
        // creditData subobject, which will override all changes we made so far.
        // This is prohibited by the second condition. The first set of creditData will stick.
        //
        if (process && !this.state.creditData) {
            //
            // in case nothing has been approved before, assume the requested data to be kind of approved
            // for this creditdata is loaded from the database, it has initially to be seen as valid
            //
            process.approvalItems.sort(ApprovalProcessPresentation.approvalItemsSorter);

            //
            // state is a map of customerUUID to CreditData
            // and a map of customerUUID to validity flag
            //

            let cds = this.state.creditData || {};
            let valids = this.state.isCreditDataValid || {};
            let cgl = 0;
            let rgl = 0;
            let agl = 0;
            let exhaustiongl = 0;

            process.approvalItems.map((approvalItem) => {
                const custId = approvalItem.customer.id;
                const creditData = approvalItem.approvedCreditData || approvalItem.requestedCreditData;

                if (approvalItem.currentCreditData != null) {
                    cgl += approvalItem.currentCreditData.amount;
                }
                const requested = _.get(approvalItem, 'requestedCreditData.amount');
                const current = _.get(approvalItem, 'currentCreditData.amount');
                const approved = _.get(approvalItem, 'approvedCreditData.amount');
                const requestedAmount =
                    !_.isNil(requested) && !_.isNaN(requested) ? requested : !_.isNil(current) ? current : 0;
                const approvedAmount =
                    !_.isNil(approved) && !_.isNaN(approved) ? approved : !_.isNil(current) ? current : 0;
                rgl += requestedAmount;
                agl += approvedAmount;
                if (approvalItem.customer.limitExhaustion != null) {
                    exhaustiongl += approvalItem.customer.limitExhaustion;
                }

                cds[custId] = creditData;
                valids[custId] = true;
            });
            // this.setState({creditData: cds, isCreditDataValid: valids});
            this.setState({
                creditData: cds,
                isCreditDataValid: valids,
                currentGroupLimit: cgl,
                requestedGroupLimit: rgl,
                approvedGroupLimit: agl,
                availableGroupLimit: cgl - exhaustiongl,
                exhaustionGroupLimit: exhaustiongl,
            });
        }
    }

    approvedGroupLimit(approval, creditData) {
        if (!_.get(approval, 'approvalItems')) {
            return 0;
        }
        const currentCreditAmounts = approval.approvalItems.map((x) => _.get(x, 'currentCreditData.amount', null));
        var approvedGroupLimitInst = 0;
        let i = 0;
        for (const [key, value] of Object.entries(creditData)) {
            if (value !== undefined && key !== undefined) {
                const _valuesafe =
                    !_.isNaN(value.amount) && !_.isNil(value.amount)
                        ? value.amount
                        : !_.isNil(currentCreditAmounts[i])
                        ? currentCreditAmounts[i]
                        : 0;
                i++;
                approvedGroupLimitInst = approvedGroupLimitInst + _valuesafe;
            }
        }
        approvedGroupLimitInst = isNaN(approvedGroupLimitInst) ? 0 : approvedGroupLimitInst;
        return approvedGroupLimitInst;
    }

    groupLimitInfos(
        approval,
        creditData,
        currentGroupLimit,
        requestedGroupLimit,
        availableGroupLimit,
        exhaustionGroupLimit
    ) {
        return (
            <CustomerGroupLimits
                country={approval.country}
                exhaustionGroupLimit={exhaustionGroupLimit}
                requestedGroupLimit={requestedGroupLimit}
                approvedGroupLimitInst={this.approvedGroupLimit(approval, creditData)}
                currentGroupLimit={currentGroupLimit}
                availableGroupLimit={availableGroupLimit}
            />
        );
    }

    //
    // snip with customer groups
    //
    customers(approvalItems) {
        const customers = approvalItems.map((approvalItem) => {
            return approvalItem.customer;
        });

        return (
            <CustomerDataGroup
                customers={customers}
                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
            />
        );
    }

    requestAdditionalFields(approval) {
        const requestFields =
            this.props.additionalFields !== undefined &&
            this.props.additionalFields.data !== undefined &&
            this.props.additionalFields.data !== null
                ? this.props.additionalFields.data.requestFields
                : undefined;

        const requestAdditionalFields = filterAdditionalFieldsList(requestFields, 'REQUEST', 'CREDIT_DATA');
        const hasRequestAdditionalFields =
            requestAdditionalFields !== undefined &&
            requestAdditionalFields !== null &&
            requestAdditionalFields.length > 0
                ? true
                : false;
        if (!hasRequestAdditionalFields) {
            return null;
        }
        return (
            <div className="mrc-credit-data mrc-input-group small-margin">
                <span
                    className="additional-fields-background-text"
                    title={lookup('additional.fields.request.title')}
                ></span>
                <AdditionalFieldsSection
                    requestFields={requestAdditionalFields}
                    onChange={this.handleAdditionalFieldsOnChange}
                    onBlur={this.handleAdditionalFieldsOnBlur}
                    disabled={!approval.editableByCurrentUser}
                />
            </div>
        );
    }

    groupAdditionalFields(approval) {
        const requestFields =
            this.props.additionalFields !== undefined &&
            this.props.additionalFields.data !== undefined &&
            this.props.additionalFields.data !== null
                ? this.props.additionalFields.data.requestFields
                : undefined;
        const groupAdditionalFields = filterAdditionalFieldsList(requestFields, 'GROUP', 'CREDIT_DATA');
        const hasGroupAdditionalFields =
            groupAdditionalFields !== undefined && groupAdditionalFields !== null && groupAdditionalFields.length > 0
                ? true
                : false;
        if (!hasGroupAdditionalFields) {
            return null;
        }
        return (
            <div className="mrc-credit-data mrc-input-group small-margin">
                <span
                    className="additional-fields-background-text"
                    title={lookup('additional.fields.group.title')}
                ></span>
                <AdditionalFieldsSection
                    requestFields={groupAdditionalFields}
                    onChange={this.handleAdditionalFieldsOnChange}
                    onBlur={this.handleAdditionalFieldsOnBlur}
                    disabled={!approval.editableByCurrentUser}
                />
            </div>
        );
    }

    groupLimitInfosAndAdditionalFields(hasGroupLimitInfos) {
        const approval = this.props.process.data || {};
        const creditData = this.state.creditData || {};
        const currentGroupLimit = this.state.currentGroupLimit !== undefined ? this.state.currentGroupLimit : 0;
        const requestedGroupLimit = this.state.requestedGroupLimit !== undefined ? this.state.requestedGroupLimit : 0;
        const availableGroupLimit = this.state.availableGroupLimit !== undefined ? this.state.availableGroupLimit : 0;
        const exhaustionGroupLimit =
            this.state.exhaustionGroupLimit !== undefined ? this.state.exhaustionGroupLimit : 0;

        const groupLimitAndAdditionalFieldsClass = hasGroupLimitInfos ? 'mrc-ui-col-3' : 'mrc-ui-col-2';
        return (
            <div className={groupLimitAndAdditionalFieldsClass}>
                {hasGroupLimitInfos
                    ? this.groupLimitInfos(
                          approval,
                          creditData,
                          currentGroupLimit,
                          requestedGroupLimit,
                          availableGroupLimit,
                          exhaustionGroupLimit
                      )
                    : null}
                {this.requestAdditionalFields(approval)}
                {this.groupAdditionalFields(approval)}
            </div>
        );
    }

    //
    // snip with customer groups
    //
    creditDatas(approvalItems, readOnly) {
        const approval = this.props.process.data || {};
        const collapsibles = approvalItems.map((approvalItem, i) => {
            const customer = approvalItem.customer;
            const custId = customer.id;
            const dateFormat = util.dateFormatString();
            const additionalFieldsList = filterAdditionalFieldsList(
                this.props.additionalFields !== undefined &&
                    this.props.additionalFields.data !== undefined &&
                    this.props.additionalFields.data !== null
                    ? this.props.additionalFields.data.requestFields
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
            // const trigger   = approvalItem.customer.storeNumber+'/'+approvalItem.customer.customerNumber;
            const trigger = (
                <DetailedCustomerTrigger
                    customer={approvalItem.customer}
                    current={approvalItem.currentCreditData ? approvalItem.currentCreditData.amount : null}
                    requested={approvalItem.requestedCreditData.amount}
                    approved={
                        approvalItem.approvedCreditData != null ? approvalItem.approvedCreditData.amount : undefined
                    }
                    aProduct={
                        approvalItem.approvedCreditData != null
                            ? approvalItem.approvedCreditData.creditProduct
                            : undefined
                    }
                    cProduct={approvalItem.currentCreditData ? approvalItem.currentCreditData.creditProduct : null}
                    rProduct={approvalItem.requestedCreditData.creditProduct}
                    aPeriod={
                        approvalItem.approvedCreditData != null
                            ? approvalItem.approvedCreditData.creditPeriod
                            : undefined
                    }
                    cPeriod={approvalItem.currentCreditData ? approvalItem.currentCreditData.creditPeriod : null}
                    rPeriod={approvalItem.requestedCreditData.creditPeriod}
                    aDebitType={
                        approvalItem.approvedCreditData != null ? approvalItem.approvedCreditData.debitType : undefined
                    }
                    cDebitType={approvalItem.currentCreditData ? approvalItem.currentCreditData.debitType : null}
                    rDebitType={approvalItem.requestedCreditData.debitType}
                    cLimitExpiryDate={
                        approvalItem.currentLimitExpiry != null &&
                        approvalItem.currentLimitExpiry.limitExpiryDate != null
                            ? approvalItem.currentLimitExpiry.limitExpiryDate
                            : undefined
                    }
                    rLimitExpiryDate={
                        approvalItem.requestedLimitExpiry != null &&
                        approvalItem.requestedLimitExpiry.limitExpiryDate != null
                            ? approvalItem.requestedLimitExpiry.limitExpiryDate
                            : undefined
                    }
                    cLimitExpiryValue={
                        approvalItem.currentLimitExpiry != null &&
                        approvalItem.currentLimitExpiry.resetToLimitAmount != null &&
                        approvalItem.currentLimitExpiry.limitExpiryDate != null
                            ? approvalItem.currentLimitExpiry.resetToLimitAmount
                            : undefined
                    }
                    rLimitExpiryValue={
                        approvalItem.requestedLimitExpiry != null &&
                        approvalItem.requestedLimitExpiry.resetToLimitAmount != null &&
                        approvalItem.requestedLimitExpiry.limitExpiryDate != null
                            ? approvalItem.requestedLimitExpiry.resetToLimitAmount
                            : undefined
                    }
                    isWithWarning={
                        (approvalItem.customer.blockingReason != undefined &&
                            approvalItem.customer.blockingReason != null) ||
                        (approvalItem.customer.checkoutCheckCode != undefined &&
                            approvalItem.customer.checkoutCheckCode != null)
                    }
                />
            );
            const creditData = (
                <Collapsible open={i === 0} key={custId} trigger={trigger}>
                    <div className="mrc-ui-col-3">
                        <div className={creditDataClass}>
                            <CreditData
                                currentStepType={this.state.currentStepType}
                                current={approvalItem.currentCreditData || {}}
                                index={i}
                                countryForCurrency={approvalItem.customer.country}
                                readOnly={
                                    util.isContractingStep(this.state.currentStepType) ||
                                    readOnly ||
                                    approval.waitingForReview ||
                                    approval.reviewed
                                }
                                requested={approvalItem.requestedCreditData}
                                approved={
                                    approvalItem.lastCreditDataJson != null &&
                                    approvalItem.lastCreditDataJson != undefined
                                        ? approvalItem.lastCreditDataJson
                                        : this.state.creditData[custId]
                                }
                                availablePayments={approvalItem.customer.availablePayments}
                                setLimitExpiry={this.props.setLimitExpiry.bind(this, approval)}
                                setCreditData={this.props.setLastCreditData.bind(this, approval)}
                                approvalItem={approvalItem}
                                approval={approval}
                                dateFormat={dateFormat}
                                creditDataEntered={(creditData, valid) => {
                                    let cds = this.state.creditData;
                                    let valids = this.state.isCreditDataValid;

                                    cds[custId] = creditData;
                                    valids[custId] = valid;

                                    this.setState({
                                        creditData: cds,
                                        isCreditDataValid: valids,
                                    });
                                }}
                                handleAmountChange={this.handleAmountChange}
                                countriesWithDifferentBlockingCodes={this.props.countriesWithDifferentBlockingCodes}
                            />
                        </div>
                        {hasAdditionalFields ? (
                            <div className="mrc-input-group">
                                <ErrorHandler>
                                    <AdditionalFieldsSection
                                        requestFields={additionalFieldsList}
                                        onChange={this.handleAdditionalFieldsOnChange}
                                        onBlur={this.handleAdditionalFieldsOnBlur}
                                        disabled={!approval.editableByCurrentUser}
                                    />
                                </ErrorHandler>
                            </div>
                        ) : null}
                    </div>
                </Collapsible>
            );
            return creditData;
        });
        return (
            <Accordion>
                {this.groupLimitInfosAndAdditionalFields(approvalItems.length > 1)}
                {collapsibles}
            </Accordion>
        );
    }

    tabs(process) {
        if (util.isContractingStep(this.state.currentStepType)) {
            return (
                <TabList>
                    <Tab key="1">{lookup('mrc.customerdata.title')}</Tab>
                    <Tab key="2">{lookup('mrc.creditdata.title')}</Tab>
                    <Tab key="3">{lookup('mrc.comments.title')}</Tab>
                    <Tab key="4">{lookup('mrc.attachments.title')}</Tab>
                </TabList>
            );
        } else {
            return (
                <TabList>
                    {TOP_MANAGEMENT_TAB_ENABLED_COUNTRIES.includes(process.country) ? (
                        <Tab>{lookup('mrc.topmanagement.title')}</Tab>
                    ) : null}
                    <Tab key="1">{lookup('mrc.customerdata.title')}</Tab>
                    <Tab key="2">{lookup('mrc.creditdata.title')}</Tab>
                    <Tab key="3">{lookup('mrc.sales.title')}</Tab>
                    <Tab key="4">{lookup('mrc.scoring.title')}</Tab>
                    <Tab key="5">{lookup('mrc.payments.title')}</Tab>
                    {process.reviewStrategy ? <Tab key="6">{lookup('mrc.strategy.title')}</Tab> : null}
                    <Tab key="7">{lookup('mrc.comments.title')}</Tab>
                    <Tab key="8">{lookup('mrc.attachments.title')}</Tab>
                    <Tab key="9">{lookup('mrc.audittrail.title')}</Tab>
                </TabList>
            );
        }
    }

    tabContents(process, currency, l12mTurnover, customerData, creditData) {
        if (util.isContractingStep(this.state.currentStepType)) {
            return [
                <ErrorHandledTabPanel key="1">{customerData}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="2">{creditData}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="3">{this.commentsPanel()}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="4">{this.attachmentsPanel()}</ErrorHandledTabPanel>,
            ];
        } else {
            return [
                TOP_MANAGEMENT_TAB_ENABLED_COUNTRIES.includes(process.country) ? (
                    <ErrorHandledTabPanel key="5">
                        {this.management(process, currency, l12mTurnover)}
                    </ErrorHandledTabPanel>
                ) : null,
                <ErrorHandledTabPanel key="6">{customerData}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="7">{creditData}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="8">
                    <Sales mdwData={this.state.mdwData} />
                </ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="9">{this.scoringPanel()}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="10">{this.paymentsPanel()}</ErrorHandledTabPanel>,
                process.reviewStrategy ? (
                    <ErrorHandledTabPanel key="foo">{this.strategyPanel()}</ErrorHandledTabPanel>
                ) : null,
                <ErrorHandledTabPanel key="11">{this.commentsPanel()}</ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="12">
                    {this.createCollateralsRetryBlock()}
                    {this.attachmentsPanel()}
                    {this.historicCollateralBlock()}
                </ErrorHandledTabPanel>,
                <ErrorHandledTabPanel key="13">
                    <AuditTrailPresentation
                        auditTrail={process.auditTrail}
                        pendingApprovalPositions={process.pendingApprovalPositions}
                        pendingContractingPositions={process.pendingContractingPositions}
                    />
                </ErrorHandledTabPanel>,
            ];
        }
    }

    recentRequests(recentRequests, isTablet) {
        if (!recentRequests || recentRequests.loading || !recentRequests.data) {
            return <span>{lookup('history.customerNotFoundMessage')}</span>;
        }
        return <RecentRequestsInfo recentRequests={recentRequests} isTablet={isTablet} />;
    }

    slidingPaneRecentRequests() {
        let width = '40%';
        let iconClass = 'mrc-icon-large';
        if (!this.props.isTablet) {
            // return null;
            width = '90%';
            iconClass = 'mrc-icon-base';
        }
        return (
            <div>
                <SlidingPane
                    className="some-custom-class"
                    overlayClassName="some-custom-overlay-class"
                    isOpen={this.state.isPaneOpen}
                    title={lookup('history.recentrequests.heading')}
                    width={width}
                    closeIcon={<img className="mrc-icon-base" src={ArrowRightIcon} />}
                    onRequestClose={() => {
                        this.setState({ isPaneOpen: false });
                    }}
                >
                    <div className="mrc-sliding-pane">
                        {this.recentRequests(this.props.recentRequests, this.props.isTablet)}
                    </div>
                </SlidingPane>
                <span className="requests-history-icon" onClick={() => this.setState({ isPaneOpen: true })}>
                    <img className={iconClass} src={HistoryRequestsIcon} alt="Requests history" />
                </span>
            </div>
        );
    }

    requestInfo = (approvalStep) => {
        this.props.requestInfo(
            this.props.process.data.id,
            approvalStep,
            this.props.process.data.version,
            this.state.creditData
        );
    };

    contractingSubmitButton(process) {
        return this.state.currentStepType === 'CONTRACT_SIGNING' ? (
            <Button
                text={lookup('approval.action.signContract')}
                id="mrc-approve-button"
                status="primary"
                disabled={!process.editableByCurrentUser || !util.placeholdersUploaded(process)}
                onClick={() => this.props.signContract(process.id, process.version)}
            />
        ) : (
            <Button
                text={lookup('approval.action.validateContract')}
                id="mrc-approve-button"
                status="primary"
                disabled={!process.editableByCurrentUser || !util.placeholdersUploaded(process)}
                onClick={() => this.props.validateContract(process.id, process.version)}
            />
        );
    }

    contractingSendbackButton(process) {
        return (
            <Button
                text={lookup('approval.action.requestContractingInfo')}
                id="mrc-approve-button"
                status="secondary"
                disabled={!process.editableByCurrentUser}
                onClick={() => this.props.requestNewContract(process.id, process.version)}
            />
        );
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

    additionalFieldsValid() {
        return !(Object.values(this.state.additionalFieldsValidations).filter((value) => !value).length > 0);
    }

    buttons(groupLimit, currency) {
        const process = this.props.process.data || {};
        const isContracting = util.isContractingStep(this.state.currentStepType);
        const inTopManagmentTab =
            this.state.selectedTabIndex === 0 &&
            TOP_MANAGEMENT_TAB_ENABLED_COUNTRIES.includes(process.country) &&
            !isContracting;
        return (
            <div className="mrc-btn-group">
                {isContracting ? this.contractingSubmitButton(process) : null}
                {this.state.currentStepType === 'CONTRACT_VALIDATION' ? this.contractingSendbackButton(process) : null}
                {!isContracting &&
                !inTopManagmentTab &&
                !process.supportsProvideInfo &&
                process.editableByCurrentUser &&
                !process.supportsConfirm &&
                !process.waitingForReview ? (
                    <RequestInfoAction
                        id="mrc-sendback-button"
                        steps={this.props.process.data.auditTrail
                            .filter(
                                (e) => e.action !== SENT_BACK && e.action !== INFO_PROVIDED && e.position !== MRC_SYSTEM
                            )
                            .map((auditTrail) => auditTrail.position)}
                        requestInfo={this.requestInfo}
                    />
                ) : null}
                {isContracting || (!inTopManagmentTab && !process.waitingForReview && !process.reviewed) ? (
                    <Button
                        text={lookup('approval.action.cancel')}
                        id="mrc-cancel-button"
                        status="secondary"
                        disabled={
                            (isContracting && !process.editableByCurrentUser) ||
                            !(
                                process.editableByCurrentUser ||
                                (this.state.isCurrentUserAbleToCancel &&
                                    process.state !== 'CANCELLED' &&
                                    process.state !== 'COMPLETED' &&
                                    process.state !== 'REJECTED')
                            )
                        }
                        onClick={() => {
                            this.props.cancel(process.id, process.version);
                            this.setState({ isCurrentUserAbleToCancel: false });
                        }}
                    />
                ) : null}
                {!isContracting &&
                !inTopManagmentTab &&
                process.supportsBlock &&
                !process.waitingForReview &&
                !process.reviewed ? (
                    <Button
                        text={lookup('approval.action.block')}
                        id="mrc-block-button"
                        status={process.editableByCurrentUser ? 'error' : 'secondary'}
                        disabled={!process.editableByCurrentUser}
                        onClick={() => {
                            this.props.block(process.id, process.version);
                        }}
                    />
                ) : null}
                {process.supportsApprove && !process.waitingForReview && !process.reviewed ? (
                    <Button
                        text={lookup('approval.action.reject')}
                        id="mrc-error-button"
                        status={process.editableByCurrentUser ? 'error' : 'secondary'}
                        disabled={!process.editableByCurrentUser}
                        onClick={() => {
                            this.props.reject(process.id, process.version);
                        }}
                    />
                ) : null}
                {process.supportsApprove && !process.waitingForReview && !process.reviewed ? (
                    <Button
                        text={
                            !_.isNil(groupLimit) && !_.isNil(currency)
                                ? lookup('approval.action.approve') + ' ' + util.formatted(groupLimit) + ' ' + currency
                                : lookup('approval.action.approve')
                        }
                        id="mrc-approve-button"
                        status={
                            process.editableByCurrentUser && util.allCreditDataValid(this.state.isCreditDataValid)
                                ? 'primary'
                                : 'secondary'
                        }
                        disabled={
                            !process.editableByCurrentUser ||
                            !util.allCreditDataValid(this.state.isCreditDataValid) ||
                            !this.additionalFieldsValid()
                        }
                        onClick={() => {
                            this.props.approve(process.id, process.version, this.state.creditData);
                        }}
                    />
                ) : null}
                {!inTopManagmentTab && process.supportsConfirm && !process.waitingForReview && !process.reviewed ? (
                    <Button
                        text={lookup('approval.action.approve')}
                        id="mrc-confirm-button"
                        status="success"
                        disabled={!process.editableByCurrentUser}
                        onClick={() => {
                            this.props.confirm(process.id, process.version);
                        }}
                    />
                ) : null}
                {!inTopManagmentTab &&
                !isContracting &&
                process.supportsProvideInfo &&
                !process.waitingForReview &&
                !process.reviewed ? (
                    <Button
                        text={lookup('approval.action.provideInfo')}
                        id="mrc-prove-info-button"
                        status={process.editableByCurrentUser ? 'success' : 'secondary'}
                        disabled={!process.editableByCurrentUser}
                        onClick={() => {
                            this.props.provideInfo(process.id, process.version, this.state.creditData);
                        }}
                    />
                ) : null}
                {!isContracting && ((!inTopManagmentTab && process.waitingForReview) || process.reviewed) ? (
                    <Button
                        text={lookup('approval.action.reviewConfirm')}
                        id="mrc-review-confirm-button"
                        status={
                            process.editableByCurrentUser && process.waitingForReview && !process.reviewed
                                ? 'success'
                                : 'secondary'
                        }
                        disabled={!process.editableByCurrentUser || !process.waitingForReview || process.reviewed}
                        onClick={() => {
                            this.props.reviewDecision(process.id, process.version, true, process.followUpState, null);
                        }}
                    />
                ) : null}
                {!isContracting && ((!inTopManagmentTab && process.waitingForReview) || process.reviewed) ? (
                    <Button
                        text={lookup('approval.action.reviewManual')}
                        id="mrc-review-manual-button"
                        status="secondary"
                        disabled={!process.editableByCurrentUser || !process.waitingForReview || process.reviewed}
                        onClick={() => {
                            this.toggleReviewReasonModal();
                        }}
                    />
                ) : null}
            </div>
        );
    }

    createPanelName(process) {
        let panelName = process.waitingForReview
            ? lookup('mrc.phase.review')
            : process.currentStepNr === process.totalSteps
            ? lookup('mrc.phase.activation')
            : process.currentStepNr === 3
            ? lookup('mrc.phase.contracting')
            : lookup('mrc.phase.approval');

        if (process.followUpState !== null && (process.currentStepNr !== 3 || process.currentStepNr !== 4)) {
            panelName += ': ' + lookup('approval.follow_up_state.' + process.followUpState.toLowerCase());
        }
        return panelName;
    }

    toggleReviewReasonModal() {
        this.setState((prevState) => ({ isReviewReasonModalVisible: !prevState.isReviewReasonModalVisible }));
    }

    render() {
        if (!this.state.creditData) {
            return <MrcSpinner />;
        }

        const process = this.props.process.data;

        if (process === null) {
            return null;
        }
        const currentCreditAmounts = process.approvalItems.map((x) => _.get(x, 'currentCreditData.amount', null));
        const _approvedAmounts = !_.isNil(this.state.approvedLimits)
            ? this.state.approvedLimits.map((a, i) =>
                  _.isNil(a) ? (_.isNil(currentCreditAmounts[i]) ? 0 : currentCreditAmounts[i]) : a
              )
            : [];

        const approveButtonGroupLimit = _.sum(_approvedAmounts);

        const creditData = this.creditDatas(
            process.approvalItems,
            process.supportsConfirm || process.supportsProvideInfo
        );
        const customerData = this.customers(process.approvalItems);
        const panelName = this.createPanelName(process);

        const currentApprover = _.get(process, 'currentStep.requiredPosition');

        const isTopManager = currentApprover === 'CFO' || currentApprover === 'CEO';

        var defaultTabIndex = 0;
        if (util.isContractingStep(this.state.currentStepType)) {
            defaultTabIndex = 3;
        } else if (process.strategyDefaultTabIndex && !isTopManager) {
            if (TOP_MANAGEMENT_TAB_ENABLED_COUNTRIES.includes(process.country)) {
                defaultTabIndex = 6;
            } else {
                defaultTabIndex = 5;
            }
        }

        const l12mTurnover = this.state.mdwData
            ? _.sum(_.map(this.state.mdwData, (x) => _.get(x, 'customerCreditData.sellValNspL12m')))
            : null;

        const currency = {
            DE: 'EUR',
            ES: 'EUR',
            PT: 'EUR',
            AT: 'EUR',
            PK: 'PKR',
            PL: 'PLN',
            RS: 'RSD',
        }[process.country];

        return (
            <div className="mrc-approval-process">
                {this.slidingPaneRecentRequests()}
                <ProgressBar name={panelName} step={process.currentStepNr} totalSteps={process.totalSteps} />
                {this.assignmentPanel()}
                {this.props.isTablet ? (
                    <Tabs
                        forceRenderTabPanel={true}
                        defaultIndex={defaultTabIndex}
                        onSelect={(x) => this.setState({ selectedTabIndex: x })}
                    >
                        {this.tabs(process)}
                        {this.tabContents(process, currency, l12mTurnover, customerData, creditData)}
                    </Tabs>
                ) : (
                    <Accordion>
                        {TOP_MANAGEMENT_TAB_ENABLED_COUNTRIES.includes(process.country) ? (
                            <Collapsible trigger={lookup('mrc.topmanagement.title')}>
                                {this.management(process, currency, l12mTurnover)}
                            </Collapsible>
                        ) : null}
                        <Collapsible trigger={lookup('mrc.customerdata.title')}>{customerData}</Collapsible>
                        <Collapsible trigger={lookup('mrc.creditdata.title')}>{creditData}</Collapsible>
                        <Collapsible trigger={lookup('mrc.sales.title')}>
                            <Sales mdwData={this.state.mdwData} />
                        </Collapsible>
                        <Collapsible trigger={lookup('mrc.scoring.title')}>{this.scoringPanel()}</Collapsible>
                        <Collapsible trigger={lookup('mrc.payments.title')}>{this.paymentsPanel()}</Collapsible>
                        {process.reviewStrategy ? (
                            <Collapsible trigger={lookup('mrc.strategy.title')}>{this.strategyPanel()}</Collapsible>
                        ) : null}
                        <Collapsible trigger={lookup('mrc.comments.title')}>{this.commentsPanel()}</Collapsible>
                        <Collapsible trigger={lookup('mrc.attachments.title')}>
                            {this.createCollateralsRetryBlock()}
                            {this.attachmentsPanel()}
                            {this.historicCollateralBlock()}
                        </Collapsible>
                        <Collapsible trigger={lookup('mrc.audittrail.title')}>
                            <AuditTrailPresentation
                                auditTrail={process.auditTrail}
                                pendingApprovalPositions={process.pendingApprovalPositions}
                            />
                        </Collapsible>
                    </Accordion>
                )}
                <AutoDecisionReviewReason
                    newContent={this.state.newReviewReason}
                    onContentChange={(newReviewReason) => this.setState({ newReviewReason })}
                    onSave={this.onReviewReasonSave}
                    toggleModal={this.toggleReviewReasonModal}
                    isModalVisible={this.state.isReviewReasonModalVisible}
                ></AutoDecisionReviewReason>
                {this.props.process.loading ? <MrcSpinner /> : this.buttons(approveButtonGroupLimit, currency)}
            </div>
        );
    }
}

ApprovalProcessPresentation.propTypes = {
    showInfo: PropTypes.func,
    showError: PropTypes.func,
    showSuccess: PropTypes.func,
    hideNotification: PropTypes.func,
    process: PropTypes.object.isRequired,
    recentRequests: PropTypes.object,
    additionalFields: PropTypes.shape({
        data: PropTypes.shape({ requestFields: PropTypes.arrayOf(RequestFieldPropTypes) }),
    }),
    updateAdditionalField: PropTypes.func.isRequired,
    approve: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    requestInfo: PropTypes.func.isRequired,
    requestNewContract: PropTypes.func.isRequired,
    provideInfo: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    signContract: PropTypes.func,
    validateContract: PropTypes.func,
    addAttachment: PropTypes.func,
    addPlaceholder: PropTypes.func,
    deleteAttachment: PropTypes.func,
    deletePlaceholder: PropTypes.func,
    restoreAttachment: PropTypes.func,
    addComment: PropTypes.func,
    addReviewReason: PropTypes.func,
    addRecommendation: PropTypes.func,
    deleteRecommendation: PropTypes.func,
    saveRecommendation: PropTypes.func,
    isTablet: PropTypes.bool.isRequired,
    historicExternalScoreRetry: PropTypes.func,
    reviewDecision: PropTypes.func,
    getMdwData: PropTypes.func,
    getPaymentsData: PropTypes.func,
    getScoringData: PropTypes.func,
    getStrategyData: PropTypes.func,
    addExtScore: PropTypes.func,
    showScoringError: PropTypes.func,
    hideScoringError: PropTypes.func,
    assignUser: PropTypes.func,
    collateralRetry: PropTypes.func,
    fetchHistoricCollateral: PropTypes.func,
    setLimitExpiry: PropTypes.func,
    getHistoricScoringData: PropTypes.func,
    setLastCreditData: PropTypes.func,
    getValidMccScore: PropTypes.func,
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
