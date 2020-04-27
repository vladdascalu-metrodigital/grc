import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import InboxItemPresentation from './InboxItemPresentation';
import ApprovalInboxItemPresentation from './ApprovalInboxItemPresentation';
import NotificationInboxItemPresentation from './NotificationInboxItemPresentation';
import ReviewInboxItemPresentation from './ReviewInboxItemPresentation';
import QcrInboxItemPresentation from './QcrInboxItemPresentation';
import { lookup } from '../Util/translations';

import InboxFilterPanel from '../InboxFilterPanel';

export default class InboxPresentation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const inbox = this.props.data || [];
        return (
            <div className="mrc-inbox">
                {this.renderFilter()}

                <div className="mrc-tab list-header">
                    <h4 className="span-metro-blue uppercase">
                        {inbox.length} {lookup('inbox.numberOfItems')}
                    </h4>
                </div>

                {inbox.map(this.renderInboxEntry)}
            </div>
        );
    }

    renderFilter = () => {
        if (this.props.filterAvailable !== undefined && this.props.filterAvailable)
            return (
                <div>
                    <InboxFilterPanel chosenFilter={this.props.currentFilterValue()} onChange={this.props.onFilterChanged} />
                </div>
            );
    };

    renderInboxEntry = (entry) => {
        return (
            <div key={entry.id} id={entry.id} className="mrc-detail clickable">
                <InboxItemPresentation
                    creationDate={entry.creationDate}
                    title={this.titleUpdate(entry)}
                    detailsURI={entry.detailsURI}
                    isNew={entry.new}
                    confirmationURI={entry.confirmationURI}
                    markAsReadURI={entry.markAsReadURI}
                    confirmNotification={this.props.confirmNotification}
                    navigateToDetails={this.props.navigateToDetails}
                    openDetailsOnNewTab={this.props.openDetailsOnNewTab}
                    timeoutAt={entry.timeoutAt}
                    topic={entry.topic}
                    result={entry.result}
                    autoDecision={entry.autoDecision}
                    entry={entry}
                >
                    {this.dispatchType(entry)}
                </InboxItemPresentation>
                <div className="mrc-icon chevron-down" />
            </div>
        );
    };

    titleUpdate = (entry) => {
        let title =
            entry.translateKey !== null && entry.translateKey !== '' ? lookup(entry.translateKey) : lookup(entry.title);
        if (entry.position && entry.position !== null && entry.position !== '') {
            title += ' (' + entry.position + ')';
        }
        return title;
    };

    dispatchType = (entry) => {
        switch (entry.topic) {
            case 'APPROVAL_STEP_READY':
                return <ApprovalInboxItemPresentation isTablet={this.props.isTablet} entry={entry} />;
            case 'GENERAL_NOTIFICATION':
                return (
                    <NotificationInboxItemPresentation
                        isTablet={this.props.isTablet}
                        entry={entry}
                        confirmNotification={this.props.confirmNotification}
                    />
                );
            case 'REVIEW_NOTIFICATION':
                return <ReviewInboxItemPresentation isTablet={this.props.isTablet} entry={entry} />;
            case 'QCR_NOTIFICATION':
                return <QcrInboxItemPresentation isTablet={this.props.isTablet} entry={entry} />;
            case 'CONTRACT_SIGNING_REQUESTED':
                return <ReviewInboxItemPresentation isTablet={this.props.isTablet} entry={entry} />;
            case 'CONTRACT_VALIDATION_REQUESTED':
                return <ReviewInboxItemPresentation isTablet={this.props.isTablet} entry={entry} />;
        }
    };
}

InboxPresentation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            detailsURI: PropTypes.string,
            confirmationURI: PropTypes.string,
            autoDecision: PropTypes.string,
            topic: PropTypes.topic,
        })
    ),
    filterAvailable: PropTypes.any,
    isTablet: PropTypes.bool,
    confirmNotification: PropTypes.func,
    myInitiatedRequests: PropTypes.func,
    storeCustomersRequests: PropTypes.func,
    ownStoreInitiatedRequests: PropTypes.func,
    navigateToDetails: PropTypes.func,
    openDetailsOnNewTab: PropTypes.func,
    onFilterChanged: PropTypes.func,
    currentFilterValue: PropTypes.func,
};
