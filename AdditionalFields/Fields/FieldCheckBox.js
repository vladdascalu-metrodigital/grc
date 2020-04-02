import React, { useState } from 'react';
import { DefaultFieldPropTypes } from '../AdditionalFieldsPropTypes';

export function FieldCheckBox(props) {
    const [value, setValue] = useState(props.elem.value == null ? undefined : props.elem.value);

    const onChangeCheckBox = e => {
        const newValue = e.target.checked;
        if (!props.disabled && newValue !== value) {
            setValue(newValue);
            props.onChange(newValue);
            props.onBlur();
        }
    };

    const onClickBox = () => {
        const newValue = !value;
        setValue(newValue);
        props.onChange(newValue);
        props.onBlur();
    };

    return (
        <span>
            <input
                {...props}
                type="checkbox"
                checked={value}
                className="m-radioButton-input checkbox-input"
                onChange={onChangeCheckBox}
                onBlur={() => {
                    return;
                }}
            />
            <div className="m-radioButton-inputIcon checkbox-icon" onClick={onClickBox} />
        </span>
    );
}

FieldCheckBox.propTypes = { ...DefaultFieldPropTypes };
