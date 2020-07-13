import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { lookup } from '../../../Util/translations.js';

import StatusBar from '../../../StatusBar';
import ReportProblemTriangle from '../../../icons/report-problem-triangle.svg';
import CoinReceive from '../../../icons/coin-receive.svg';
import MrcNumber from '../../../MrcNumber';

export default class HistoryStatusBar extends Component {
    actionToTranslationKey = {
        RETRY_GETTING_INDICATORS: 'mrc.status.retry_getting_indicators',
        RELEASED: 'mrc.status.released',
        PENDING: 'mrc.status.pending',
        CLAIMED: 'mrc.status.claimed',
        REQUESTED: 'mrc.status.requested',
        FAILED: 'mrc.status.failed',
        ACTIVATED: 'mrc.status.activated',
        RETRIED: 'mrc.status.retried',
        APPROVED: 'mrc.status.approved',
        BLOCKED: 'mrc.status.blocked',
        CANCELLED: 'mrc.status.cancelled',
        SENT_BACK: 'mrc.status.sentback',
        WAITING_FOR_INFO: 'mrc.status.waitingforinfo',
        INFO_PROVIDED: 'mrc.status.infoprovided',
        PROVIDED: 'mrc.status.provided',
        REJECTED: 'mrc.status.rejected',
        MANUAL: 'mrc.status.manual',
        REVIEW: 'mrc.status.review',
        REVIEW_PENDING: 'mrc.status.review_pending',
        CHANGED: 'mrc.status.changed',
        ABORTED: 'mrc.status.aborted',
    };

    render() {
        const countryCode = this.props.countryCode || '';
        const text = _.get(this.props, 'statusBar.text');
        const amount = _.get(this.props, 'statusBar.limit');
        const color = _.get(this.props, 'statusBar.color');
        const parameters = _.get(this.props, 'statusBar.parameters');

        const makeDisplayText = (text) => {
            const actionKey = this.actionToTranslationKey[text.toUpperCase()];
            const withHistoryPrefix = 'history.' + text;
            const translation = lookup(withHistoryPrefix);

            if (actionKey) {
                return lookup(actionKey);
            } else if (!_.isEmpty(parameters)) {
                return _.replace(translation, /\{(.*)\}/, parameters[0]);
            } else if (translation !== withHistoryPrefix) {
                return translation;
            } else {
                return text;
            }
        };

        let content;
        if (color === 'green' && amount) {
            content = (
                <StatusBar
                    message={
                        <span>
                            {makeDisplayText(text)}{' '}
                            <MrcNumber isCurrency country={countryCode}>
                                {amount}
                            </MrcNumber>
                        </span>
                    }
                    icon={CoinReceive}
                />
            );
        } else if (color == 'red') {
            content = <StatusBar message={makeDisplayText(text)} isWarning={true} icon={ReportProblemTriangle} />;
        } else {
            content = null;
        }
        return <div className="status-bar">{content}</div>;
    }
}

HistoryStatusBar.propTypes = {
    countryCode: PropTypes.string,
    statusBar: PropTypes.shape({
        text: PropTypes.string,
        amount: PropTypes.number,
        color: PropTypes.string,
    }),
};
