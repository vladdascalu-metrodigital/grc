import React, { useState } from 'react';
import { defaultOnChangeField } from '../additionalFielsUtil';
import { DefaultFieldPropTypes } from '../AdditionalFieldsPropTypes';

export function FieldTextArea(props) {
    const [textValue, setTextValue] = useState(props.elem.textValue == null ? undefined : props.elem.textValue);

    return (
        <textarea
            {...props}
            className="m-input-element"
            value={textValue}
            onChange={e => defaultOnChangeField(props, textValue, setTextValue, e)}
        />
    );
}

FieldTextArea.propTypes = { ...DefaultFieldPropTypes };
