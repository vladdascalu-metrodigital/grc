import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import MrcDate from '../MrcDate';
import { createIssueAndRequestDate } from './util';

export default class NotificationInboxItemPresentation extends Component {
    render() {
        const entry = this.props.entry || {};
        // if collapsed, don't render anything;
        if (this.props.collapsed) {
            if (entry.customerNumber != null && entry.customerStoreNumber != null)
                return createIssueAndRequestDate(entry);
            else {
                return null;
            }
        }

        return (
            <div>
                <div>
                    <label>{lookup('inbox.notification.issueDate')}:</label> <MrcDate>{entry.issueDate}</MrcDate>
                </div>
                <div>
                    <label>{lookup('inbox.notification.message')}:</label> <span>{lookup(entry.message)}</span>
                </div>
                <a className="no-underline" href={entry.detailsURI}>
                    Details
                </a>
                <button onClick={() => this.props.confirmNotification(entry.confirmationURI)}>
                    {lookup('inbox.action.confirm')}
                </button>
            </div>
        );
    }
}

NotificationInboxItemPresentation.propTypes = {
    collapsed: PropTypes.bool,
    entry: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.date,
        customerName: PropTypes.string,
        requestDate: PropTypes.string,
        detailsURI: PropTypes.string,
        confirmationURI: PropTypes.string,
        customerNumber: PropTypes.string,
        autoDecision: PropTypes.string,
        customerStoreNumber: PropTypes.string,
    }),
    confirmNotification: PropTypes.func,
    isTablet: PropTypes.bool,
};
