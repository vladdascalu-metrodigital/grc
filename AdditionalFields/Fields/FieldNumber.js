import React, { useState } from 'react';
import { defaultOnChangeField } from '../additionalFielsUtil';
import { DefaultFieldPropTypes } from '../AdditionalFieldsPropTypes';

export function FieldNumber(props) {
    const [value, setValue] = useState(props.elem.value == null ? undefined : props.elem.value);

    return (
        <input
            {...props}
            type="number"
            className="m-input-element"
            value={value}
            onChange={e => defaultOnChangeField(props, value, setValue, e)}
        />
    );
}

FieldNumber.propTypes = { ...DefaultFieldPropTypes };
