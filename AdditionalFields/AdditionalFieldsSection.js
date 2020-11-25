import React from 'react';
import { PropTypes } from 'prop-types';
import { RequestFieldPropTypes } from './AdditionalFieldsPropTypes';
import { getMapByIdWithValidAndElement, orderRequestFields } from './additionalFielsUtil';
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
        const requestFields = getMapByIdWithValidAndElement(this.props.requestFields);
        this.state = { requestFields: requestFields };
        if (this.props.onInit) this.props.onInit(Object.values(requestFields));
    }

    static getDerivedStateFromProps(props, state) {
        let toUpdate = false;
        if (props.requestFields !== null && props.requestFields !== undefined) {
            props.requestFields.forEach((propRf) => {
                Object.keys(state.requestFields).forEach((key) => {
                    if (key === propRf.id) {
                        const rf = state.requestFields[key].item;
                        if (propRf.countryField.mandatory !== rf.countryField.mandatory) {
                            toUpdate = true;
                            const type = rf.countryField.field.type;
                            const value = type === 'TEXTAREA' ? rf.textValue : rf.value;
                            const valid =
                                additionalFieldMandatoryIsValid(propRf.countryField.mandatory, value) &&
                                additionalFieldIsValid(rf.countryField.validation, type, value, rf.creationTimestamp);
                            state.requestFields[rf.id] = {
                                valid: valid,
                                item: {
                                    ...rf,
                                    // textValue: propRf.textValue,
                                    // value: propRf.value,
                                    countryField: { ...rf.countryField, mandatory: propRf.countryField.mandatory },
                                },
                            };
                        }
                    }
                });
            });
            if (toUpdate) {
                return {
                    requestFields: state.requestFields,
                };
            }
        }
        return null;
    }

    additionalFieldOnChange = (elem, value) => {
        let { disabled, onChange } = this.props;
        const oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
        if (!disabled && value !== oldValue) {
            const valid =
                additionalFieldMandatoryIsValid(elem.countryField.mandatory, value) &&
                additionalFieldIsValid(
                    elem.countryField.validation,
                    elem.countryField.field.type,
                    value,
                    elem.creationTimestamp
                );

            if (elem.countryField.field.type === 'TEXTAREA') {
                elem.textValue = value;
            } else {
                elem.value = value;
            }

            const newRequestFields = this.state.requestFields;
            newRequestFields[elem.id].valid = valid;
            this.setState({
                requestFields: this.state.requestFields,
            });
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
                        valid={this.state.requestFields[elem.id].valid}
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
                        valid={true}
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
    onInit: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    editable: PropTypes.bool.isRequired,
};
