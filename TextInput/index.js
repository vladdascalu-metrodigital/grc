import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { lookup } from '../Util/translations';

import { STATUS, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import './index.scss';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
        this.validate.bind(this);
        this.delayedChangeTimeout = null;
        this.inputRef = React.createRef();
        this.state = {
            valid: true,
            validationMessages: [],
        };
    }

    componentDidMount() {
        this.validate(this.props.value);
        if (this.props.autofocus) this.inputRef.current.focus();
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
        let {
            value,
            disabled,
            onBlur,
            status,
            label,
            validationMessages: messages,
            hideInvalid,
            placeholder,
        } = this.props;
        let { valid, validationMessages } = this.state;
        if (messages) validationMessages = [...validationMessages, ...messages];
        let inputClassName = classnames('mrc-ui-text-input-input', {
            'mrc-ui-text-input-input-invalid': !hideInvalid && (status === STATUS.INVALID || !valid),
        });
        return (
            <div className="mrc-ui-text-input">
                <InputLabel>{label}</InputLabel>
                <input
                    ref={this.inputRef}
                    className={inputClassName}
                    type="text"
                    value={value}
                    onChange={this.handleChange.bind(this)}
                    disabled={disabled}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
                {!hideInvalid ? <InputValidationMessages messages={validationMessages} /> : null}
            </div>
        );
    }
}

TextInput.propTypes = {
    autofocus: PropTypes.bool,
    changeDelay: PropTypes.number,
    disabled: PropTypes.bool,
    hideInvalid: PropTypes.bool,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    onValidChange: PropTypes.func,
    required: PropTypes.bool,
    status: PropTypes.oneOf(['invalid']),
    validationMessages: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};
