import { DefaultFieldPropTypes } from '../AdditionalFieldsPropTypes';
import React, { useState } from 'react';
import { defaultOnChangeField } from '../additionalFielsUtil';

export function FieldText(props) {
    const [value, setValue] = useState(props.elem.value == null ? undefined : props.elem.value);

    return (
        <input
            {...props}
            type="text"
            className="m-input-element"
            value={value}
            onChange={e => defaultOnChangeField(props, value, setValue, e)}
        />
    );
}

FieldText.propTypes = { ...DefaultFieldPropTypes };
