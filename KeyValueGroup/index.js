import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class KeyValueGroup extends Component {
    render() {
        return <div className="mrc-ui-key-value-group">{this.props.children}</div>;
    }
}

export class KeyValueRow extends Component {
    render() {
        let className = classnames('mrc-ui-key-value-row', {
            'mrc-ui-key-value-row-spaced': this.props.spaced,
        });
        return <div className={className}>{this.props.children}</div>;
    }
}

export class Key extends Component {
    render() {
        return <div className="mrc-ui-key">{this.props.children}</div>;
    }
}

export class Value extends Component {
    render() {
        return <div className="mrc-ui-value">{this.props.children}</div>;
    }
}

KeyValueGroup.PropTypes = {
    children: PropTypes.oneOf([Key, Value]),
};
