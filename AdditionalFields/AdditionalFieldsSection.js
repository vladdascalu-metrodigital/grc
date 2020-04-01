import React from 'react';
import { PropTypes } from 'prop-types';
import { RequestFieldPropTypes } from './AdditionalFieldsPropTypes';
import { orderRequestFields } from './additionalFielsUtil';
import { lookup } from '../Util/translations';
import ErrorHandler from '../ErrorHandler';
import AdditionalField from './AdditionalField';
import { additionalFieldIsValid, additionalFieldMandatoryIsValid } from './additionalFieldsValidation';
import './index.scss';

export default class AdditionalFieldsSection extends React.Component {
    constructor(props) {
        super(props);
        const requestFields = {};
        if (props.requestFields !== null && props.requestFields !== undefined) {
            props.requestFields.forEach(rf => {
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

    componentDidMount() {
        if (!this.props.disabled && this.state && this.state.requestFields) {
            Object.values(this.state.requestFields)
                .filter(val => !val.valid)
                .forEach(val => {
                    this.props.onChange(val.item, val.valid);
                });
        }
    }

    additionalFieldOnChange = (elem, value, valid) => {
        const oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
        if (!this.props.disabled && value !== oldValue) {
            if (elem.countryField.field.type === 'TEXTAREA') {
                elem.textValue = value;
            } else {
                elem.value = value;
            }

            this.props.onChange(elem, valid);
        }
    };

    additionalFieldOnBlur = (elem, valid) => {
        if (!this.props.disabled) {
            this.props.onBlur(elem, valid);
        }
    };

    render() {
        const elements = orderRequestFields(Object.values(this.state.requestFields).map(val => val.item));
        return (
            <ErrorHandler>
                {this.props.title ? (
                    <span className="additional-fields-background-text" title={lookup(this.props.title)}></span>
                ) : null}
                <div className="mrc-credit-data mrc-input-group additional-fields-section">
                    {elements.map(elem => (
                        <AdditionalField
                            elem={elem}
                            key={elem.id}
                            onChange={this.additionalFieldOnChange}
                            onBlur={this.additionalFieldOnBlur}
                            disabled={this.props.disabled}
                        />
                    ))}
                </div>
            </ErrorHandler>
        );
    }
}

AdditionalFieldsSection.propTypes = {
    requestFields: PropTypes.arrayOf(RequestFieldPropTypes),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};
