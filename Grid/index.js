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
