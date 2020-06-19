import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class InputLabel extends Component {
    render() {
        return <span className="mrc-ui-input-label">{this.props.children}</span>;
    }
}

InputLabel.propTypes = {
    children: PropTypes.node,
};
