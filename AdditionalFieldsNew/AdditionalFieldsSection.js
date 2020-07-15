import React from 'react';
import { PropTypes } from 'prop-types';
import { RequestFieldPropTypes } from './AdditionalFieldsPropTypes';
import { orderRequestFields } from './additionalFielsUtil';
import { lookup } from '../Util/translations';
import ErrorHandler from '../ErrorHandler';
import AdditionalField from './AdditionalField';
import { additionalFieldIsValid, additionalFieldMandatoryIsValid } from './additionalFieldsValidation';
import BoxWithTitle from '../BoxWithTitle';
import KeyValueGroup from '../KeyValueGroup';
import './index.scss';

export default class AdditionalFieldsSection extends React.Component {
    constructor(props) {
        super(props);
        const requestFields = {};
        if (this.props.requestFields !== null && this.props.requestFields !== undefined) {
            this.props.requestFields.forEach((rf) => {
                const type = rf.countryField.field.type;
                const oldValue = type === 'TEXTAREA' ? rf.textValue : rf.value;
                const valid =
                    additionalFieldMandatoryIsValid(rf.countryField.mandatory, oldValue) &&
                    additionalFieldIsValid(rf.countryField.validation, type, oldValue, rf.creationTimestamp);
                requestFields[rf.id] = { valid: valid, item: rf };
            });
        }
        this.state = { requestFields: requestFields };
    }

    additionalFieldOnChange = (elem, value, valid) => {
        let { disabled, onChange } = this.props;
        const oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
        if (!disabled && value !== oldValue) {
            if (elem.countryField.field.type === 'TEXTAREA') {
                elem.textValue = value;
            } else {
                elem.value = value;
            }
            if (onChange) onChange(elem, valid);
        }
    };

    renderElements(elements) {
        return this.props.editable ? (
            <div className="mrc-credit-data mrc-input-group additional-fields-section">
                {elements.map((elem) => (
                    <AdditionalField
                        elem={elem}
                        key={elem.id}
                        onChange={this.additionalFieldOnChange}
                        disabled={this.props.disabled}
                        editable={this.props.editable}
                    />
                ))}
            </div>
        ) : (
            <KeyValueGroup>
                {elements.map((elem) => (
                    <AdditionalField
                        elem={elem}
                        key={elem.id}
                        onChange={this.additionalFieldOnChange}
                        disabled={this.props.disabled}
                        editable={this.props.editable}
                    />
                ))}
            </KeyValueGroup>
        );
    }

    render() {
        const elements = orderRequestFields(Object.values(this.state.requestFields).map((val) => val.item));
        return (
            <ErrorHandler>
                {this.props.title ? (
                    <BoxWithTitle title={lookup(this.props.title)} action={null}>
                        {this.renderElements(elements)}
                    </BoxWithTitle>
                ) : (
                    this.renderElements(elements)
                )}
            </ErrorHandler>
        );
    }
}

AdditionalFieldsSection.propTypes = {
    requestFields: PropTypes.arrayOf(RequestFieldPropTypes),
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    editable: PropTypes.bool.isRequired,
};
