import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { lookup } from '../Util/translations';
import { additionalFieldIsValid, additionalFieldMandatoryIsValid } from './additionalFieldsValidation';
import { RequestFieldPropTypes } from './AdditionalFieldsPropTypes';
import NumberInput from '../NumberInputNew';
import TextInput from '../TextInput';
import Select from '../Select';
import TextArea from '../TextArea';
import DatePicker from '../DatePicker';
import MultipleSelect from '../MultipleSelect';
import RadioButtons from '../RadioButtons';
import CheckBox from '../Checkbox';
import * as _ from 'lodash';

import { Key, KeyValueRow, Value } from '../KeyValueGroup';
import { getOptionValues, parseDateForAdditionalField, formatDateForAdditionalField } from './additionalFielsUtil';

export default function AdditionalField(props) {
    const elem = props.elem;
    const mandatory = elem.countryField.mandatory;
    const validation = elem.countryField.validation;
    const type = elem.countryField.field.type;
    const label = lookup(elem.countryField.field.label);
    let oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
    const isValidNow =
        props.disabled ||
        (additionalFieldMandatoryIsValid(mandatory, oldValue) &&
            additionalFieldIsValid(validation, type, oldValue, elem.creationTimestamp));

    const [valid, setValid] = useState(isValidNow);

    const onChange = (value) => {
        oldValue = type === 'TEXTAREA' ? elem.textValue : elem.value;
        const val = type === 'DATE' ? formatDateForAdditionalField(value) : value;
        if (oldValue !== val) {
            const isValid =
                additionalFieldMandatoryIsValid(mandatory, val) &&
                additionalFieldIsValid(validation, type, val, elem.creationTimestamp);
            setValid(isValid);
            props.onChange(elem, val, isValid);
        }
    };

    let fieldStatus = valid ? null : 'invalid';

    // const onBlur = () => {
    //     const theValue = type === 'TEXTAREA' ? elem.textValue : elem.value;

    //     const isValid =
    //         additionalFieldMandatoryIsValid(mandatory, theValue) &&
    //         additionalFieldIsValid(validation, type, theValue, elem.creationTimestamp);
    //     setValid(isValid);
    //     props.onBlur(elem, isValid);
    // };

    const generateField = () => {
        switch (type) {
            //NUMBER, TEXT, TEXTAREA, DATE, CHECKBOX, DROPDOWN, DROPDOWN_MULTIPLE, RADIOBUTTON, ATTACHMENT_REF
            case 'NUMBER':
                return (
                    <NumberInput
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        value={oldValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'TEXT':
                return (
                    <TextInput
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        value={oldValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'TEXTAREA':
                return (
                    <TextArea
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        value={oldValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'DATE':
                return (
                    <DatePicker
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        selected={parseDateForAdditionalField(oldValue)}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'CHECKBOX':
                return (
                    <CheckBox
                        status={fieldStatus}
                        label={label}
                        checked={oldValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'DROPDOWN':
                return (
                    <Select
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        options={getOptionValues(props.elem.countryField.options, label)}
                        value={oldValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'DROPDOWN_MULTIPLE':
                return (
                    <MultipleSelect
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        options={getOptionValues(props.elem.countryField.options, label)}
                        value={getOptionValues(oldValue, label)}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            case 'RADIOBUTTON':
                return (
                    <RadioButtons
                        status={fieldStatus}
                        label={label}
                        required={mandatory}
                        options={getOptionValues(props.elem.countryField.options, label)}
                        value={oldValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                );
            default:
                console.log('Warning: Field type ' + elem.countryField.field.type + ' is not supported.');
                return null;
        }
    };

    return props.editable ? (
        generateField()
    ) : (
        <KeyValueRow>
            <Key>
                {lookup(props.elem.countryField.field.label)} {mandatory ? '*' : ''}
            </Key>
            <Value>
                {_.isNil(oldValue)
                    ? '-'
                    : type !== 'CHECKBOX'
                    ? oldValue
                    : oldValue === true
                    ? lookup('mrc.credittab.additionalFields.checked')
                    : '-'}
                {validation && validation === 'isPercentage' ? '%' : null}
            </Value>
        </KeyValueRow>
    );
}

AdditionalField.propTypes = {
    elem: RequestFieldPropTypes,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
};
