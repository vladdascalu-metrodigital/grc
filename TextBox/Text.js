import React from 'react';
import PropTypes from 'prop-types';
import './Text.scss';

import classnames from 'classnames';

const Text = ({ children, color, size, uppercase }) => {
    const classes = classnames('t-text', COLORS[color], SIZES[size], { 't-uppercase': uppercase });
    return <span className={classes}>{children}</span>;
};

const COLORS = {
    green: 't-color-green',
    red: 't-color-red',
    dark_grey: 't-color-grey-dark',
    light_grey: 't-color-grey-light',
    white: 't-color-white',
    blue: 't-color-blue',
    yellow: 't-color-yellow',
};

const SIZES = {
    1: 't-size-1',
    2: 't-size-2',
    3: 't-size-3',
    4: 't-size-4',
    5: 't-size-5',
    6: 't-size-6',
    7: 't-size-7',
    8: 't-size-8',
    9: 't-size-9',
    10: 't-size-10',
};

Text.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    uppercase: PropTypes.bool,
};

export { COLORS, SIZES };
export default Text;
