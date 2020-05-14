import './index.scss';
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Toggle extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { disabled, onClick, checked } = this.props;
        if (disabled) return;
        if (onClick) onClick(!checked);
    }

    render() {
        const { disabled, checked, children, reverse, spaceBetween } = this.props;
        const className = classnames('mrc-ui-toggle', {
            'mrc-ui-toggle-reversed': reverse,
            'mrc-ui-toggle-spaced': spaceBetween,
            'mrc-ui-toggle-checked': checked,
            'mrc-ui-toggle-disabled': disabled,
        });

        return (
            <div className={className}>
                <div className="mrc-ui-toggle-label">{children}</div>
                <button tabIndex="0" className="mrc-ui-toggle-button" onClick={this.handleClick}>
                    <span className="mrc-ui-toggle-knob"></span>
                </button>
            </div>
        );
    }
}

Toggle.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.label,
    onClick: PropTypes.func,
    reverse: PropTypes.bool,
    spaceBetween: PropTypes.bool,
    children: PropTypes.node,
};
