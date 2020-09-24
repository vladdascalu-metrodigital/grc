import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MrcNumber from '../MrcNumber';
import { COLOR as IC, SIZE as IS } from '../icons/index';
import ArrowDownOutlinedIcon from '../icons/ArrowDownOutlinedIcon';
import ArrowRightOutlinedIcon from '../icons/ArrowRightOutlinedIcon';
import ArrowUpOutlinedIcon from '../icons/ArrowUpOutlinedIcon';

import './HeaderInfoLimits.scss';

export const LIMIT_DIR = {
    UP: 'up',
    EQUAL: 'equal',
    DOWN: 'down',
};

const Arrow = (props) => {
    let { direction, ...otherProps } = props;
    switch (direction) {
        case LIMIT_DIR.UP:
            return <ArrowUpOutlinedIcon {...otherProps} />;
        case LIMIT_DIR.EQUAL:
            return <ArrowRightOutlinedIcon {...otherProps} />;
        case LIMIT_DIR.DOWN:
            return <ArrowDownOutlinedIcon {...otherProps} />;
        default:
            return null;
    }
};

export default class HeaderInfoLimits extends PureComponent {
    render() {
        let {
            isColStyle,
            limitType,
            country,
            groupLimit,
            customerLimit,
            groupLimitDirection,
            customerLimitDirection,
        } = this.props;
        let className = classnames('mrc-ui-hi-limits', {
            'mrc-ui-hi-limits-colstyle': isColStyle,
        });
        return (
            <div className={className}>
                <div className="mrc-ui-hi-limits-type">{limitType}</div>
                <div className="mrc-ui-hi-limits-group">
                    <span>Group</span>
                    <Arrow direction={groupLimitDirection} color={IC.MUTED} size={IS.XSMALL} />
                    <MrcNumber country={country} isCurrency>
                        {groupLimit}
                    </MrcNumber>
                </div>
                <div className="mrc-ui-hi-limits-customer">
                    <span>Customer</span>
                    <Arrow direction={customerLimitDirection} color={IC.MUTED} size={IS.XSMALL} />
                    <MrcNumber country={country} isCurrency>
                        {customerLimit}
                    </MrcNumber>
                </div>
            </div>
        );
    }
}

export const headerInfoLimitsDataPropType = {
    limitType: PropTypes.string,
    groupLimit: PropTypes.number,
    groupLimitDirection: PropTypes.oneOf(Object.values(LIMIT_DIR)),
    customerLimit: PropTypes.number,
    customerLimitDirection: PropTypes.oneOf(Object.values(LIMIT_DIR)),
    country: PropTypes.string,
};

HeaderInfoLimits.propTypes = {
    isColStyle: PropTypes.bool,
    ...headerInfoLimitsDataPropType,
};
