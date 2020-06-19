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
                return <NumberInput value={oldValue} onChange={onChange} />;
            case 'TEXT':
                return <TextInput value={oldValue} onChange={onChange} />;
            case 'TEXTAREA':
                return <TextArea value={oldValue} onChange={onChange} />;
            case 'DATE':
                return <DatePicker selected={parseDateForAdditionalField(oldValue)} onChange={onChange} />;
            case 'CHECKBOX':
                return <CheckBox checked={oldValue} onChange={onChange} />;
            case 'DROPDOWN':
                return (
                    <Select
                        options={getOptionValues(props.elem.countryField.options)}
                        value={oldValue}
                        onChange={onChange}
                    />
                );
            case 'DROPDOWN_MULTIPLE':
                return (
                    <MultipleSelect
                        options={getOptionValues(props.elem.countryField.options)}
                        value={getOptionValues(oldValue)}
                        onChange={onChange}
                    />
                );
            case 'RADIOBUTTON':
                return (
                    <RadioButtons
                        options={getOptionValues(props.elem.countryField.options)}
                        value={oldValue}
                        onChange={onChange}
                    />
                );
            default:
                console.log('Warning: Field type ' + elem.countryField.field.type + ' is not supported.');
                return null;
        }
    };

    const classForLabel = type === 'CHECKBOX' ? 'checkbox-label' : type === 'RADIOBUTTON' ? 'm-radioButton' : '';

    return props.editable ? (
        <div className={valid ? 'mrc-input' : 'mrc-input not-valid'}>
            <label className={classForLabel} htmlFor={props.elem.id}>
                {lookup(props.elem.countryField.field.label)} {mandatory ? '*' : ''}
            </label>
            {generateField()}
        </div>
    ) : (
        <KeyValueRow>
            <Key>
                {lookup(props.elem.countryField.field.label)} {mandatory ? '*' : ''}
            </Key>
            <Value>
                {_.isNil(oldValue) ? '-' : oldValue}
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
