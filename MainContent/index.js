import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

// export const GAP = {
// 'NONE'
// 'SMALL'
// 'LARGE'
// }

export default class MainContent extends Component {
    render() {
        let className = classnames('mrc-ui-main-content');
        return <div className={className}>{this.props.children}</div>;
    }
}

MainContent.PropTypes = {
    gap: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
