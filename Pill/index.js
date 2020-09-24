import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CancelIcon from '../icons/CancelIcon';
import CheckIcon from '../icons/CheckSmallFilledIcon';

import './index.scss';

export default class Pill extends PureComponent {
    render() {
        let { size, text, title, type, onRemove, withIcon } = this.props;
        let className = classnames('mrc-ui-pill', {
            'mrc-ui-pill-danger': type === 'danger',
            'mrc-ui-pill-success': type === 'success',
            'mrc-ui-pill-small': size === 'small',
        });
        return (
            <span className={className}>
                {withIcon && type === 'danger' && (
                    <span className="mrc-ui-pill-icon">
                        <CancelIcon size="inline" color="current-color" />
                    </span>
                )}
                {withIcon && type === 'success' && (
                    <span className="mrc-ui-pill-icon">
                        <CheckIcon size="inline" color="current-color" />
                    </span>
                )}
                {title && <span className="mrc-ui-pill-title">{title}</span>}
                <span>{text}</span>
                {onRemove && (
                    <button className="mrc-ui-pill-remove" onClick={onRemove}>
                        <CancelIcon size="inline" color="current-color" />
                    </button>
                )}
            </span>
        );
    }
}

Pill.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['danger', 'success']),
    size: PropTypes.oneOf(['small', 'medium']),
    onRemove: PropTypes.func,
    withIcon: PropTypes.bool,
};
