import React, { Component } from 'react';
import BlockedIcon from '../../icons/signal-blocked-new.svg';
import PendingIcon from '../../icons/signal-pending-new.svg';
import ApprovedIcon from '../../icons/signal-approved-new.svg';
import QuickCheckIcon from '../../icons/quick-check-blue.svg';
import CreditCorrectionIcon from '../../icons/credit-correction-blue.svg';
import OpenIcon from '../../icons/signal-open-new.svg';
import ArrowRightIcon from '../../icons/arrow-right.svg';
import { lookup } from '../../Util/translations';
import PropTypes from 'prop-types';
import MrcNumber from '../../MrcNumber';
import MrcDate from '../../MrcDate';

import './index.scss';

export default class RecentRequestsInfo extends Component {
    render() {
        const requestResponse = this.props.recentRequests.data;
        const divClassName = this.props.isTablet ? 'recent-requests-info tablet' : 'recent-requests-info no-tablet';
        if (requestResponse && requestResponse.requests != null && requestResponse.requests.length > 0) {
            return (
                <div className={divClassName}>
                    <div className="recent-requests">{this.createRequestRows(requestResponse)}</div>
                </div>
            );
        } else {
            return <span>{lookup('history.customerNotFoundMessage')}</span>;
        }
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
        return (
            <div className="mrc-request-details-title">
                <MrcDate>{requestStatus.creationDate}</MrcDate> /{' '}
                <MrcNumber isCurrency country={country}>
                    {requestStatus.amount}
                </MrcNumber>
                {requestStatus.groupAmount > 0.0 ? (
                    <span className="mrc-position"> ({lookup('mrc.groupLimit')} </span>
                ) : null}
                {requestStatus.groupAmount > 0.0 ? (
                    <MrcNumber isCurrency country={country}>
                        {requestStatus.amount > requestStatus.groupAmount
                            ? requestStatus.amount
                            : requestStatus.groupAmount}
                    </MrcNumber>
                ) : null}
                {requestStatus.groupAmount > 0.0 ? <span className="mrc-position">)</span> : null}
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
                                <b>{this.createStatus(requestStatus, requestStatus.requestType)}</b>
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
                (requestStatus.appliedCreditProduct !== null && requestStatus.appliedCreditProduct !== '') ||
                (requestStatus.appliedCreditPeriod !== null && requestStatus.appliedCreditPeriod !== '') ||
                (requestStatus.appliedDebitType !== null && requestStatus.appliedDebitType !== '')
            ) {
                return (
                    <div className="infos">
                        {requestStatus.appliedCreditProduct != null &&
                        requestStatus.appliedCreditProduct.trim() != 'mrc.payment.'
                            ? requestStatus.appliedCreditProduct.includes('mrc.payment.')
                                ? lookup(requestStatus.appliedCreditProduct)
                                : lookup('mrc.payment.' + requestStatus.appliedCreditProduct.replace(' ', '_'))
                            : null}
                        {requestStatus.appliedCreditPeriod != null &&
                        requestStatus.appliedCreditPeriod.trim() != 'mrc.payment.'
                            ? requestStatus.appliedCreditPeriod.includes('mrc.payment.')
                                ? ', ' + lookup(requestStatus.appliedCreditPeriod)
                                : ', ' + lookup('mrc.payment.' + requestStatus.appliedCreditPeriod.replace(' ', '_'))
                            : null}
                        {requestStatus.appliedDebitType != null && requestStatus.appliedDebitType != 'mrc.payment.'
                            ? requestStatus.appliedDebitType.includes('mrc.payment.')
                                ? ', ' + lookup(requestStatus.appliedDebitType)
                                : ', ' + lookup('mrc.payment.' + requestStatus.appliedDebitType.replace(' ', '_'))
                            : null}
                    </div>
                );
            } else {
                return null;
            }
        }
    }

    createStatus(requestStatus, requestType) {
        if (requestStatus.status == 'Approved') {
            return <span className="span-success uppercase">{lookup('mrc.status.approved')}</span>;
        }
        if (requestStatus.status == 'Failed') {
            if (requestType == 'LIMIT_EXPIRY') {
                return <span className="span-error uppercase">{lookup('mrc.status.limitExpiryFailed')}</span>;
            }
            return <span className="span-error uppercase">{lookup('mrc.status.failed')}</span>;
        }
        if (requestStatus.status == 'Blocked') {
            return <span className="span-error uppercase">{lookup('mrc.status.blocked')}</span>;
        }
        if (requestStatus.status == 'Retried') {
            return <span className="retried uppercase">{lookup('mrc.status.retried')}</span>;
        }
        if (requestStatus.status == 'Claimed') {
            return <span className="claimed uppercase">{lookup('mrc.status.claimed')}</span>;
        }
        if (requestStatus.status == 'Pending') {
            return <span className="span-blue uppercase">{lookup('mrc.status.pending')}</span>;
        }
        if (requestStatus.status == 'Activated') {
            if (requestType == 'LIMIT_EXPIRY') {
                return <span className="span-success uppercase">{lookup('mrc.status.limitExpiryActivated')}</span>;
            }
            return <span className="span-success uppercase">{lookup('mrc.status.activated')}</span>;
        }
        if (requestStatus.status == 'Cancelled') {
            return <span className="span-error uppercase">{lookup('mrc.status.cancelled')}</span>;
        }
        if (requestStatus.status == 'Requested') {
            return <span className="span-blue uppercase">{lookup('mrc.status.requested')}</span>;
        }
        if (requestStatus.status == 'Sent_back') {
            return <span className="span-blue uppercase">{lookup('mrc.status.sentback')}</span>;
        }
        if (requestStatus.status == 'Provided') {
            return <span className="span-blue uppercase">{lookup('mrc.status.infoprovided')}</span>;
        }
        if (requestStatus.status == 'Rejected') {
            return <span className="span-error uppercase">{lookup('mrc.status.rejected')}</span>;
        }
        if (requestStatus.status == 'Review') {
            return <span className="span-blue uppercase">{lookup('mrc.status.review')}</span>;
        }
        if (requestStatus.status == 'Aborted') {
            return <span className="span-blue uppercase">{lookup('mrc.status.aborted')}</span>;
        }
        if (requestStatus.status == 'Review_Pending') {
            return <span className="span-blue uppercase">{lookup('mrc.status.review_pending')}</span>;
        }
        if (requestStatus.status == 'Retry_Getting_Indicators') {
            return <span className="span-error uppercase">{lookup('mrc.status.retry_getting_indicators')}</span>;
        }
        if (requestStatus.status == 'Contract_signed') {
            return <span className="span-blue uppercase">{lookup('mrc.status.contractSigned')}</span>;
        }
        if (requestStatus.status == 'Contract_validated') {
            return <span className="span-blue uppercase">{lookup('mrc.status.contractValidated')}</span>;
        }
        if (requestStatus.status == 'Changed') {
            return this.createCustomerStatusForCreditCorrection(requestStatus);
        }
        return <span></span>;
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
