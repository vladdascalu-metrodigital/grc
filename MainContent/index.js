import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class MainContent extends Component {
    render() {
        return (
            <div className={'mrc-ui-main-content'}>
                <div className="mrc-ui-main-content-content">{this.props.children}</div>
            </div>
        );
    }
}

MainContent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
