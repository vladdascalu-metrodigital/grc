import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { lookup } from '../../Util/translations';
import { additionalFieldIsValid, additionalFieldMandatoryIsValid } from './additionalFieldsValidation';
import { RequestFieldPropTypes } from './AdditionalFieldsPropTypes';
import { FieldNumber } from './Fields/FieldNumber';
import { FieldText } from './Fields/FieldText';
import { FieldTextArea } from './Fields/FieldTextArea';
import { FieldDate } from './Fields/FieldDate';
import { FieldCheckBox } from './Fields/FieldCheckBox';
import { FieldDropDown } from './Fields/FieldDropDown';
import { FieldRadioButton } from './Fields/FieldRadioButton';

export default function AdditionalField(props) {
    const elem = props.elem;
    const mandatory = elem.countryField.mandatory;
    const validation = elem.countryField.validation;
    const type = elem.countryField.field.type;
    let oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
    const isValidNow =
        props.disabled ||
        (additionalFieldMandatoryIsValid(mandatory, oldValue) &&
            additionalFieldIsValid(validation, type, oldValue, elem.creationTimestamp));

    const [valid, setValid] = useState(isValidNow);

    const onChange = value => {
        oldValue = type === 'TEXTAREA' ? elem.textValue : elem.value;
        if (oldValue !== value) {
            const isValid =
                additionalFieldMandatoryIsValid(mandatory, value) &&
                additionalFieldIsValid(validation, type, value, elem.creationTimestamp);
            setValid(isValid);
            props.onChange(elem, value, isValid);
        }
    };
    const onBlur = () => {
        const theValue = type === 'TEXTAREA' ? elem.textValue : elem.value;

        const isValid =
            additionalFieldMandatoryIsValid(mandatory, theValue) &&
            additionalFieldIsValid(validation, type, theValue, elem.creationTimestamp);
        setValid(isValid);
        props.onBlur(elem, isValid);
    };

    const generateField = () => {
        switch (type) {
            //NUMBER, TEXT, TEXTAREA, DATE, CHECKBOX, DROPDOWN, DROPDOWN_MULTIPLE, RADIOBUTTON, ATTACHMENT_REF
            case 'NUMBER':
                return <FieldNumber {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} />;
            case 'TEXT':
                return <FieldText {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} />;
            case 'TEXTAREA':
                return <FieldTextArea {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} />;
            case 'DATE':
                return <FieldDate {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} />;
            case 'CHECKBOX':
                props.elem.value = elem.value === 'true';
                return <FieldCheckBox {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} />;
            case 'DROPDOWN':
                return (
                    <FieldDropDown
                        {...{ ...props, id: elem.id }}
                        onChange={onChange}
                        onBlur={onBlur}
                        multiple={false}
                    />
                );
            case 'DROPDOWN_MULTIPLE':
                return (
                    <FieldDropDown {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} multiple={true} />
                );
            case 'RADIOBUTTON':
                return <FieldRadioButton {...{ ...props, id: elem.id }} onChange={onChange} onBlur={onBlur} />;
            default:
                console.log('Warning: Field type ' + elem.countryField.field.type + ' is not supported.');
                return null;
        }
    };

    const classForLabel = type === 'CHECKBOX' ? 'checkbox-label' : type === 'RADIOBUTTON' ? 'm-radioButton' : '';

    return (
        <div className={valid ? 'mrc-input' : 'mrc-input not-valid'}>
            <label className={classForLabel} htmlFor={props.elem.id}>
                {lookup(props.elem.countryField.field.label)} {mandatory ? '*' : ''}
            </label>
            {generateField()}
        </div>
    );
}

AdditionalField.propTypes = {
    elem: RequestFieldPropTypes,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
};
