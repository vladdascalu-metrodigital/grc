import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import { STATUS, MESSAGE, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import './index.scss';

let intOrFloat = /^(?:(?:-?\d+)|(?:-?\.\d+)|(?:-?\d+\.\d+))$/gm;
let int = /^-?\d+$/gm;

export default class NumberInputNew extends Component {
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
        let { integer, min, max, required, onValidChange } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (v) {
            v = v.toString();
            if (integer && v.match(int) === null) {
                isValid = false;
                nextValidationMessages.push(MESSAGE.NO_INTEGER);
            } else if (v.match(intOrFloat) === null) {
                isValid = false;
                nextValidationMessages.push(MESSAGE.NO_NUMBER);
            } else {
                v = parseFloat(v);
                if ((min || min === 0) && v < min) {
                    isValid = false;
                    nextValidationMessages.push(MESSAGE.TOO_LOW);
                } else if (max && v > max) {
                    isValid = false;
                    nextValidationMessages.push(MESSAGE.TOO_HIGH);
                }
            }
        } else if (!v && v !== 0 && required) {
            isValid = false;
            nextValidationMessages.push(MESSAGE.REQUIRED);
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
        let { value, disabled, status, label, onBlur, validationMessages: messages } = this.props;
        value = value || value === 0 ? value : ''; // handle nullish values
        if (messages) validationMessages = [...validationMessages, ...messages];
        let inputClassName = classnames('mrc-ui-number-input-new-input', {
            'mrc-ui-number-input-new-input-invalid': status === STATUS.INVALID || !valid,
        });
        return (
            <div className={'mrc-ui-number-input-new'}>
                {label ? <InputLabel>{label}</InputLabel> : null}
                <input
                    className={inputClassName}
                    type="text"
                    value={value}
                    onChange={this.handleChange.bind(this)}
                    onBlur={onBlur}
                    disabled={disabled}
                />
                <InputValidationMessages messages={validationMessages} />
            </div>
        );
    }
}

NumberInputNew.propTypes = {
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    status: PropTypes.oneOf(['invalid']),
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    changeDelay: PropTypes.number,
    onValidChange: PropTypes.func,
    onBlur: PropTypes.func,
    validationMessages: PropTypes.array,
    value: PropTypes.string,
    integer: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string,
};
