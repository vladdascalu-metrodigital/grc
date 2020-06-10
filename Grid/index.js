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
        let { cols, justifyContent, alignItems } = this.props;
        let className = classnames('mrc-ui-grid', {
            'mrc-ui-grid-cols': cols && cols > 0,
        });
        let style = {
            '--grid-cols': cols && cols > 0 ? cols : undefined,
            '--justify-content': justifyContent,
            '--align-items': alignItems,
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
