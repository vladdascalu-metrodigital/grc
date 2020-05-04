import React, { Component } from 'react';
import './AttachmentsRows.scss';

import PropTypes from 'prop-types';
import { lookup } from '../Util/translations.js';
import FileUpload from '../FileUpload';
import { NumberInput } from '../NumberInput/index';
import MrcDatePickerInput from '../DatePicker/index';

import AttachmentSpec from './spec.json';

import * as _ from 'lodash';

import { List, Map } from 'immutable';

const MAX_FILE_LENGTH = 50;

export default class AttachmentsRows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            file: null,
            fileType: null,
            expiryDate: null,
            showMetadata: false,
            amount: null,
            attachmentSpecList: null,
        };
    }

    componentDidMount() {
        this.setState({
            attachmentSpecList: AttachmentSpec.attachment_types
                .filter(
                    attType =>
                        attType.country.toLowerCase() === this.props.country.toLowerCase() ||
                        attType.country.toLowerCase() === 'all'
                )
                .filter(attType => this.props.fileTypes.includes(attType.type.toLowerCase())),
        });
        if (this.state.attachmentSpecList === 1) {
            this.handleFileTypeChange(this.props.fileTypes[0]);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // File selection

    handleFileTypeChange(value) {
        let attachmentSpec = List(this.state.attachmentSpecList).find(att => att.type.toLowerCase() === value);

        this.setState({
            ...this.state,
            fileType: attachmentSpec.type,
            showMetadata: !_.isNil(attachmentSpec.fields),
            attachmentSpec: {
                ...attachmentSpec,
                fields: attachmentSpec.fields
                    ? attachmentSpec.fields.map(field => {
                          return { ...field, value: null };
                      })
                    : null,
            },
            expiryDate: null,
            amount: null,
        });
    }

    options(fileType, attachmentSpecList) {
        const option = spec => (
            <option key={spec.type} value={spec.type.toLowerCase()}>
                {lookup(spec.label)}
            </option>
        );
        return _.isEmpty(attachmentSpecList)
            ? null
            : attachmentSpecList.length === 1 || !_.isNil(fileType)
            ? attachmentSpecList.map(option)
            : [<option key="null">{lookup('mrc.attachments.choose')}</option>].concat(attachmentSpecList.map(option));
    }

    select(fileType, fileTypes, attachmentSpecList) {
        return (
            <select
                name="file-type"
                id="select-file-type"
                value={_.isEmpty(fileType) ? '' : fileType}
                onChange={event => this.handleFileTypeChange(event.target.value)}
                disabled={this.props.readonly || fileTypes.length === 1}
            >
                {this.options(fileType, attachmentSpecList)}
            </select>
        );
    }

    readyToSend(fields, title, fileType, fileTypes) {
        const fieldsFilledIn = fields
            ? List(fields)
                  .filter(e => e && e.mandatory && _.isNil(e.value))
                  .isEmpty()
            : true;
        return (
            !_.isEmpty(title.trim()) &&
            !_.isNil(this.state.file) &&
            (!_.isEmpty(fileType) || fileTypes.length === 1) &&
            fieldsFilledIn
        );
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Metadata fields

    updateAttachmentState(value, field) {
        if (!this.state.attachmentSpec) {
            return;
        }

        let _attachmentSpec = this.state.attachmentSpec;

        let _value = field.data_type.toLowerCase() === 'date' ? value.valueOf() : value;

        let _fields = _attachmentSpec.fields.map(_field =>
            Map(_field).equals(Map(field)) ? { ..._field, value: _value } : _field
        );

        this.setState({
            ...this.state,
            attachmentSpec: { ..._attachmentSpec, fields: _fields },
            expiryDate: field.field_in_db === 'expiry_date' ? value : this.state.expiryDate,
            amount: field.field_in_db === 'amount' ? value : this.state.amount,
        });
    }

    handleDatePickerChange(event, field) {
        const withLeadingZero = n => (n <= 9 ? '0' + n : n);

        let formattedDate =
            event &&
            withLeadingZero(event.getDate()) + '.' + withLeadingZero(event.getMonth() + 1) + '.' + event.getFullYear();
        this.updateAttachmentState(formattedDate, field);
    }

    createDatePicker(id, minDate, maxDate, field) {
        const [year, month, day] = field.value ? field.value.split('.') : [null, null, null];
        const selectedDate = field.value ? new Date(year, month - 1, day) : null;
        return (
            <div
                className="column attachments-date-picker"
                key={this.state.attachmentSpec.type + '.' + field.field_label + '_' + id}
            >
                <label name={field.field_label} className="selected-file">
                    {lookup(field.field_label)}
                </label>
                <MrcDatePickerInput
                    className="m-input-element"
                    onChange={event => this.handleDatePickerChange(event, field)}
                    selected={selectedDate ? selectedDate : null} //to check this
                    minDate={minDate}
                    maxDate={maxDate}
                    showYearDropdown={true}
                    dateFormat={'dd.MM.yyyy'}
                    placeholderText={'dd.MM.yyyy'}
                    id={id}
                />
            </div>
        );
    }

    createNumberInput(id, field) {
        return (
            <div className="column" key={this.state.attachmentSpec.type + '.' + field.field_label + '_' + id}>
                <label name={field.field_label} className="selected-file">
                    {lookup(field.field_label)}
                </label>
                <NumberInput
                    className="m-input-element"
                    name="attachment-amount"
                    onBlur={event => this.updateAttachmentState(parseFloat(event.target.value), field)}
                    onChange={() => null}
                    id={id}
                />
            </div>
        );
    }

    datePickerField(field, id) {
        const minDate =
            field.validation_operation.toLowerCase() === 'greater_than_and_equals'
                ? new Date()
                : field.validation_operation.toLowerCase() === 'greater_than'
                ? new Date(new Date().getTime() + 86400000)
                : null;
        const maxDate =
            field.validation_operation.toLowerCase() === 'less_than_and_equals'
                ? new Date()
                : field.validation_operation.toLowerCase() === 'less_than'
                ? new Date(new Date().getTime() - 86400000)
                : null;

        return this.createDatePicker(id, minDate, maxDate, field);
    }

    metadataField(field, id) {
        return field
            ? field.data_type.toLowerCase() === 'date'
                ? this.datePickerField(field, id)
                : field.data_type.toLowerCase() === 'double'
                ? this.createNumberInput(id, field)
                : null
            : null;
    }

    createMetadataRow(field1, id1, field2, id2) {
        return (
            <div className="row" key={id1 + '_' + id2}>
                {[this.metadataField(field1, id1), this.metadataField(field2, id2)]}
            </div>
        );
    }

    additionalFields() {
        const showFields = allFields => {
            if (!allFields) return;

            return _.chunk(allFields, 2).map(([field1, field2], idx) =>
                this.createMetadataRow(field1, 2 * idx, field2, 2 * idx + 1)
            );
        };
        return this.state.showMetadata ? showFields(this.state.attachmentSpec.fields) : null;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Render

    render() {
        const [fileName, ext] = _.split(this.state.title, '.');

        const uploader = this.props.hideUploader ? null : (
            <div className="mrc-add-attachment">
                <FileUpload
                    labelSelect={lookup('mrc.file.select')}
                    updateFile={file => this.setState({ ...this.state, title: file.name, file: file })}
                    uploadDisabled={
                        !this.readyToSend(
                            _.get(this.state, 'attachmentSpec.fields'),
                            this.state.title,
                            this.state.fileType,
                            this.props.fileTypes
                        )
                    }
                    selectDisabled={this.props.readonly}
                />

                <div className="row">
                    <div className="column">
                        <label name="selected-file" className="selected-file">
                            {lookup('mrc.attachments.fields.file')}: {_.get(this.state, 'file.name')}
                        </label>
                        <input
                            maxLength={MAX_FILE_LENGTH}
                            className="m-input-element"
                            name="title"
                            type="text"
                            value={
                                (fileName ? fileName.substring(0, MAX_FILE_LENGTH) : '') +
                                (fileName ? '.' : '') +
                                (ext ? ext : '')
                            }
                            onChange={event => {
                                event.preventDefault();
                                this.setState({ ...this.state, title: event.target.value });
                            }}
                            disabled={this.props.readonly}
                            placeholder="Title"
                        />
                    </div>
                    <div className={'column'}>
                        <label name="selected-file-type" className="selected-file">
                            {lookup('mrc.attachments.fields.fileType')}:{' '}
                        </label>
                        {this.select(this.state.fileType, this.props.fileTypes, this.state.attachmentSpecList)}
                    </div>
                </div>
                <div>{this.additionalFields()}</div>
                <button
                    className="mrc-btn mrc-secondary-button"
                    type="button"
                    name="upload-button"
                    onClick={() => {
                        this.props.addAttachment(
                            this.state.file,
                            this.state.title,
                            this.state.fileType || this.props.fileTypes[0],
                            this.state.expiryDate,
                            this.state.amount,
                            this.state.attachmentSpec
                        );
                        this.setState({
                            title: '',
                            file: null,
                            fileType: null,
                            showMetadata: false,
                            amount: 0,
                            expiryDate: null,
                            attachmentSpec: null,
                        });
                    }}
                    disabled={
                        !this.readyToSend(
                            _.get(this.state, 'attachmentSpec.fields'),
                            this.state.title,
                            this.state.fileType,
                            this.props.fileTypes
                        )
                    }
                >
                    {lookup('mrc.file.upload')}
                </button>
            </div>
        );

        return <div className="mrc-attachments">{uploader}</div>;
    }
}

AttachmentsRows.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    readonly: PropTypes.bool,
    currentApprover: PropTypes.string,
    fileTypes: PropTypes.array,
    country: PropTypes.string,
    hideUploader: PropTypes.bool,
};
