import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ColoredBox.scss';

const ColoredBox = ({ children, color, size }) => {
    const classes = classnames('mrc-colored-box', color, size);
    return <div className={classes}>{children}</div>;
};

const COLORS = {
    GREEN: 'mrc-green',
    GREY_DARK: 'mrc-grey-dark',
    GREY_LIGHT: 'mrc-grey-light',
};

const SIZES = {
    L: 'cb-large',
    M: 'cb-medium',
    S: 'cb-small',
};

ColoredBox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    color: PropTypes.oneOfType(COLORS),
    size: PropTypes.oneOfType(SIZES),
};

export default ColoredBox;
export { COLORS, SIZES };
