import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import InputLabel from '../InputLabel';
import CheckIcon from '../icons/CheckIcon';

import './index.scss';

export default class CheckItem extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let { onChange, checked } = this.props;
        if ((e === 'click' || e.keyCode == 13 || e.keyCode == 32) && onChange) onChange(!checked);
    }

    render() {
        let { checked, label, disabled } = this.props;
        let className = classnames('mrc-ui-checkitem', {
            'mrc-ui-checkitem-checked': checked,
            'mrc-ui-checkitem-disabled': disabled,
        });
        return (
            <div
                className={className}
                onKeyUp={this.handleChange.bind(this)}
                onClick={this.handleChange.bind(this, 'click')}
                tabIndex="0"
            >
                <InputLabel>{label}</InputLabel>
                {checked && <CheckIcon size="small" color={disabled ? 'disabled' : 'interaction'} />}
            </div>
        );
    }
}

CheckItem.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
};
