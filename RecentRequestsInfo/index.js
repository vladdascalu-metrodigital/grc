import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { lookup } from '../Util/translations';

import BlockedIcon from '../icons/signal-blocked-new.svg';
import PendingIcon from '../icons/signal-pending-new.svg';
import ApprovedIcon from '../icons/signal-approved-new.svg';
import QuickCheckIcon from '../icons/quick-check-blue.svg';
import CreditCorrectionIcon from '../icons/credit-correction-blue.svg';
import OpenIcon from '../icons/signal-open-new.svg';
import ArrowRightIcon from '../icons/arrow-right.svg';
import ProgressBar from '../ProgressBar';
import MrcNumber from '../MrcNumber';
import MrcDate from '../MrcDate';

import './index.scss';
import PrepaymentIcon from '../icons/prepayment-blue.svg';

export default class RecentRequestsInfo extends Component {
    render() {
        const requestResponse = this.props.recentRequests.data;
        const divClassName = this.props.isTablet ? 'recent-requests-info tablet' : 'recent-requests-info no-tablet';
        if (requestResponse && requestResponse.requests != null && requestResponse.requests.length > 0) {
            return (
                <div className={divClassName}>
                    {this.createProgressBar(requestResponse.progressBar)}
                    <div className="recent-requests">
                        {this.createHeading()}
                        {this.createRequestRows(requestResponse)}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    createProgressBar(progressBar) {
        return progressBar == null ? null : (
            <ProgressBar
                name={lookup('mrc.phase.' + progressBar.phase)}
                step={progressBar.currentStep}
                totalSteps={progressBar.totalSteps}
            />
        );
    }

    createHeading() {
        return <p className="heading">{lookup('history.recentrequests.heading')}</p>;
    }

    createRequestRows(requestResponse) {
        const rows = requestResponse.requests.map((request, index) => {
            return (
                <ul key={'recent-request-' + index}>
                    <li id={request.requestId} className="mrc-request-record">
                        <a href={request.url}>
                            {request.requestStatus.requestType !== 'QUICK_CHECK'
                                ? this.createRequestDetails(request.requestStatus, requestResponse.country)
                                : this.createQuickCheckDetails(request.requestStatus)}
                        </a>
                    </li>
                </ul>
            );
        });
        return <div className="mrc-requests">{rows}</div>;
    }

    createRequestDetails(requestStatus, country) {
        return (
            <div className="mrc-request-details">
                {this.createTrafficLight(requestStatus)}
                {this.createRequestDetailTitle(requestStatus, country)}
                <div className="mrc-request-details-arrow-right-container">
                    <img src={ArrowRightIcon} alt="Details" />
                </div>
                <div className="mrc-request-details-credit-data">
                    {this.createCreditData(requestStatus)}
                    {this.createRequestStatus(requestStatus)}
                </div>
            </div>
        );
    }

    createRequestDetailTitle(requestStatus, country) {
        if (requestStatus.requestType === 'LIMIT_EXPIRY') {
            return (
                <div className="mrc-request-details-title">
                    <MrcDate>{requestStatus.creationDate}</MrcDate> / {lookup('history.status.item.from')}{' '}
                    <MrcNumber isCurrency country={country}>
                        {requestStatus.amount}
                    </MrcNumber>{' '}
                    {lookup('history.status.item.to')}{' '}
                    <MrcNumber isCurrency country={country}>
                        {requestStatus.amountBeforeExpiry}
                    </MrcNumber>
                </div>
            );
        }
        const shouldRenderGroupLimit = requestStatus.groupMembers > 1 && requestStatus.groupAmount >= 0.0;
        return (
            <div className="mrc-request-details-title">
                <MrcDate>{requestStatus.creationDate}</MrcDate> /{' '}
                <span>{lookup(requestStatus.applied ? 'mrc.label.appliedLimit' : 'mrc.label.requestedLimit')}</span>{' '}
                <MrcNumber isCurrency country={country}>
                    {requestStatus.amount}
                </MrcNumber>
                {shouldRenderGroupLimit ? <span className="mrc-position"> ({lookup('mrc.groupLimit')} </span> : null}
                {shouldRenderGroupLimit ? (
                    <MrcNumber isCurrency country={country}>
                        {requestStatus.amount > requestStatus.groupAmount
                            ? requestStatus.amount
                            : requestStatus.groupAmount}
                    </MrcNumber>
                ) : null}
                {shouldRenderGroupLimit ? <span className="mrc-position">)</span> : null}
            </div>
        );
    }

    createRequestStatus(requestStatus) {
        if (requestStatus.requestType === 'LIMIT_EXPIRY') {
            return (
                <div>
                    {requestStatus.status != null ? (
                        <p>
                            <span className={requestStatus.status}>
                                <b>{this.createStatus(requestStatus)}</b>
                                {requestStatus.status === 'Pending' ? (
                                    <span className="mrc-position"> {lookup('mrc.status.at')}</span>
                                ) : (
                                    <span className="mrc-position"> {lookup('mrc.status.by')}</span>
                                )}
                                <span className="mrc-position"> {requestStatus.position}</span>
                            </span>
                        </p>
                    ) : null}
                </div>
            );
        } else {
            return (
                <div>
                    {requestStatus.status != null ? (
                        <p>
                            <span className={requestStatus.status}>
                                <b>{this.createStatus(requestStatus)}</b>
                                <span className="mrc-position"> {lookup('mrc.status.by')}</span>
                                <span className="mrc-position"> {requestStatus.position}</span>
                            </span>
                        </p>
                    ) : null}
                </div>
            );
        }
    }

    createQuickCheckDetails(requestStatus) {
        return (
            <div className="mrc-request-details">
                {this.createTrafficLight(requestStatus)}
                <div className="mrc-request-details-title">
                    <MrcDate>{requestStatus.creationDate}</MrcDate>, <span>{lookup('mrc.requesttype.quickcheck')}</span>
                </div>
                <div className="mrc-request-details-arrow-right-container">
                    <img src={ArrowRightIcon} alt="Details"></img>
                </div>
                <div className="mrc-request-details-credit-data">
                    <div>
                        {requestStatus.status != null ? (
                            <p>
                                <span className={requestStatus.status}>
                                    <b>{this.createStatus(requestStatus)}</b>
                                    {requestStatus.status != 'Aborted' ? (
                                        <span className="mrc-position"> {lookup('mrc.status.by')}</span>
                                    ) : null}
                                    {requestStatus.status != 'Aborted' ? (
                                        <span className="mrc-position"> {requestStatus.position}</span>
                                    ) : null}
                                </span>
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    createTrafficLight(requestStatus) {
        if (requestStatus.requestType === 'CREDIT_CORRECTION') {
            return <img src={CreditCorrectionIcon} alt="Credit Correction Light"></img>;
        }
        if (requestStatus.requestType === 'LIMIT_REQUEST' && requestStatus.isPrepayment) {
            return <img src={PrepaymentIcon} alt="Prepayment"></img>;
        }
        if (requestStatus.trafficLight == 'red') {
            return <img src={BlockedIcon} alt="RED Traffic Light"></img>;
        }
        if (requestStatus.trafficLight == 'yellow') {
            return <img src={PendingIcon} alt="YELLOW Traffic Light"></img>;
        }
        if (requestStatus.trafficLight == 'green') {
            return <img src={ApprovedIcon} alt="GREEN Traffic Light"></img>;
        }
        if (requestStatus.trafficLight == 'quickcheck') {
            return <img src={QuickCheckIcon} alt="QUICKCHECK Traffic Light"></img>;
        }
        return <img src={OpenIcon} alt="GREY Traffic Light"></img>;
    }

    createCreditData(requestStatus) {
        if (requestStatus.requestType == 'LIMIT_EXPIRY') {
            return <div>{lookup('history.status.item.limitIsExpired')}</div>;
        } else {
            if (
                (requestStatus.creditProduct !== null && requestStatus.creditProduct !== '') ||
                (requestStatus.creditPeriod !== null && requestStatus.creditPeriod !== '') ||
                (requestStatus.debitType !== null && requestStatus.debitType !== '')
            ) {
                return (
                    <div className="infos">
                        {requestStatus.creditProduct != null && requestStatus.creditProduct.trim() != 'mrc.payment.'
                            ? requestStatus.creditProduct.includes('mrc.payment.')
                                ? lookup(requestStatus.creditProduct)
                                : lookup('mrc.payment.' + requestStatus.creditProduct.replace(' ', '_'))
                            : null}
                        {requestStatus.creditPeriod != null && requestStatus.creditPeriod.trim() != 'mrc.payment.'
                            ? requestStatus.creditPeriod.includes('mrc.payment.')
                                ? ', ' + lookup(requestStatus.creditPeriod)
                                : ', ' + lookup('mrc.payment.' + requestStatus.creditPeriod.replace(' ', '_'))
                            : null}
                        {requestStatus.debitType != null && requestStatus.debitType != 'mrc.payment.'
                            ? requestStatus.debitType.includes('mrc.payment.')
                                ? ', ' + lookup(requestStatus.debitType)
                                : ', ' + lookup('mrc.payment.' + requestStatus.debitType.replace(' ', '_'))
                            : null}
                    </div>
                );
            } else {
                return null;
            }
        }
    }

    createStatus(requestStatus) {
        switch (requestStatus.status) {
            case 'Failed':
                return <span className="span-error uppercase">{lookup('mrc.status.failed')}</span>;
            case 'Activated':
                return <span className="span-success uppercase">{lookup('mrc.status.activated')}</span>;
            case 'Approved':
                return <span className="span-success uppercase">{lookup('mrc.status.approved')}</span>;
            case 'Blocked':
                return <span className="span-error uppercase">{lookup('mrc.status.blocked')}</span>;
            case 'Retried':
                return <span className="retried uppercase">{lookup('mrc.status.retried')}</span>;
            case 'Claimed':
                return <span className="claimed uppercase">{lookup('mrc.status.claimed')}</span>;
            case 'Pending':
                return <span className="span-blue uppercase">{lookup('mrc.status.pending')}</span>;
            case 'Cancelled':
                return <span className="span-error uppercase">{lookup('mrc.status.cancelled')}</span>;
            case 'Requested':
                return <span className="span-blue uppercase">{lookup('mrc.status.requested')}</span>;
            case 'Sent_back':
                return <span className="span-blue uppercase">{lookup('mrc.status.sentback')}</span>;
            case 'Waiting_For_Info':
                return <span className="span-blue uppercase">{lookup('mrc.status.waitingforinfo')}</span>;
            case 'Provided':
                return <span className="span-blue uppercase">{lookup('mrc.status.infoprovided')}</span>;
            case 'Rejected':
                return <span className="span-error uppercase">{lookup('mrc.status.rejected')}</span>;
            case 'Review':
                return <span className="span-blue uppercase">{lookup('mrc.status.review')}</span>;
            case 'Aborted':
                return <span className="span-blue uppercase">{lookup('mrc.status.aborted')}</span>;
            case 'Review_Pending':
                return <span className="span-blue uppercase">{lookup('mrc.status.review_pending')}</span>;
            case 'Retry_Getting_Indicators':
                return <span className="span-error uppercase">{lookup('mrc.status.retry_getting_indicators')}</span>;
            case 'Changed':
                return this.createCustomerStatusForCreditCorrection(requestStatus);
            case 'Manual':
                return <span className="uppercase">{lookup('mrc.status.manual')}</span>;
            case 'Contract_signed':
                return <span className="span-blue uppercase">{lookup('mrc.status.contractSigned')}</span>;
            case 'Contract_validated':
                return <span className="span-blue uppercase">{lookup('mrc.status.contractValidated')}</span>;
            case 'Waiting_For_Data':
                return <span className="uppercase">{lookup('mrc.status.waiting_for_data')}</span>;
            default:
                return <span></span>;
        }
    }

    createCustomerStatusForCreditCorrection(requestStatus) {
        switch (requestStatus.searchedCustomerStatus) {
            case 'CREDITTOCASH':
                return <span className="span-success uppercase">{lookup('mrc.status.changed-to-cash')}</span>;
            case 'HARDBLOCK':
                return <span className="span-success uppercase">{lookup('mrc.status.hard-blocked')}</span>;
            case 'SOFTBLOCK':
                return <span className="span-success uppercase">{lookup('mrc.status.soft-blocked')}</span>;
            case 'REMOVEBLOCK':
                return <span className="span-success uppercase">{lookup('mrc.status.block-removed')}</span>;
            case 'GENERALBLOCK':
                return <span className="span-success uppercase">{lookup('mrc.status.general-blocked')}</span>;
            default:
                return <span className="span-success uppercase">{lookup('mrc.status.changed')}</span>;
        }
    }
}

RecentRequestsInfo.propTypes = {
    recentRequests: PropTypes.object.isRequired,
    isTablet: PropTypes.bool,
};
