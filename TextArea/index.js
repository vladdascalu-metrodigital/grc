import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { lookup } from '../Util/translations';
import './index.scss';

import { STATUS, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

export default class TextArea extends Component {
    constructor(props) {
        super(props);
        this.validate.bind(this);
        this.delayedChangeTimeout = null;
        this.state = {
            valid: true,
            validationMessages: [],
        };
    }

    componentDidMount() {
        this.validate(this.props.value);
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.validate(this.props.value);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.delayedChangeTimeout);
    }

    validate(v) {
        let { required, onValidChange } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (required && !v) {
            isValid = false;
            nextValidationMessages.push(lookup('mrc.forms.required'));
        }
        this.setState({
            valid: isValid,
            validationMessages: nextValidationMessages.length ? nextValidationMessages : [],
        });
        if (onValidChange && this.state && this.state.valid !== isValid) {
            onValidChange(isValid);
        }
        return isValid;
    }

    handleChange(e) {
        let { onChange, onChangeDelayed, changeDelay } = this.props;
        let value = e.target.value;
        if (onChange) onChange(value);
        if (onChangeDelayed) {
            clearTimeout(this.delayedChangeTimeout);
            this.delayedChangeTimeout = setTimeout(() => onChangeDelayed(value), changeDelay || CHANGE_DELAY);
        }
    }

    render() {
        let { value, rows, disabled, onBlur, status, label, validationMessages: messages } = this.props;
        let { valid, validationMessages } = this.state;
        if (messages) validationMessages = [...validationMessages, ...messages];
        let inputClassName = classnames('mrc-ui-text-area-input', {
            'mrc-ui-text-area-input-invalid': status === STATUS.INVALID || !valid,
        });
        return (
            <div className="mrc-ui-text-area">
                <InputLabel>{label}</InputLabel>
                <textarea
                    rows={rows}
                    className={inputClassName}
                    value={value}
                    onChange={this.handleChange.bind(this)}
                    disabled={disabled}
                    onBlur={onBlur}
                />
                <InputValidationMessages messages={validationMessages} />
            </div>
        );
    }
}

TextArea.propTypes = {
    disabled: PropTypes.disabled,
    rows: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    changeDelay: PropTypes.number,

    status: PropTypes.oneOf(['invalid']),
    onValidChange: PropTypes.func,
    onBlur: PropTypes.func,
    validationMessages: PropTypes.array,
    label: PropTypes.string,
    required: PropTypes.bool,
};

TextArea.defaultProps = {
    rows: 5,
};
