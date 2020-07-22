import React, { Component } from 'react';
import classNames from 'classnames';

import './index.scss';
import './deprecatedIndex.scss';

const COLOR = {
    INTERACTION: 'interaction',
    SUCCESS: 'success',
    NEUTRAL: 'neutral',
    DANGER: 'danger',
    // ATTENTION: 'attention',
};

const SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { status, icon, id, text, type, disabled, onClick, size, color, isOutlined, wide } = this.props;
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
                {icon ? <img className={iconClasses} src={icon} /> : null}
                {text}
            </button>
        );
    }
}
