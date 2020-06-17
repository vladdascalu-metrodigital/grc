import './index.scss';
import React, { Component } from 'react';
import HistoryStatusBar from '../Shared/HistoryStatusBar';
import InfoRow from './InfoRow';
import '../../tabs.scss';
import RecentRequests from './RecentRequests';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

export default class CustomerSummaryPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const customerName = _.get(this.props, 'customerInfo.name');
        const noHistory = this.props.noHistory;
        return (
            <div className="mrc-main">
                <div className="customer-info">
                    {noHistory ? null : (
                        <HistoryStatusBar statusBar={this.props.statusBar} countryCode={this.props.countryCode} />
                    )}
                    {noHistory ? null : <InfoRow data={customerName} />}
                </div>
                <div className="mrc-requests">
                    <RecentRequests
                        noHistory={noHistory}
                        limitRequests={this.props.limitRequests}
                        countryCode={this.props.countryCode}
                    />
                </div>
            </div>
        );
    }
}

CustomerSummaryPresentation.propTypes = {
    noHistory: PropTypes.bool,
    customerInfo: PropTypes.object,
    limitRequests: PropTypes.object,
    statusBar: PropTypes.object,
    countryCode: PropTypes.string,
};
