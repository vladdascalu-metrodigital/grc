import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import ArrowRight from '../icons/arrow-right-12.svg';
import MrcDate from '../MrcDate';
import { createIssueAndRequestDate } from './util';

export default class ApprovalInboxItemPresentation extends Component {
    render() {
        const entry = this.props.entry || {};
        return this.props.collapsed ? this.renderCollapsed(entry) : this.renderFull(entry);
    }

    renderCollapsed = (entry) => {
        return (
            <span>
                {createIssueAndRequestDate(entry)}
                {entry.assignedUserName != null ? (
                    <p>
                        <label>{lookup('inbox.assignedUserName')}:&nbsp;</label>
                        {entry.assignedUserName}
                    </p>
                ) : null}
            </span>
        );
    };

    renderFull = (entry) => {
        return (
            <div className="approval expanded">
                <span className="approvalData">
                    <div className="customerNameAndNumber">
                        <span className="customerNumber">
                            {entry.customerStoreNumber}/{entry.customerNumber}
                        </span>
                        <span className="customerName">{entry.customerName}&nbsp;</span>
                    </div>
                    <span className="currentLimit">
                        <label>{lookup('inbox.currentLimit')}:</label>
                        <span>{entry.currentLimit}</span>
                    </span>
                    <span className="amount">
                        <label>{lookup('inbox.requestedLimit')}:</label>
                        <span>{entry.amount}</span>
                    </span>
                    <span className="requestDate">
                        <label>{lookup('inbox.requestDate')}:</label>
                        <MrcDate>{entry.requestDate}</MrcDate>
                    </span>
                    <span className="approvedLimit">
                        <label>{lookup('inbox.approvedLimit')}:</label>
                        <span>{entry.approvedLimit}</span>
                    </span>
                </span>

                <span className="detailsLink">
                    <a className="no-underline" href={entry.detailsURI}>
                        {' '}
                        <img width="20px" height="32px" src={ArrowRight} />{' '}
                    </a>
                </span>
            </div>
        );
    };
}

ApprovalInboxItemPresentation.propTypes = {
    collapsed: PropTypes.bool,
    entry: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        customerName: PropTypes.string,
        requestDate: PropTypes.string,
        detailsURI: PropTypes.string,
        assignedUserName: PropTypes.string,
    }),
    isTablet: PropTypes.bool,
};
