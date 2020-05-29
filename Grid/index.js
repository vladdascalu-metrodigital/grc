import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

// export const GAP = {
// 'NONE'
// 'SMALL'
// 'LARGE'
// }

export default class Grid extends Component {
    render() {
        let className = classnames('mrc-ui-grid');
        return <div className={className}>{this.props.children}</div>;
    }
}

Grid.PropTypes = {
    gap: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export class GridItem extends Component {
    render() {
        let { rowSpan, colSpan, children } = this.props;
        let style = {};
        if (colSpan === 'all') {
            style.gridColumn = '1/-1';
        } else if (parseInt(colSpan) > 0) {
            style.gridColumnEnd = 'span ' + colSpan;
        }
        if (rowSpan === 'all') {
            style.gridRow = '1/-1';
        } else if (parseInt(rowSpan) > 0) {
            style.gridRowEnd = 'span ' + rowSpan;
        }
        return (
            <div className="mrc-ui-grid-item" style={style}>
                {children}
            </div>
        );
    }
}

GridItem.PropTypes = {
    rowSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['all'])]),
    colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['all'])]),
    children: PropTypes.node,
};
