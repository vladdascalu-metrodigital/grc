import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export const TYPE = {
    SMALL: 'small',
    SMALLER: 'smaller',
};

export default class MrcDate extends PureComponent {
    render() {
        let { children: dateString, type } = this.props;
        let localeDateString = new Date(dateString).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        let className = classnames('mrc-ui-date', type && 'mrc-ui-date-' + type);
        return (
            <time dateTime={dateString} className={className}>
                {localeDateString}
            </time>
        );
    }
}

MrcDate.propTypes = {
    type: PropTypes.oneOf(['small', 'smaller']),
    children: PropTypes.string,
};
