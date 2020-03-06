import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ColoredBox.scss';

const ColoredBox = ({ children, color, size }) => {
    const classes = classnames('mrc-colored-box', COLORS[color], SIZES[size]);
    return <div className={classes}>{children}</div>;
};

const COLORS = {
    green: 'mrc-green',
    dark_grey: 'mrc-grey-dark',
    light_grey: 'mrc-grey-light',
};

const SIZES = {
    1: 'cb-size-1',
    2: 'cb-size-2',
    3: 'cb-size-3',
    4: 'cb-size-4',
    5: 'cb-size-5',
    6: 'cb-size-6',
    7: 'cb-size-7',
    8: 'cb-size-8',
    9: 'cb-size-9',
    10: 'cb-size-10',
};

ColoredBox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    color: PropTypes.string,
    size: PropTypes.string,
};

export default ColoredBox;
export { COLORS, SIZES };
