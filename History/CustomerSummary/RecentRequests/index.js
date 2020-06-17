import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import RequestDetails from '../../Shared/RequestDetails';
import * as _ from 'lodash';
import { lookup } from '../../../Util/translations';

export default class RecentRequests extends Component {
    makeUrl(requestType, id) {
        switch (requestType) {
            case 'LIMIT_REQUEST':
                return '/history#/items/request/' + id;
            case 'QUICK_CHECK':
                return '/history#/items/qcr/' + id;
            case 'CONI_REQUEST':
                return '/history#/items/coni/' + id;
            case 'LIMIT_EXPIRY':
                return '/history#/items/expiry/' + id;
            case 'CREDIT_CORRECTION':
                return '/history#/items/creditcorrection/' + id;
            default:
                return '/history#/notfound';
        }
    }

    requestRows(requests, countryCode) {
        const rows = _.reduce(
            requests,
            (acc, request, id) => {
                acc.push(
                    <ul key={'recent-request-' + id}>
                        <li id={id} className="mrc-request-record">
                            <a target="_self" href={this.makeUrl(request.requestType, id)}>
                                <RequestDetails
                                    requestStatus={request.requestStatus}
                                    countryCode={countryCode}
                                    withArrow={true}
                                />
                            </a>
                        </li>
                    </ul>
                );
                return acc;
            },
            []
        );
        return rows;
    }

    render() {
        if (this.props.noHistory) {
            return <div className="mrc-alert mrc-alert--info">{lookup('history.customerNotFoundMessage')}</div>;
        }

        const requests = this.props.limitRequests;
        const countryCode = this.props.countryCode;
        if (_.isNil(requests) || _.isEmpty(requests)) {
            return null;
        }

        return (
            <div className="recent-requests">
                <p className="heading">{lookup('history.recentrequests.heading')}</p>
                {this.requestRows(requests, countryCode)}
            </div>
        );
    }
}

RecentRequests.propTypes = {
    noHistory: PropTypes.bool,
    limitRequests: PropTypes.object,
    countryCode: PropTypes.string,
};
