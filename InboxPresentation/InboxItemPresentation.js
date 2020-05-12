import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bullet, { MODE as BM } from '../Bullet';
import { lookup } from '../Util/translations';

export default class InboxItemPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    render() {
        const detailsClass = 'mrc-inbox-details collapsed';
        const onClickFn =
            this.props.entry.type === 'LIMIT_EXPIRY_REMINDER' ||
            this.props.entry.type === 'LIMIT_EXPIRY_ACTIVATION' ||
            this.props.topic === 'ATTACHMENT_EXPIRY_NOTIFICATION'
                ? event => this.props.openDetailsOnNewTab(event, this.props.markAsReadURI, this.props.detailsURI)
                : event => this.props.navigateToDetails(event, this.props.markAsReadURI, this.props.detailsURI);
        return (
            <div className="item-content-wrapper">
                <a
                    href={this.props.detailsURI}
                    className="no-underline mrc-inbox-header detailsLink no-color"
                    onClick={onClickFn}
                >
                    <span className={detailsClass}>
                        {this.createBullet()}
                        <ul className="inbox-item-detail-text">
                            {this.createDateAndTypeLine()}
                            {this.createHeader()}
                            <li>{this.details()}</li>
                        </ul>
                    </span>
                </a>
                {this.createConfirmationButton()}
            </div>
        );
    }

    createHeader() {
        return (
            <li className="span-blue">
                {this.createTitleLine()}
                {this.createDetailsArrowDown()}
            </li>
        );
    }

    createDateAndTypeLine() {
        if (this.props.topic === 'APPROVAL_STEP_READY') {
            if (
                this.props.entry.autoDecision !== undefined &&
                this.props.entry.autoDecision !== null &&
                this.props.entry.autoDecision === 'REJECT'
            ) {
                return (
                    <li>
                        <p>
                            <mrc-date>{this.props.entry.creationDate}</mrc-date>,&nbsp;
                            <span>
                                {lookup('inbox.auto.reject')}&nbsp;
                                {this.getPositionText(this.props.entry)}
                                <mrc-number show-currency-for-country={this.props.entry.country}>
                                    {this.props.entry.approvedLimit !== undefined &&
                                    this.props.entry.approvedLimit != null
                                        ? this.props.entry.approvedLimit
                                        : this.props.entry.amount}
                                </mrc-number>
                                &nbsp;{this.groupLimit()}
                            </span>
                        </p>
                    </li>
                );
            } else if (
                this.props.entry.autoDecision !== undefined &&
                this.props.entry.autoDecision !== null &&
                this.props.entry.autoDecision === 'BLOCKED'
            ) {
                return (
                    <li>
                        <p>
                            <mrc-date>{this.props.entry.creationDate}</mrc-date>,&nbsp;
                            <span>
                                {lookup('inbox.auto.blocked')}&nbsp;
                                {this.getPositionText(this.props.entry)}
                                <mrc-number show-currency-for-country={this.props.entry.country}>
                                    {this.props.entry.approvedLimit !== undefined &&
                                    this.props.entry.approvedLimit != null
                                        ? this.props.entry.approvedLimit
                                        : this.props.entry.amount}
                                </mrc-number>
                                &nbsp;{this.groupLimit()}
                            </span>
                        </p>
                    </li>
                );
            } else {
                return (
                    <li>
                        <p>
                            <mrc-date>{this.props.entry.creationDate}</mrc-date>,&nbsp;
                            <span>
                                {this.props.title}&nbsp;
                                <mrc-number show-currency-for-country={this.props.entry.country}>
                                    {this.props.entry.approvedLimit !== undefined &&
                                    this.props.entry.approvedLimit != null
                                        ? this.props.entry.approvedLimit
                                        : this.props.entry.amount}
                                </mrc-number>
                                &nbsp;{this.groupLimit()}
                            </span>
                        </p>
                    </li>
                );
            }
        }
        if (this.props.topic === 'QCR_NOTIFICATION') {
            return <p>{this.createByStatus()}</p>;
        }
        if (this.props.topic === 'LIMIT_EXPIRY_NOTIFICATION') {
            return <p>{this.createdByType()}</p>;
        }
        if (this.props.topic === 'ATTACHMENT_EXPIRY_NOTIFICATION') {
            return (
                <p>
                    <span className="mrc-inbox-header-title">
                        <mrc-date>{this.props.entry.issueDate}</mrc-date>, {lookup('inbox.attachmentexpiry.on')}{' '}
                        <mrc-date>{this.props.entry.expiryDate}</mrc-date>
                    </span>
                </p>
            );
        }
        if (this.props.topic === 'REVIEW_NOTIFICATION' && this.props.timeoutAt !== undefined) {
            return (
                <li>
                    <p>
                        <mrc-date>{this.props.entry.creationDate}</mrc-date>,&nbsp;
                        <span>{this.props.title}</span> <mrc-datetime>{this.props.timeoutAt}</mrc-datetime>
                    </p>
                </li>
            );
        }
        if (this.props.topic === 'CONTRACT_SIGNING_REQUESTED' || this.props.topic === 'CONTRACT_VALIDATION_REQUESTED') {
            return (
                <li>
                    <p>
                        <mrc-date>{this.props.entry.creationDate}</mrc-date>,&nbsp;<span>{this.props.title}</span>
                    </p>
                </li>
            );
        }
        return (
            <li>
                <p>
                    <mrc-date>{this.props.entry.creationDate}</mrc-date>,&nbsp;<span>{this.props.title}</span>
                </p>
            </li>
        );
    }

    getPositionText(entry) {
        if (entry && entry !== null && entry.position && entry.position !== null && entry.position !== '') {
            return '(' + this.props.entry.position + ') ';
        }
        return null;
    }

    groupLimit() {
        if (this.props.entry.groupAmount && this.props.entry.groupSize > 1) {
            return (
                <span>
                    ({lookup('mrc.groupLimit')}{' '}
                    <mrc-number show-currency-for-country={this.props.entry.country}>
                        {this.props.entry.groupAmount}
                    </mrc-number>
                    ){' '}
                </span>
            );
        }
        return '';
    }

    createDetailsArrowDown() {
        if (this.props.detailsURI) {
            return <span className="mrc-icon chevron-down" />;
        }
    }

    createConfirmationButton() {
        if (this.props.confirmationURI) {
            return (
                <span className="mrc-inbox-header-expand-collapse">
                    <button
                        className="mrc-secondary-button"
                        onClick={() => this.props.confirmNotification(this.props.confirmationURI)}
                    >
                        {lookup('inbox.action.confirm')}
                    </button>
                </span>
            );
        }
    }

    createBullet() {
        const bulletmode = this.props.entry.assignedUserName ? BM.CLAIMED : this.props.isNew ? BM.NEW : BM.READ;
        return <Bullet mode={bulletmode} />;
    }

    createTitleLine() {
        if (this.props.entry.type === 'LIMIT_EXPIRY_REMINDER' || this.props.entry.type === 'LIMIT_EXPIRY_ACTIVATION') {
            return (
                <span className="mrc-inbox-header-title">
                    <p>
                        <span>{lookup('inbox.limitexpiry.storeNumber')}</span>&nbsp;
                        {this.props.entry.customerStoreNumber}
                    </p>
                </span>
            );
        }
        if (this.props.topic === 'ATTACHMENT_EXPIRY_NOTIFICATION') {
            return (
                <span className="mrc-inbox-header-title">
                    <p>
                        <span>{lookup('inbox.attachmentexpiry.report')}</span>
                    </p>
                </span>
            );
        }
        return (
            <span className="mrc-inbox-header-title">
                <p>
                    {this.props.entry.customerStoreNumber}/{this.props.entry.customerNumber}
                    <span>,</span>&nbsp;{this.props.entry.customerName}
                </p>
            </span>
        );
    }

    createByStatus() {
        if (this.props.result === 'inbox.approval.qcr.approved') {
            return (
                <span className="mrc-inbox-header-title">
                    <mrc-date>{this.props.creationDate}</mrc-date>, {this.props.title}{' '}
                    <span className="span-success uppercase">{lookup(this.props.result)}</span>
                    <span> {lookup('mrc.status.by')} MRC System</span>
                </span>
            );
        }
        if (this.props.result === 'inbox.approval.qcr.rejected') {
            return (
                <span className="mrc-inbox-header-title">
                    <mrc-date>{this.props.creationDate}</mrc-date>, {this.props.title}{' '}
                    <span className="span-error uppercase">{lookup(this.props.result)}</span>
                    <span> {lookup('mrc.status.by')} MRC System</span>
                </span>
            );
        }
        return (
            <span className="mrc-inbox-header-title">
                <mrc-date>{this.props.creationDate}</mrc-date>, {this.props.title}{' '}
                <span className="span-blue uppercase">{lookup('inbox.approval.qcr.aborted')}</span>
                <span> {lookup('mrc.status.by')} MRC System</span>
            </span>
        );
    }

    createdByType() {
        if (this.props.entry.type === 'LIMIT_EXPIRY_REMINDER') {
            const transKey = 'inbox.limitexpiry.in.' + this.props.entry.reminderDays;
            return (
                <span className="mrc-inbox-header-title">
                    <mrc-date>{this.props.entry.issueDate}</mrc-date>, {lookup(transKey)}
                </span>
            );
        }
        if (this.props.entry.type === 'LIMIT_EXPIRY_ACTIVATION') {
            return (
                <span className="mrc-inbox-header-title">
                    <mrc-date>{this.props.entry.issueDate}</mrc-date>, {lookup('inbox.limitexpiry.expiration.reset')}
                </span>
            );
        }
        return null;
    }

    details = () => {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                collapsed: this.state.collapsed,
            });
        });
    };
}

InboxItemPresentation.propTypes = {
    creationDate: PropTypes.string.isRequired,
    title: PropTypes.string,
    detailsURI: PropTypes.string,
    markAsReadURI: PropTypes.string,
    isNew: PropTypes.bool,
    confirmNotification: PropTypes.func,
    navigateToDetails: PropTypes.func,
    openDetailsOnNewTab: PropTypes.func,
    confirmationURI: PropTypes.string,
    children: PropTypes.object,
    timeoutAt: PropTypes.string,
    topic: PropTypes.string,
    autoDecision: PropTypes.string,
    result: PropTypes.string,
    entry: PropTypes.object,
};
