import React from 'react';
import PropTypes from 'prop-types';
import './Text.scss';

import classnames from 'classnames';

const Text = ({ children, color, size, uppercase }) => {
    const classes = classnames('t-text', color, size, { 't-uppercase': uppercase });
    return <span className={classes}>{children}</span>;
};

const COLORS = {
    GREEN: 't-color-green',
    RED: 't-color-red',
    GREY_DARK: 't-color-grey-dark',
    GREY_LIGHT: 't-color-grey-light',
    WHITE: 't-color-white',
    BLUE: 't-color-blue',
};

const SIZES = {
    XL: 't-size-xl',
    L: 't-size-l',
    M: 't-size-m',
    S: 't-size-s',
};

Text.propTypes = {
    color: PropTypes.oneOfType(COLORS),
    size: PropTypes.oneOfType(SIZES),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    uppercase: PropTypes.bool,
};

export { COLORS, SIZES };
export default Text;
