import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const Layout = ({ children, type }) => {
    const classes = classnames(
        'mrc-layout',
        { 'lo-row': type === LAYOUT_TYPES.ROW },
        { 'lo-col': type === LAYOUT_TYPES.COL },
        { 'lo-col-2': type === LAYOUT_TYPES.COL_2 },
        { 'lo-col-2-tablet': type === LAYOUT_TYPES.COL_2_TABLET }
    );

    return <div className={classes}>{children}</div>;
};

const LAYOUT_TYPES = {
    COL: 'column',
    COL_2: '2-columns',
    COL_2_TABLET: '2-columns-on-tablet-plus',
    ROW: 'row',
};

Layout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    type: PropTypes.oneOfType(LAYOUT_TYPES),
};

export default Layout;
export { LAYOUT_TYPES };
