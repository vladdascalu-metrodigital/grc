import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { lookup } from '../Util/translations';

import SelectIcon from '../icons/SelectIcon';
import { COLOR as IC } from '../icons';
import { STATUS } from '../Util/inputCommons';
import InputLabel from '../InputLabel';
import InputValidationMessages from '../InputValidationMessages';

import './index.scss';

export default class Select extends PureComponent {
    constructor(props) {
        super(props);
        this.validate.bind(this);
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

    handleChange(e) {
        let { onChange } = this.props;
        if (onChange) onChange(e.target.value);
    }

    validate(v) {
        let { required, onValidChange, nullValue } = this.props;
        let isValid = true;
        let nextValidationMessages = [];
        if (v === nullValue && required) {
            isValid = false;
            nextValidationMessages.push(lookup('mrc.forms.required'));
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
        let { value, options, disabled, label, status, validationMessages: messages } = this.props;
        if (messages) validationMessages = [...validationMessages, ...messages];
        let inputClassName = classnames('mrc-ui-select-input', {
            'mrc-ui-select-input-invalid': status === STATUS.INVALID || !valid,
        });
        return (
            <div className="mrc-ui-select">
                <InputLabel>{label}</InputLabel>
                <div className="mrc-ui-select-input-wrapper">
                    {options ? (
                        <select
                            className={inputClassName}
                            value={value}
                            onChange={this.handleChange.bind(this)}
                            disabled={disabled}
                        >
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
                    <div className="mrc-ui-select-icon">
                        <SelectIcon size="xsmall" color={disabled ? IC.DISABLED : null} />
                    </div>
                </div>
                <InputValidationMessages messages={validationMessages} />
            </div>
        );
    }
}

let numberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Select.propTypes = {
    disabled: PropTypes.bool,
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(numberOrStringType),
    ]),
    value: numberOrStringType,
    onChange: PropTypes.func,

    nullValue: numberOrStringType,
    status: PropTypes.oneOf(['invalid']),
    onValidChange: PropTypes.func,
    validationMessages: PropTypes.array,
    label: PropTypes.string,
    required: PropTypes.bool,
};
