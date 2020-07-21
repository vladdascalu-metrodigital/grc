import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export const TYPE = {
    // 'DEFAULT': 'default',
    PRIMARY: 'primary',
    PRIMARY_WHITE: 'primary-white',
    PRIMARY_BLUE: 'primary-blue',
    PRIMARY_GREEN: 'primary-green',
    MUTED: 'muted',
    WARNING: 'warning',
    ERROR: 'error',
};

export default class Card extends Component {
    render() {
        let { children, isBlock, dropShadow, type } = this.props;
        let className = classnames('mrc-ui-card', {
            'mrc-ui-card-block': isBlock,
            'mrc-ui-card-shadow': dropShadow,
            'mrc-ui-card-primary': type === TYPE.PRIMARY,
            'mrc-ui-card-muted': type === TYPE.MUTED,
            'mrc-ui-card-primary-white': type === TYPE.PRIMARY_WHITE,
            'mrc-ui-card-warning': type === TYPE.WARNING,
            'mrc-ui-card-error': type === TYPE.ERROR,
            'mrc-ui-card-primary-blue': type === TYPE.PRIMARY_BLUE,
            'mrc-ui-card-primary-green': type === TYPE.PRIMARY_GREEN,
        });
        return <div className={className}>{children}</div>;
    }
}

Card.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    type: PropTypes.string,
    dropShadow: PropTypes.bool,
    isBlock: PropTypes.bool,
};
