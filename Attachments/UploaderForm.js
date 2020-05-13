import React, { Component } from 'react';
import './UploaderForm.scss';

import PropTypes from 'prop-types';
import { lookup } from '../Util/translations.js';
import FileUpload from '../FileUpload';
import { NumberInput } from '../NumberInput/index';
import MrcDatePickerInput from '../DatePicker/index';

import AttachmentSpec from './spec.json';

import * as _ from 'lodash';

import { List, Map } from 'immutable';

const MAX_FILE_LENGTH = 50;

export default class UploaderForm extends Component {
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
        const _attachmentSpecList = AttachmentSpec.attachment_types
            .filter(
                attType =>
                    attType.country.toLowerCase() === this.props.country.toLowerCase() ||
                    attType.country.toLowerCase() === 'all'
            )
            .filter(attType => this.props.fileTypes.includes(attType.type.toLowerCase()));
        this.setState({
            attachmentSpecList: _attachmentSpecList,
        });
        if (_attachmentSpecList.length === 1) {
            this.handleFileTypeChange(this.props.fileTypes[0], _attachmentSpecList);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // File selection

    handleFileTypeChange(value, attachmentSpecList) {
        let attachmentSpec = List(attachmentSpecList).find(att => att.type.toLowerCase() === value);

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
        return _.isNil(attachmentSpecList)
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
                onChange={event => this.handleFileTypeChange(event.target.value, this.state.attachmentSpecList)}
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
        return this.props.onlyPlaceholder
            ? !_.isNil(fileType)
            : !_.isEmpty(title.trim()) &&
                  !_.isNil(this.state.file) &&
                  (!_.isEmpty(fileType) || fileTypes.length === 1) &&
                  fieldsFilledIn;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Metadata fields

    setField(value, field) {
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

    setDateField(event, field) {
        const withLeadingZero = n => (n <= 9 ? '0' + n : n);

        let formattedDate =
            event &&
            withLeadingZero(event.getDate()) + '.' + withLeadingZero(event.getMonth() + 1) + '.' + event.getFullYear();
        this.setField(formattedDate, field);
    }

    datePicker(id, minDate, maxDate, field) {
        const [day, month, year] = field.value ? field.value.split('.') : [null, null, null];
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
                    onChange={event => this.setDateField(event, field)}
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

        return this.datePicker(id, minDate, maxDate, field);
    }

    numberInput(id, field) {
        return (
            <div className="column" key={this.state.attachmentSpec.type + '.' + field.field_label + '_' + id}>
                <label name={field.field_label} className="selected-file">
                    {lookup(field.field_label)}
                </label>
                <NumberInput
                    className="m-input-element"
                    name="attachment-amount"
                    onBlur={event => {
                        const parsed = parseFloat(event.target.value);
                        this.setField(_.isNaN(parsed) ? null : parsed, field);
                    }}
                    onChange={() => null}
                    id={id}
                />
            </div>
        );
    }

    field(field, id) {
        return field
            ? field.data_type.toLowerCase() === 'date'
                ? this.datePickerField(field, id)
                : field.data_type.toLowerCase() === 'double'
                ? this.numberInput(id, field)
                : null
            : null;
    }

    fieldPair(field1, id1, field2, id2) {
        return (
            <div className="row" key={id1 + '_' + id2}>
                {[this.field(field1, id1), this.field(field2, id2)]}
            </div>
        );
    }

    metadataFields() {
        const showFields = allFields => {
            if (!allFields) {
                return;
            }

            return _.chunk(allFields, 2).map(([field1, field2], idx) =>
                this.fieldPair(field1, 2 * idx, field2, 2 * idx + 1)
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
                {this.props.onlyPlaceholder ? null : (
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
                )}

                <div className="row">
                    {this.props.onlyPlaceholder ? null : (
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
                                    (ext ? '.' : '') +
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
                    )}
                    {_.isNil(this.state.attachmentSpecList) ? null : (
                        <div className={'column'}>
                            <label name="selected-file-type" className="selected-file">
                                {lookup('mrc.attachments.fields.fileType')}:{' '}
                            </label>
                            {this.select(
                                this.props.fileTypes.length === 1 ? this.props.fileTypes[0] : this.state.fileType,
                                this.props.fileTypes,
                                this.state.attachmentSpecList
                            )}
                        </div>
                    )}
                </div>
                {this.props.onlyPlaceholder ? null : <div>{this.metadataFields()}</div>}
                <button
                    className="mrc-btn mrc-secondary-button"
                    type="button"
                    name="upload-button"
                    onClick={() => {
                        this.props.callback(
                            this.state.fileType || this.props.fileTypes[0],
                            this.state.file,
                            this.state.title,
                            this.state.expiryDate,
                            this.state.amount,
                            List(this.state.attachmentSpec.fields)
                                .filter(field => !field.field_in_db)
                                .map(field => {
                                    return { label: field.field_label, value: field.value };
                                })
                                .toArray()
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
                    {this.props.onlyPlaceholder ? lookup('mrc.attachments.addPlaceholder') : lookup('mrc.file.upload')}
                </button>
            </div>
        );

        return <div className="mrc-attachments">{uploader}</div>;
    }
}

UploaderForm.propTypes = {
    callback: PropTypes.func.isRequired,
    readonly: PropTypes.bool,
    fileTypes: PropTypes.array,
    country: PropTypes.string,
    hideUploader: PropTypes.bool,
    onlyPlaceholder: PropTypes.bool,
};
