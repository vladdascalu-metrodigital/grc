import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CheckSmallFilledIcon from '../icons/CheckSmallFilledIcon';
import { SIZE as ISIZE, COLOR as ICOLOR } from '../icons/index';

import './index.scss';

export default class CheckCard extends Component {
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
        let { children, checked, disabled, title } = this.props;
        children = typeof children === 'string' ? children.trim() : children;
        let className = classnames('mrc-ui-check-card', {
            'mrc-ui-check-card-no-content': !children,
            'mrc-ui-check-card-checked': checked && !disabled,
            'mrc-ui-check-card-disabled': disabled,
        });
        return (
            <div className={className} onClick={this.handleClick}>
                <div className="mrc-ui-check-card-head-row">
                    {title ? <span className="mrc-ui-check-card-title">{title}</span> : <div>{children}</div>}
                    <div className="mrc-ui-check-card-checkmark">
                        <CheckSmallFilledIcon size={ISIZE.XSMALL} color={ICOLOR.SUCCESS} />
                    </div>
                </div>
                {children && title && <div className="mrc-ui-check-card-extra-row">{children}</div>}
            </div>
        );
    }
}

CheckCard.propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
};
