import React, { Component } from 'react';
import TrafficLight from './TrafficLight';
import { lookup } from '../../../Util/translations';
import ArrowRightIcon from '../../../icons/arrow-right.svg';
import * as _ from 'lodash';

export default class RequestDetails extends Component {
    title(requestStatus, country) {
        if (requestStatus.requestType === 'LIMIT_EXPIRY') {
            return (
                <div className="mrc-request-details-title">
                    <mrc-date>{requestStatus.creationDate}</mrc-date> &nbsp;
                    {lookup('history.status.item.from')} &nbsp;
                    <mrc-number show-currency-for-country={country}>{requestStatus.amountBeforeExpiry}</mrc-number>{' '}
                    &nbsp;
                    {lookup('history.status.item.to')} &nbsp;
                    <mrc-number show-currency-for-country={country}>{requestStatus.amount}</mrc-number>
                </div>
            );
        } else if (requestStatus.requestType === 'QUICK_CHECK') {
            return (
                <div className="mrc-request-details-title">
                    <mrc-date>{requestStatus.creationDate}</mrc-date>
                    &nbsp;/&nbsp;
                    <span>{lookup('mrc.requesttype.quickcheck')}</span>
                </div>
            );
        } else {
            const shouldRenderGroupLimit = requestStatus.groupMembers > 1 && requestStatus.groupAmount >= 0.0;
            return (
                <div className="mrc-request-details-title">
                    <mrc-date>{requestStatus.creationDate}</mrc-date>
                    &nbsp;
                    <span>{lookup(requestStatus.applied ? 'mrc.label.appliedLimit' : 'mrc.label.requestedLimit')}</span>
                    &nbsp;
                    <mrc-number show-currency-for-country={country}>{requestStatus.amount}</mrc-number>
                    {shouldRenderGroupLimit ? (
                        <span className="mrc-position"> ({lookup('mrc.groupLimit')} </span>
                    ) : null}
                    {shouldRenderGroupLimit ? (
                        <mrc-number show-currency-for-country={country}>
                            {requestStatus.amount > requestStatus.groupAmount
                                ? requestStatus.amount
                                : requestStatus.groupAmount}
                        </mrc-number>
                    ) : null}
                    {shouldRenderGroupLimit ? <span className="mrc-position">)</span> : null}
                </div>
            );
        }
    }

    requestStatus(requestStatus) {
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

    creditData(requestStatus) {
        if (requestStatus.requestType == 'LIMIT_EXPIRY') {
            return <div>{lookup('history.status.item.limitIsExpired')}</div>;
        } else {
            if (
                _.some(requestStatus.creditProduct) ||
                _.some(requestStatus.creditPeriod) ||
                _.some(requestStatus.debitType)
            ) {
                const someAppliedCreditProduct =
                    requestStatus.creditProduct && requestStatus.creditProduct.trim() != 'mrc.payment.';
                const someAppliedCreditPeriod =
                    requestStatus.creditPeriod != null && requestStatus.creditPeriod.trim() != 'mrc.payment.';
                const someAppliedDebitType =
                    requestStatus.debitType != null && requestStatus.debitType != 'mrc.payment.';
                return (
                    <div className="infos">
                        {someAppliedCreditProduct
                            ? requestStatus.creditProduct.includes('mrc.payment.')
                                ? lookup(requestStatus.creditProduct)
                                : lookup('mrc.payment.' + requestStatus.creditProduct.replace(' ', '_'))
                            : null}
                        {someAppliedCreditPeriod
                            ? requestStatus.creditPeriod.includes('mrc.payment.')
                                ? ', ' + lookup(requestStatus.creditPeriod)
                                : ', ' + lookup('mrc.payment.' + requestStatus.creditPeriod.replace(' ', '_'))
                            : null}
                        {someAppliedDebitType
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

    createStatus(requestStatus, requestType) {
        if (requestType === 'LIMIT_EXPIRY' && requestStatus.status === 'Failed') {
            return <span className="span-error uppercase">{lookup('mrc.status.limitExpiryFailed')}</span>;
        }

        if (requestType === 'LIMIT_EXPIRY' && requestStatus.status === 'Activated') {
            return <span className="span-success uppercase">{lookup('mrc.status.limitExpiryActivated')}</span>;
        }
        switch (requestStatus.status) {
            case 'Failed':
                return <span className="span-error uppercase">{lookup('mrc.status.failed')}</span>;
            case 'Activated':
                return <span className="span-success uppercase">{lookup('mrc.status.activated')}</span>;
            case 'Approved':
                return <span className="span-success uppercase">{lookup('mrc.status.approved')}</span>;
            case 'Contract_signed':
                return <span className="span-blue uppercase">{lookup('mrc.status.contractSigned')}</span>;
            case 'Contract_validated':
                return <span className="span-blue uppercase">{lookup('mrc.status.contractValidated')}</span>;
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

    requestDetails(requestStatus, country, withArrow) {
        return (
            <div className="mrc-request-details">
                <TrafficLight requestStatus={requestStatus} />
                {this.title(requestStatus, country)}
                {withArrow ? (
                    <div className="mrc-request-details-arrow-right-container">
                        <img src={ArrowRightIcon} alt="Details"></img>
                    </div>
                ) : null}
                <div className="mrc-request-details-credit-data">
                    {this.creditData(requestStatus)}
                    {this.requestStatus(requestStatus)}
                </div>
            </div>
        );
    }

    quickCheckDetails(requestStatus, withArrow) {
        return (
            <div className="mrc-request-details">
                <TrafficLight requestStatus={requestStatus} />
                <div className="mrc-request-details-title">
                    <mrc-date>{requestStatus.creationDate}</mrc-date>{' '}
                    <span>{lookup('mrc.requesttype.quickcheck')}</span>
                </div>
                {withArrow ? (
                    <div className="mrc-request-details-arrow-right-container">
                        <img src={ArrowRightIcon} alt="Details"></img>
                    </div>
                ) : null}
                <div className="mrc-request-details-credit-data">
                    <div>
                        {requestStatus.status ? (
                            <p>
                                <span className={requestStatus.status}>
                                    <b>{this.createStatus(requestStatus)}</b>
                                    {requestStatus.status !== 'Aborted' ? (
                                        <span className="mrc-position"> {lookup('mrc.status.by')}</span>
                                    ) : null}
                                    {requestStatus.status !== 'Aborted' ? (
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

    render() {
        const requestStatus = this.props.requestStatus;
        const withArrow = this.props.withArrow;
        const countryCode = this.props.countryCode;
        if (!requestStatus) {
            return null;
        } else if (requestStatus.requestType === 'QUICK_CHECK') {
            return this.quickCheckDetails(requestStatus, withArrow);
        } else {
            return this.requestDetails(requestStatus, countryCode, withArrow);
        }
    }
}
