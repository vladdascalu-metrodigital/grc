import React, { useState } from 'react';
import { DefaultFieldPropTypes } from '../AdditionalFieldsPropTypes';
import { getOptionValues } from '../additionalFielsUtil';
import { lookup } from '../../Util/translations';

export function FieldRadioButton(props) {
    const [value, setValue] = useState(props.elem.value == null ? undefined : props.elem.value);
    const options = getOptionValues(props.elem.countryField.options);
    const fieldLabel = props.elem.countryField.field.label;

    const onChangeRadioButton = e => {
        const newValue = e.target.value;
        if (!props.disabled && newValue !== props.value) {
            setValue(newValue);
            props.onChange(newValue);
            props.onBlur();
        }
    };

    return (
        <div>
            {options
                .filter(option => option !== undefined && option !== null && option.trim().length > 0)
                .map(option => {
                    return (
                        <label
                            className="m-radioButton radioButton_value"
                            key={props.elem.id + '_' + option}
                            htmlFor={props.elem.id + '_' + option}
                        >
                            <input
                                {...props}
                                type="radio"
                                id={props.elem.id + '_' + option}
                                className="m-radioButton-input"
                                key={props.elem.id + '_' + option}
                                name={props.elem.id}
                                value={option}
                                onChange={onChangeRadioButton}
                                checked={value === option}
                            />
                            <div className="m-raidoButton-raidoIcon m-radioButton-inputIcon" />
                            <span className="m-radioButton-label">{lookup(fieldLabel + '.' + option)}</span>
                        </label>
                    );
                })}
        </div>
    );
}

FieldRadioButton.propTypes = {
    ...DefaultFieldPropTypes,
};
