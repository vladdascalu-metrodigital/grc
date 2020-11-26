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
import ModalDialog from '../ModalDialog';
import './index.scss';

export default class AdditionalFieldsSectionWithDialog extends React.Component {
    constructor(props) {
        super(props);
        const requestFields = getMapByIdWithValidAndElement(this.props.requestFields);
        const currentRequestFields = [];
        Object.values(requestFields).forEach((mapItem) => {
            const type = mapItem.item.countryField.field.type;
            const value = type === 'TEXTAREA' ? mapItem.item.textValue : mapItem.item.value;
            currentRequestFields.push({ id: mapItem.item.id, valid: mapItem.valid, value: value });
        });
        this.state = { requestFields: requestFields, currentRequestFields: currentRequestFields };
        if (this.props.onInit) this.props.onInit(Object.values(requestFields));
        this.toggleModal = this.toggleModal.bind(this);
        this.resetChangedAdditionalFields = this.resetChangedAdditionalFields.bind(this);
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

    additionalFieldOnChange = (elem, value) => {
        const oldValue = elem.countryField.field.type === 'TEXTAREA' ? elem.textValue : elem.value;
        if (!this.props.disabled && value !== oldValue) {
            const requestFields = this.state.requestFields;

            const type = elem.countryField.field.type;
            const valid =
                additionalFieldMandatoryIsValid(elem.countryField.mandatory, value) &&
                additionalFieldIsValid(elem.countryField.validation, type, value, elem.creationTimestamp);

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
        const stateFieldsList = [];
        const currentRequestFields = [];

        if (this.state.requestFields != null && this.state.requestFields !== undefined) {
            Object.keys(this.state.requestFields).forEach((key) => {
                const requestField = this.state.requestFields[key];
                const type = requestField.item.countryField.field.type;
                const value = type === 'TEXTAREA' ? requestField.item.textValue : requestField.item.value;
                currentRequestFields.push({ id: key, valid: requestField.valid, value: value });
                stateFieldsList.push(requestField.item);
            });
        }
        this.props
            .onChange(stateFieldsList)
            .then(() => this.setState({ currentRequestFields: currentRequestFields }))
            .catch(() => this.resetChangedAdditionalFields());
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
                        onChange={null}
                        disabled={true}
                        editable={edit}
                        valid={true}
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
    onInit: PropTypes.func,
    title: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};
