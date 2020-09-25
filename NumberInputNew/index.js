import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { lookup } from '../Util/translations';

import { STATUS, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import './index.scss';

export function isIntOrFloat(numberString) {
    if (isNaN(numberString)) {
        return false;
    }
    if (!Number.isNaN(parseFloat(numberString))) {
        return true;
    }
    return false;
}

export function isInt(numberString) {
    if (isNaN(numberString)) {
        return false;
    }
    if (Number.isInteger(parseFloat(numberString))) {
        return true;
    }
    return false;
}

export default class NumberInputNew extends Component {
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
        if (prevProps.value !== this.props.value) {
            this.validate(this.props.value);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.delayedChangeTimeout);
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

    validate(v) {
        let { integer, min, max, required, onValidChange, greaterThanMin, lessThanMax } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (v || v === 0) {
            v = v.toString();
            if (integer && !isInt(v)) {
                isValid = false;
                nextValidationMessages.push(lookup('mrc.forms.no_integer_number'));
            } else if (!isIntOrFloat(v)) {
                isValid = false;
                nextValidationMessages.push(lookup('mrc.forms.no_number'));
            } else {
                v = parseFloat(v);
                if (min || min === 0) {
                    if (greaterThanMin === true) {
                        isValid = v > min;
                    } else {
                        isValid = v >= min;
                    }
                    if (!isValid) {
                        nextValidationMessages.push(lookup('mrc.forms.number_too_low'));
                    }
                }
                if ((isValid && max) || max === 0) {
                    if (lessThanMax === true) {
                        isValid = v < max;
                    } else {
                        isValid = v <= max;
                    }
                    if (!isValid) {
                        nextValidationMessages.push(lookup('mrc.forms.number_too_high'));
                    }
                }
            }
        } else if (!v && v !== 0 && required) {
            isValid = false;
            nextValidationMessages.push(lookup('mrc.forms.requiredNumber'));
        }

        if (
            this.state &&
            (this.state.valid !== isValid || !isEqual(this.state.validationMessages, nextValidationMessages))
        ) {
            this.setState({
                valid: isValid,
                validationMessages: nextValidationMessages.length ? nextValidationMessages : [],
            });
            if (onValidChange) onValidChange(isValid);
        }
        return isValid;
    }

    render() {
        let { valid, validationMessages } = this.state;
        let { value, disabled, status, label, onBlur, validationMessages: messages, hideInvalid } = this.props;
        value = value || value === 0 ? value : ''; // handle nullish values
        if (messages) validationMessages = [...validationMessages, ...messages];
        console.log(status, valid);
        let inputClassName = classnames('mrc-ui-number-input-new-input', {
            'mrc-ui-number-input-new-input-invalid': !hideInvalid && (status === STATUS.INVALID || !valid),
        });
        return (
            <div className={'mrc-ui-number-input-new'}>
                {label ? <InputLabel>{label}</InputLabel> : null}
                <input
                    ref={this.inputRef}
                    className={inputClassName}
                    type="text"
                    value={value}
                    onChange={this.handleChange.bind(this)}
                    onBlur={onBlur}
                    disabled={disabled}
                />
                {!hideInvalid ? <InputValidationMessages messages={validationMessages} /> : null}
            </div>
        );
    }
}

NumberInputNew.propTypes = {
    autofocus: PropTypes.bool,
    changeDelay: PropTypes.number,
    disabled: PropTypes.bool,
    greaterThanMin: PropTypes.bool,
    hideInvalid: PropTypes.bool,
    integer: PropTypes.bool,
    label: PropTypes.string,
    lessThanMax: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    onValidChange: PropTypes.func,
    required: PropTypes.bool,
    status: PropTypes.oneOf(['invalid']),
    validationMessages: PropTypes.array,
    value: PropTypes.string,
};
