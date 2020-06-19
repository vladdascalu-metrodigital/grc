import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import { STATUS, VALIDATION_MESSAGE, CHANGE_DELAY } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import './index.scss';

export default class MultipleSelect extends PureComponent {
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
        let prevValue = prevProps.value;
        let thisValue = this.props.value;
        if (!isEqual(thisValue, prevValue)) {
            this.validate(thisValue);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.delayedChangeTimeout);
    }

    handleChange(e) {
        let { onChange, onChangeDelayed, changeDelay } = this.props;
        let options = e.target.options;
        let value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (onChange) onChange(value);
        if (onChangeDelayed) {
            clearTimeout(this.delayedChangeTimeout);
            this.delayedChangeTimeout = setTimeout(() => onChangeDelayed(value), changeDelay || CHANGE_DELAY);
        }
    }

    validate(v) {
        let { required, onValidChange } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (!v && required) {
            isValid = false;
            nextValidationMessages.push(VALIDATION_MESSAGE.REQUIRED);
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
        let { value, options, label, status, validationMessages: messages } = this.props;
        if (messages) validationMessages = [...validationMessages, ...messages];
        let inputClassName = classnames('mrc-ui-multiple-select-input', {
            'mrc-ui-multiple-select-input-invalid': status === STATUS.INVALID || !valid,
        });
        return (
            <div className="mrc-ui-multiple-select">
                <InputLabel>{label}</InputLabel>
                {options ? (
                    <select className={inputClassName} value={value} onChange={this.handleChange.bind(this)} multiple>
                        {options.map((option, i) => {
                            let optionValue, optionText;
                            if (Array.isArray(option)) {
                                optionValue = option[0];
                                optionText = option[1];
                            } else {
                                optionValue = option;
                                optionText = option;
                            }
                            return (
                                <option value={optionValue} key={i}>
                                    {optionText}
                                </option>
                            );
                        })}
                    </select>
                ) : null}
                <InputValidationMessages messages={validationMessages} />
            </div>
        );
    }
}

let numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

MultipleSelect.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(numberOrStringType),
    ]),
    value: numberOrStringType,
    onChange: PropTypes.func,
    onChangeDelayed: PropTypes.func,
    changeDelay: PropTypes.number,

    status: PropTypes.oneOf(['invalid']),
    onValidChange: PropTypes.func,
    validationMessages: PropTypes.array,
    label: PropTypes.string,
    required: PropTypes.bool,
};
