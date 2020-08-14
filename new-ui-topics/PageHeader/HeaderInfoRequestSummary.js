import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './HeaderInfoRequestSummary.scss';

export const STATUS = {
    PENDING: 'PENDING',
    // TODO: add all available status keys
};

export default class HeaderInfoRequestSummary extends PureComponent {
    render() {
        let { isColStyle, phaseName, phaseNumber, phaseNumberMax, status, statusRole } = this.props;
        let className = classnames('mrc-ui-hi-rsummary', {
            'mrc-ui-hi-rsummary-colstyle': isColStyle,
        });
        let statusValueClassName = classnames('mrc-ui-hi-rsummary-status-value', {
            'mrc-ui-hi-rsummary-status-value-green': status === STATUS.PENDING,
        });
        return (
            <div className={className}>
                <div className="mrc-ui-hi-rsummary-row">
                    <div className="mrc-ui-hi-rsummary-phase-label">Phase</div>
                    <div className="mrc-ui-hi-rsummary-phase">{`${phaseName} ${phaseNumber}/${phaseNumberMax}`}</div>
                </div>
                <div className="mrc-ui-hi-rsummary-row">
                    <div className="mrc-ui-hi-rsummary-status-label">Status</div>
                    <div className="mrc-ui-hi-rsummary-status">
                        <span className={statusValueClassName}>{status}</span>
                        by
                        <span className="mrc-ui-hi-rsummary-status-role">{statusRole}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export const HeaderInfoRequestSummaryDataPropType = {
    phaseName: PropTypes.string,
    phaseNumber: PropTypes.number,
    phaseNumberMax: PropTypes.number,
    status: PropTypes.oneOf(Object.values(STATUS)),
    statusRole: PropTypes.oneOf(['CC, CM, HOT']), // TODO: add all concerning roles
};

HeaderInfoRequestSummary.propTypes = {
    isColStyle: PropTypes.bool,
    ...HeaderInfoRequestSummaryDataPropType,
};
