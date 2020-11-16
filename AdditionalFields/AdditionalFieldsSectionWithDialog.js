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
import ModalDialog from '../ModalDialog';
import './index.scss';

export default class AdditionalFieldsSectionWithDialog extends React.Component {
    constructor(props) {
        super(props);
        const requestFields = {};
        const currentRequestFields = [];
        if (this.props.requestFields !== null && this.props.requestFields !== undefined) {
            this.props.requestFields.forEach((rf) => {
                const type = rf.countryField.field.type;
                const oldValue = type === 'TEXTAREA' ? rf.textValue : rf.value;
                const valid =
                    additionalFieldMandatoryIsValid(rf.countryField.mandatory, oldValue) &&
                    additionalFieldIsValid(rf.countryField.validation, type, oldValue, rf.creationTimestamp);
                requestFields[rf.id] = { valid: valid, item: rf };
                currentRequestFields.push({ id: rf.id, valid: valid, value: oldValue });
            });
        }
        this.state = { requestFields: requestFields, currentRequestFields: currentRequestFields };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
    }

    isAllValid() {
        return Object.values(this.state.requestFields).every((field) => {
            return field.valid;
        });
    }

    resetChangedAdditionalFields() {
        const requestFields = {};
        this.state.currentRequestFields.forEach((field) => {
            let requestField = this.state.requestFields[field.id];
            const type = requestField.item.countryField.field.type;
            const oldValue = field.value;
            requestField.valid = field.valid;
            if (type === 'TEXTAREA') {
                requestField.item.textValue = oldValue;
            } else {
                requestField.item.value = oldValue;
            }
            requestFields[field.id] = requestField;
        });
        this.setState({ requestFields: requestFields });
    }

    modalDialogContent() {
        const elements = orderRequestFields(Object.values(this.state.requestFields).map((val) => val.item));
        return (
            <div>
                {this.renderElements(elements, true)}
                <div className="mrc-btn-group">
                    <button
                        type="button"
                        className="mrc-btn mrc-primary-button mrc-ui-button-small"
                        onClick={() => {
                            this.onSave();
                            this.toggleModal();
                        }}
                        disabled={!this.isAllValid()}
                    >
                        {lookup('mrc.additionalFields.save')}
                    </button>
                    <button
                        type="button"
                        className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary"
                        onClick={() => {
                            this.resetChangedAdditionalFields();
                            this.toggleModal();
                        }}
                    >
                        {lookup('mrc.additionalFields.cancel')}
                    </button>
                </div>
            </div>
        );
    }

    additionalFieldOnChange = (elem, value, valid) => {
        const oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
        if (!this.props.disabled && value !== oldValue) {
            let requestFields = this.state.requestFields;
            if (elem.countryField.field.type === 'TEXTAREA') {
                elem.textValue = value;
                requestFields[elem.id].item.textValue = value;
                requestFields[elem.id].valid = valid;
            } else {
                elem.value = value;
                requestFields[elem.id].item.value = value;
                requestFields[elem.id].valid = valid;
            }
            this.setState({ requestFields: requestFields });
        }
    };

    onSave() {
        this.props.onChange(this.state.requestFields);
        const requestFields = {};
        const currentRequestFields = [];
        if (this.state.requestFields !== null && this.state.requestFields !== undefined) {
            this.state.requestFields.forEach((rf) => {
                const type = rf.countryField.field.type;
                const oldValue = type === 'TEXTAREA' ? rf.textValue : rf.value;
                const valid =
                    additionalFieldMandatoryIsValid(rf.countryField.mandatory, oldValue) &&
                    additionalFieldIsValid(rf.countryField.validation, type, oldValue, rf.creationTimestamp);
                requestFields[rf.id] = { valid: valid, item: rf };
                currentRequestFields.push({ id: rf.id, valid: valid, value: oldValue });
            });
        }
        this.setState({ currentRequestFields: currentRequestFields });
    }

    renderElements(elements, edit) {
        return edit ? (
            <div className="mrc-credit-data mrc-input-group additional-fields-section">
                {elements.map((elem) => (
                    <AdditionalField
                        elem={elem}
                        key={elem.id}
                        onChange={this.additionalFieldOnChange}
                        disabled={false}
                        editable={edit}
                    />
                ))}
            </div>
        ) : (
            <KeyValueGroup>
                {elements.map((elem) => (
                    <AdditionalField
                        elem={elem}
                        key={elem.id}
                        onChange={null}
                        disabled={true}
                        editable={edit}
                        showMissingValueValidationMessage={true}
                    />
                ))}
            </KeyValueGroup>
        );
    }

    render() {
        const elements = orderRequestFields(Object.values(this.state.requestFields).map((val) => val.item));
        return (
            <ErrorHandler>
                <BoxWithTitle
                    title={lookup(this.props.title)}
                    action={
                        !this.props.disabled
                            ? {
                                  title: lookup('mrc.credittab.additionalFieldsEdit'),
                                  fn: this.toggleModal,
                              }
                            : null
                    }
                >
                    {this.renderElements(elements, false)}
                    {this.state.isModalVisible ? (
                        <ModalDialog
                            toggle={() => {
                                this.resetChangedAdditionalFields();
                                this.toggleModal();
                            }}
                            content={this.modalDialogContent()}
                            title={lookup('mrc.additionalFields.modaltitle')}
                        />
                    ) : null}
                </BoxWithTitle>
            </ErrorHandler>
        );
    }
}

AdditionalFieldsSectionWithDialog.propTypes = {
    requestFields: PropTypes.arrayOf(RequestFieldPropTypes),
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};
