import React, { useState } from 'react';
import { DefaultFieldPropTypes } from '../AdditionalFieldsPropTypes';
import { PropTypes } from 'prop-types';
import { formatOptionValues, getOptionValues } from '../additionalFielsUtil';
import { lookup } from '../../Util/translations';

export function FieldDropDown(props) {
    const [value, setValue] = useState(props.elem.value == null ? undefined : props.elem.value);
    let values = getOptionValues(props.elem.value);
    if (!props.multiple) {
        if (values !== undefined && values !== null && values.length > 0) {
            values = values[0];
        } else {
            values = undefined;
        }
    } else if (values.length === 0) {
        values = [''];
    }
    const options = getOptionValues(props.elem.countryField.options);
    const fieldLabel = props.elem.countryField.field.label;

    const onChangeDropdown = e => {
        var options = e.target.options !== undefined ? e.target.options : [];
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                if (options[i].value !== undefined && options[i].value.length > 0) {
                    values.push(options[i].value);
                }
            }
        }
        const newValue = formatOptionValues(values);
        if (newValue !== value) {
            setValue(newValue);
            props.onChange(newValue);
            props.onBlur();
        }
    };

    return (
        <select
            {...props}
            onChange={onChangeDropdown}
            onBlur={() => {
                return;
            }}
            value={values}
            // defaultValue={values}
        >
            <option value=""></option>
            {options
                .filter(option => option !== undefined && option !== null && option.trim().length > 0)
                .map(option => {
                    return (
                        <option value={option} key={option}>
                            {lookup(fieldLabel + '.' + option)}
                        </option>
                    );
                })}
        </select>
    );
}

FieldDropDown.propTypes = {
    ...DefaultFieldPropTypes,
    multiple: PropTypes.bool,
};
