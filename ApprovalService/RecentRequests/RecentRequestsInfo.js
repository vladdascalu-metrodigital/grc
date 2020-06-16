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
                    <mrc-date>{requestStatus.creationDate}</mrc-date> / {lookup('history.status.item.from')}{' '}
                    <mrc-number show-currency-for-country={country}>{requestStatus.amount}</mrc-number>{' '}
                    {lookup('history.status.item.to')}{' '}
                    <mrc-number show-currency-for-country={country}>{requestStatus.amountBeforeExpiry}</mrc-number>
                </div>
            );
        }
        return (
            <div className="mrc-request-details-title">
                <mrc-date>{requestStatus.creationDate}</mrc-date> /{' '}
                <mrc-number show-currency-for-country={country}>{requestStatus.amount}</mrc-number>
                {requestStatus.groupAmount > 0.0 ? (
                    <span className="mrc-position"> ({lookup('mrc.groupLimit')} </span>
                ) : null}
                {requestStatus.groupAmount > 0.0 ? (
                    <mrc-number show-currency-for-country={country}>
                        {requestStatus.amount > requestStatus.groupAmount
                            ? requestStatus.amount
                            : requestStatus.groupAmount}
                    </mrc-number>
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
                                <b>{this.createStatus(requestStatus.status, requestStatus.requestType)}</b>
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
                                <b>{this.createStatus(requestStatus.status)}</b>
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
                    <mrc-date>{requestStatus.creationDate}</mrc-date>,{' '}
                    <span>{lookup('mrc.requesttype.quickcheck')}</span>
                </div>
                <div className="mrc-request-details-arrow-right-container">
                    <img src={ArrowRightIcon} alt="Details"></img>
                </div>
                <div className="mrc-request-details-credit-data">
                    <div>
                        {requestStatus.status != null ? (
                            <p>
                                <span className={requestStatus.status}>
                                    <b>{this.createStatus(requestStatus.status)}</b>
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

    createStatus(status, requestType) {
        if (status == 'Approved') {
            return <span className="span-success uppercase">{lookup('mrc.status.approved')}</span>;
        }
        if (status == 'Failed') {
            if (requestType == 'LIMIT_EXPIRY') {
                return <span className="span-error uppercase">{lookup('mrc.status.limitExpiryFailed')}</span>;
            }
            return <span className="span-error uppercase">{lookup('mrc.status.failed')}</span>;
        }
        if (status == 'Blocked') {
            return <span className="span-error uppercase">{lookup('mrc.status.blocked')}</span>;
        }
        if (status == 'Retried') {
            return <span className="retried uppercase">{lookup('mrc.status.retried')}</span>;
        }
        if (status == 'Claimed') {
            return <span className="claimed uppercase">{lookup('mrc.status.claimed')}</span>;
        }
        if (status == 'Pending') {
            return <span className="span-blue uppercase">{lookup('mrc.status.pending')}</span>;
        }
        if (status == 'Activated') {
            if (requestType == 'LIMIT_EXPIRY') {
                return <span className="span-success uppercase">{lookup('mrc.status.limitExpiryActivated')}</span>;
            }
            return <span className="span-success uppercase">{lookup('mrc.status.activated')}</span>;
        }
        if (status == 'Cancelled') {
            return <span className="span-error uppercase">{lookup('mrc.status.cancelled')}</span>;
        }
        if (status == 'Requested') {
            return <span className="span-blue uppercase">{lookup('mrc.status.requested')}</span>;
        }
        if (status == 'Sent_back') {
            return <span className="span-blue uppercase">{lookup('mrc.status.sentback')}</span>;
        }
        if (status == 'Provided') {
            return <span className="span-blue uppercase">{lookup('mrc.status.infoprovided')}</span>;
        }
        if (status == 'Rejected') {
            return <span className="span-error uppercase">{lookup('mrc.status.rejected')}</span>;
        }
        if (status == 'Review') {
            return <span className="span-blue uppercase">{lookup('mrc.status.review')}</span>;
        }
        if (status == 'Aborted') {
            return <span className="span-blue uppercase">{lookup('mrc.status.aborted')}</span>;
        }
        if (status == 'Review_Pending') {
            return <span className="span-blue uppercase">{lookup('mrc.status.review_pending')}</span>;
        }
        if (status == 'Retry_Getting_Indicators') {
            return <span className="span-error uppercase">{lookup('mrc.status.retry_getting_indicators')}</span>;
        }
        if (status == 'Contract_signed') {
            return <span className="span-blue uppercase">{lookup('mrc.status.contractSigned')}</span>;
        }
        if (status == 'Contract_validated') {
            return <span className="span-blue uppercase">{lookup('mrc.status.contractValidated')}</span>;
        }
        return <span></span>;
    }
}

RecentRequestsInfo.propTypes = {
    recentRequests: PropTypes.object.isRequired,
    isTablet: PropTypes.bool,
};
