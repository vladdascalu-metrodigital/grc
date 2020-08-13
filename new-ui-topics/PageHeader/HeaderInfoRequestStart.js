import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MrcDate from '../../MrcDate';
import { COLOR as IC, SIZE as IS } from '../../icons/index';
import RocketIcon from '../../icons/RocketIcon';

import './HeaderInfoRequestStart.scss';

export default class HeaderInfoRequestStart extends PureComponent {
    render() {
        let { requestStartDate, isColStyle } = this.props;
        let className = classnames('mrc-ui-hi-request-start', {
            'mrc-ui-hi-request-start-colstyle': isColStyle,
        });
        return (
            <div className={className}>
                <div className="mrc-ui-hi-request-start-label">Request Start</div>
                <div className="mrc-ui-hi-request-start-icon">
                    <RocketIcon color={IC.MUTED} size={IS.XSMALL} />
                </div>
                <div className="mrc-ui-hi-request-start-date">
                    <MrcDate>{requestStartDate}</MrcDate>
                </div>
            </div>
        );
    }
}

export const headerInfoRequestStartDataPropType = {
    requestStartDate: PropTypes.string,
};

HeaderInfoRequestStart.propTypes = {
    isColStyle: PropTypes.bool,
    ...headerInfoRequestStartDataPropType,
};
