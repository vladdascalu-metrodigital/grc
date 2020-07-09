import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import MrcDate from '../MrcDate';

export default class QcrInboxItemPresentation extends Component {
    render() {
        const entry = this.props.entry || {};
        // if collapsed, don't render anything;
        if (this.props.collapsed) {
            if (entry.customerNumber != null && entry.customerStoreNumber != null)
                return (
                    <div>
                        <div>
                            <p>
                                <label>{lookup('inbox.requestDate')}:&nbsp;</label>
                                <MrcDate>{entry.requestDate ? entry.requestDate : entry.issueDate}</MrcDate>
                            </p>
                        </div>
                    </div>
                );
            else {
                return null;
            }
        }

        return (
            <div>
                <div>
                    <label>{lookup('inbox.notification.issueDate')}:</label>
                    <MrcDate>{entry.issueDate}</MrcDate>
                </div>
                <div>
                    <label>{lookup('inbox.notification.message')}:</label> <span>{lookup(entry.message)}</span>
                </div>
                <a className="no-underline" href={entry.detailsURI}>
                    Details
                </a>
            </div>
        );
    }
}

QcrInboxItemPresentation.propTypes = {
    collapsed: PropTypes.bool,
    entry: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.date,
        customerName: PropTypes.string,
        requestDate: PropTypes.string,
        detailsURI: PropTypes.string,
        confirmationURI: PropTypes.string,
        customerNumber: PropTypes.string,
        customerStoreNumber: PropTypes.string,
        limit: PropTypes.number,
        result: PropTypes.string,
    }),
    isTablet: PropTypes.bool,
};
