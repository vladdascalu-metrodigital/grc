import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import MrcDate from '../../MrcDate';
// import { COLOR as IC, SIZE as IS} from '../../icons/index';
// import RocketIcon from '../../icons/RocketIcon';

import './HeaderInfoRequestSummary.scss';

export default class HeaderInfoRequestSummary extends PureComponent {
    render() {
        let { isColStyle } = this.props;
        let className = classnames('mrc-ui-hi-rsummary', {
            'mrc-ui-hi-rsummary-colstyle': isColStyle,
        });
        return (
            <div className={className}>
                <div className="mrc-ui-hi-rsummary-phase-label">Phase</div>
                <div className="mrc-ui-hi-rsummary-phase">Initialisierung 1/5</div>
                <div className="mrc-ui-hi-rsummary-status-label">Status</div>
                <div className="mrc-ui-hi-rsummary-status">
                    <span className="mrc-ui-hi-rsummary-status-value">PENDING</span>
                    by
                    <span className="mrc-ui-hi-rsummary-status-role">HOT</span>
                </div>
            </div>
        );
    }
}

export const HeaderInfoRequestSummaryDataPropType = {
    phaseName: PropTypes.string,
    phaseNumber: PropTypes.number,
    status: PropTypes.oneOf(['PENDING']), // TODO: add all available status keys
    statusRole: PropTypes.oneOf(['CC, CM, HOT']), // TODO: add all concerning roles
};

HeaderInfoRequestSummary.propTypes = {
    isColStyle: PropTypes.bool,
    ...HeaderInfoRequestSummaryDataPropType,
};
