import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import './deprecatedIndex.scss';

export const COLOR = {
    INTERACTION: 'interaction',
    SUCCESS: 'success',
    NEUTRAL: 'neutral',
    DANGER: 'danger',
    // ATTENTION: 'attention',
};

export const SIZE = {
    SMALL: 'small',
    SMALL_ROUNDER: 'small-round',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { status, icon, id, text, children, type, disabled, onClick, size, color, isOutlined, wide } = this.props;
        let buttonClasses;
        let iconClasses;
        // if statement for old implementation
        if (status) {
            buttonClasses = classNames(
                'mrc-btn',
                { 'mrc-primary-button': status === 'primary' },
                { 'mrc-secondary-button': status === 'secondary' },
                { 'mrc-error-button': status === 'error' },
                { 'mrc-success-button': status === 'success' }
            );
            iconClasses = classNames('icon');
        } else {
            buttonClasses = classNames(
                'mrc-ui-btn',
                { 'mrc-ui-btn-small': size === SIZE.SMALL },
                { 'mrc-ui-btn-small-round': size === SIZE.SMALL_ROUNDER },
                { 'mrc-ui-btn-large': size === SIZE.LARGE },
                { 'mrc-ui-btn-interaction': !color || color === COLOR.INTERACTION },
                { 'mrc-ui-btn-success': color === COLOR.SUCCESS },
                { 'mrc-ui-btn-neutral': color === COLOR.NEUTRAL },
                { 'mrc-ui-btn-danger': color === COLOR.DANGER },
                { 'mrc-ui-btn-outlined': isOutlined },
                { 'mrc-ui-btn-wide-medium': wide === 'medium' },
                { 'mrc-ui-btn-wide-small': wide === 'small' }
            );
            iconClasses = classNames('mrc-ui-btn-icon');
        }

        return (
            <button id={id} className={buttonClasses} type={type || 'button'} onClick={onClick} disabled={disabled}>
                {children ? children : null}
                {icon && !children ? <img className={iconClasses} src={icon} /> : null}
                {text && !children ? text : null}
            </button>
        );
    }
}

Button.propTypes = {
    status: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['submit', 'button']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'small-round', 'medium', 'large']),
    color: PropTypes.oneOf(['interaction', 'success', 'neutral', 'danger']),
    isOutlined: PropTypes.bool,
    wide: PropTypes.oneOf(['small', 'medium']),
};
