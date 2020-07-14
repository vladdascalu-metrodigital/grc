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
        let { cols, colMin, colMax, justifyContent, alignItems, className: outerClassName } = this.props;
        let className = classnames(outerClassName, 'mrc-ui-grid', {
            'mrc-ui-grid-cols': cols && cols > 0,
        });
        let style = {
            '--mrc-ui-grid-grid-cols': cols && cols > 0 ? cols : undefined,
            '--mrc-ui-grid-justify-content': justifyContent,
            '--mrc-ui-grid-align-items': alignItems,
            '--mrc-ui-grid-col-min': colMin,
            '--mrc-ui-grid-col-max': colMax,
        };
        return (
            <div style={style} className={className}>
                {this.props.children}
            </div>
        );
    }
}

Grid.propTypes = {
    cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gap: PropTypes.string,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    className: PropTypes.string,
    colMin: PropTypes.string,
    colMax: PropTypes.string,
};

export class GridItem extends Component {
    render() {
        let { rowSpan, colSpan, children, justifySelf, alignSelf } = this.props;
        let style = {
            '--justify-self': justifySelf,
            '--align-self': alignSelf,
        };
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

GridItem.propTypes = {
    rowSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['all'])]),
    colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['all'])]),
    justifySelf: PropTypes.string,
    alignSelf: PropTypes.string,
    children: PropTypes.node,
};
