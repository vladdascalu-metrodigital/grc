import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export const TYPE = {
    // 'DEFAULT': 'default',
    PRIMARY: 'primary',
    MUTED: 'muted',
    WARNING: 'warning',
};

export default class Card extends Component {
    render() {
        let { children, type } = this.props;
        let className = classnames('mrc-ui-card', {
            'mrc-ui-card-primary': type === TYPE.PRIMARY,
            'mrc-ui-card-muted': type === TYPE.MUTED,
            'mrc-ui-card-warning': type === TYPE.WARNING,
        });
        return <div className={className}>{children}</div>;
    }
}

Card.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    type: PropTypes.string,
};
