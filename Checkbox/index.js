import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import InputLabel from '../InputLabel';

import './index.scss';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let { onChange, checked } = this.props;
        if ((e === 'click' || e.keyCode == 13 || e.keyCode == 32) && onChange) onChange(!checked);
    }

    render() {
        let { checked, label, disabled } = this.props;
        let className = classnames('mrc-ui-checkbox', {
            'mrc-ui-checkbox-checked': checked,
            'mrc-ui-checkbox-disabled': disabled,
        });
        return (
            <div
                className={className}
                onKeyUp={this.handleChange.bind(this)}
                onClick={this.handleChange.bind(this, 'click')}
                tabIndex="0"
            >
                <div className="mrc-ui-checkbox-box"></div>
                <InputLabel>{label}</InputLabel>
            </div>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
};
