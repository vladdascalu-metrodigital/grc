import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import InboxItemPresentation from './InboxItemPresentation';
import ApprovalInboxItemPresentation from './ApprovalInboxItemPresentation';
import NotificationInboxItemPresentation from './NotificationInboxItemPresentation';
import ReviewInboxItemPresentation from './ReviewInboxItemPresentation';
import QcrInboxItemPresentation from './QcrInboxItemPresentation';
import { lookup, numberDependentLookup } from '../Util/translations';

import InboxFilterPanel from '../InboxFilterPanel';

export default class InboxPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {},
        };
        this.props.fetchInboxItems({});
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onConfirmItem = this.onConfirmItem.bind(this);
    }

    render() {
        const data = this.props.data || undefined;
        const inbox = data && data.inboxUIItems ? data.inboxUIItems : [];
        const availableFilterOptions = {
            assignedUserNames: data && data.assignedUserNames ? data.assignedUserNames : [],
            positions: data && data.positions ? data.positions : [],
        };
        const renderInboxItems = (inbox) => {
            if (!inbox || !inbox.length) {
                return null;
            }
            return <div className="mrc-inbox-items">{inbox.map(this.renderInboxEntry)}</div>;
        };
        return (
            <div className="mrc-inbox">
                {this.renderFilter(availableFilterOptions)}

                <div className="mrc-tab list-header">
                    <h4 className="span-metro-blue uppercase">
                        {inbox.length} {numberDependentLookup(inbox.length, 'inbox.numberOfItem')}
                    </h4>
                </div>
                {renderInboxItems(inbox)}
            </div>
        );
    }

    onFilterChange = (filter) => {
        this.setState({
            filter: filter,
        });
        this.props.fetchInboxItems(filter);
    };

    onConfirmItem = (uri) => {
        this.props.confirmNotification(uri, this.state.filter);
    };

    renderFilter = (availableFilterOptions) => {
        return (
            <InboxFilterPanel
                filterAvailable={this.props.filterAvailable}
                availableFilterOptions={availableFilterOptions}
                onChange={this.onFilterChange}
                setChosenFilter={this.props.setChosenFilter}
                getChosenFilter={this.props.getChosenFilter}
                getAvailableSortingOptions={this.props.getAvailableSortingOptions}
                setChosenSortOption={this.props.setChosenSortOption}
                getChosenSortOption={this.props.getChosenSortOption}
            />
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
                    confirmNotification={this.onConfirmItem}
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
                        confirmNotification={this.onConfirmItem}
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
    fetchInboxItems: PropTypes.func,
    getChosenFilter: PropTypes.func,
    setChosenFilter: PropTypes.func,
    getAvailableSortingOptions: PropTypes.func,
    setChosenSortOption: PropTypes.func,
    getChosenSortOption: PropTypes.func,
    data: PropTypes.shape({
        assignedUserNames: PropTypes.arrayOf(PropTypes.string),
        positions: PropTypes.arrayOf(PropTypes.string),
        totalElements: PropTypes.number,
        inboxUIItems: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                detailsURI: PropTypes.string,
                confirmationURI: PropTypes.string,
                autoDecision: PropTypes.string,
                topic: PropTypes.topic,
            })
        ),
    }),
    filterAvailable: PropTypes.any,
    isTablet: PropTypes.bool,
    confirmNotification: PropTypes.func,
    myInitiatedRequests: PropTypes.func,
    storeCustomersRequests: PropTypes.func,
    ownStoreInitiatedRequests: PropTypes.func,
    navigateToDetails: PropTypes.func,
    openDetailsOnNewTab: PropTypes.func,
};
