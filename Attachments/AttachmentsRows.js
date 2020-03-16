import React, {Component} from 'react';
import './AttachmentsRows.scss';
import './attachments.scss';
import PropTypes from 'prop-types';
import {lookup} from '../Util/translations.js';
import FileUpload from '../FileUpload';
import {NumberInput} from '../NumberInput/index';
import MrcDatePickerInput from '../DatePicker/index';
//icons:
import DocIcon from '../icons/doc.svg';
import PdfIcon from '../icons/pdf.svg';
import CsvIcon from '../icons/csv.svg';
import XlsIcon from '../icons/xls.svg';
import TifIcon from '../icons/tif.svg';
import PngIcon from '../icons/png.svg';
import JpgIcon from '../icons/jpg.svg';
import UnknownIcon from '../icons/doc.svg'; //TODO : need to replace this with an general 'unknown' icon.

import * as Constants from './AttachmentsDefinition';

export default class AttachmentsRows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            file: null,
            fileType: null,
            attachmentExpiryDate: null,
            showCollateralMeta: false,
            attachmentAmount: null,
            attachmentType: null,
        };
        //this.FILE_TYPES_TRANSLATION_KEYS = props.fileTypes;
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    }

    componentDidMount() {
        this.ALL_ATTACHMENT_TYPES_JSON = JSON.parse(Constants.ALL_ATTACHMENT_TYPES_JSON);

        this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY = this.ALL_ATTACHMENT_TYPES_JSON.attachment_types
            .filter(
                attType =>
                    attType.country.toLowerCase() === this.props.country.toLowerCase() ||
                    attType.country.toLowerCase() === 'all'
            )
            .filter(attType => this.props.fileTypes.includes(attType.type.toLowerCase()));
    }

    render() {
        const noAttachmentsGiven = !(this.props.data && this.props.data.length > 0);
        if (noAttachmentsGiven) {
            return (
                <div className="mrc-attachments">
                    <div className="mrc-detail">{lookup('mrc.attachments.noattachments')}</div>
                    {this.createUploader(this.props.currentApprover)}
                </div>
            );
        } else {
            return (
                <div className="mrc-attachments">
                    <div className="mrc-attachment-group col-2">{this.props.data.map(this.createRow)}</div>
                    {this.createUploader(this.props.currentApprover)}
                </div>
            );
        }
    }

    shortenFileName(name, maxLength) {
        let array = name.split('.');
        let result = '';
        let ext = '';

        if (array.length >= 2) {
            ext = array[array.length - 1];
            result = name.substring(0, name.length - ext.length - 1);
        } else {
            result = name;
        }

        result = result.substring(0, maxLength);

        if (ext.length > 0) {
            result += '.' + ext;
        }

        return result;
    }

    fileSelection() {
        return (
            <select
                name="file-type"
                id="select-file-type"
                value={this.state.fileType == null || this.state.fileType === '' ? '' : this.state.fileType}
                onChange={this.handleFileTypeChange}
                disabled={this.props.readonly || (this.props.fileTypes && this.props.fileTypes.length === 1)}
                placeholder="File Type"
            >
                {this.createFileTypeOptions()}
            </select>
        );
    }

    createUploader(currentApprover) {
        if (
            this.props.hideUploader !== undefined &&
            this.props.hideUploader !== null &&
            this.props.hideUploader === true
        ) {
            return null;
        }
        const maxFileNameLength = 50;
        const classNameOfTypeOptions =
            this.props.fileTypes && this.props.fileTypes.length > 1 ? 'column' : 'hiddenColumn';
        let mandatoryFields = this.checkMandatoryFields();
        let readyToSend =
            this.state.title.trim().length > 0 &&
            this.state.file !== null &&
            ((this.state.fileType !== null && this.state.fileType !== '') ||
                (this.props.fileTypes !== null && this.props.fileTypes.length === 1)) &&
            mandatoryFields;
        let isCcWithOnlyGeneral = currentApprover === 'CC' && this.checkForOnlyGeneralFileType();

        return (
            <div className="mrc-add-attachment">
                <FileUpload
                    labelSelect={lookup('mrc.file.select')}
                    updateFile={this.updateFile}
                    selectDisabled={this.props.readonly}
                    uploadDisabled={!readyToSend}
                />

                <div className="row">
                    <div className="column">
                        <label name="selected-file" className="selected-file">
                            {lookup('mrc.attachments.fields.file')}: {this.state.file && this.state.file.name}
                        </label>
                        <br/>
                        <input
                            maxLength={maxFileNameLength}
                            className="m-input-element"
                            name="title"
                            type="text"
                            value={this.shortenFileName(this.state.title, maxFileNameLength)}
                            onChange={this.updateTitle}
                            disabled={this.props.readonly}
                            placeholder="Title"
                        />
                    </div>
                    {isCcWithOnlyGeneral ? this.createStateForCC(currentApprover) : (
                        <div className={classNameOfTypeOptions}>
                            <label name="selected-file-type" className="selected-file">
                                {lookup('mrc.attachments.fields.fileType')}:{' '}
                            </label>
                            <br/>
                            {this.fileSelection()}
                        </div>
                    )}
                </div>
                <div>{this.crateAttachmentTypesFields()}</div>

                <button
                    className="mrc-btn mrc-secondary-button"
                    type="button"
                    name="upload-button"
                    onClick={this.sendFile}
                    disabled={!readyToSend}
                >
                    {lookup('mrc.file.upload')}
                </button>
            </div>
        );
    }

    checkForOnlyGeneralFileType = () => {
        return this.props.fileTypesForCC && this.props.fileTypesForCC.length === 1
            && this.props.fileTypesForCC == 'general';
    };

    //when send back to CC from approval-service
    createStateForCC = (approver) => {
        if (!this.state.fileType) {
            this.setState({
                fileType: 'general',
                attachmentType: {type: 'general'}
            });
        }
    };

    crateAttachmentTypesFields() {
        if (this.state.showCollateralMeta) {
            let allFields = this.state.attachmentType.fields;
            if (!allFields) return;

            let fields = [];
            let i,
                j = 0;
            for (i = 0; i < allFields.length; i++) {
                if (i % 2 === 0) {
                    fields[j] = this.createMetadataRow(allFields[i], i, allFields[i + 1], i + 1);
                    j++;
                }
            }
            return fields;
        }
        return null;
    }

    createMetadataRow(field1, id1, field2, id2) {
        let returnValue = [];
        returnValue[0] = this.createMetadataField(field1, id1);
        returnValue[1] = this.createMetadataField(field2, id2);
        return (
            <div className="row" key={id1 + '_' + id2}>
                {returnValue}
            </div>
        );
    }

    createMetadataField(field, id) {
        if (field) {
            let reactField;
            if (field.data_type.toLowerCase() === 'date') {
                let minDate = null,
                    maxDate = null;
                if (field.validation_operation.toLowerCase() === 'less_than_and_equals') {
                    maxDate = new Date();
                } else if (field.validation_operation.toLowerCase() === 'greater_than_and_equals') {
                    minDate = new Date(); //new Date(minDate.getTime() + 86400000); // add 1 day in ms
                } else if (field.validation_operation.toLowerCase() === 'greater_than') {
                    minDate = new Date(new Date().getTime() + 86400000); // add 1 day in ms
                } else if (field.validation_operation.toLowerCase() === 'less_than') {
                    maxDate = new Date(new Date().getTime() - 86400000);
                }
                reactField = this.createDatePicker(id, minDate, maxDate, field);
            } else if (field.data_type.toLowerCase() === 'double') {
                reactField = this.createNumberInput(id, field);
            }
            return reactField;
        } else {
            return null;
        }
    }

    createDatePicker(id, minDate, maxDate, field) {
        let value = this.getFieldValueFromAttachmentType(field);
        let selectedDate = value;
        // let dateParser;
        // if (value) {
        //     dateParser = value.split('.');
        //     selectedDate = new Date(dateParser[2], dateParser[1] - 1, dateParser[0]);
        // }
        return (
            <div
                className="column attachments-date-picker"
                key={this.state.attachmentType.type + '.' + field.field_label + '_' + id}
            >
                <label name={field.field_label} className="selected-file">
                    {lookup(field.field_label)}
                </label>
                <br/>
                <MrcDatePickerInput
                    className="m-input-element"
                    onChange={event => this.handleDatePickerChange(event, field)}
                    selected={selectedDate ? new Date(selectedDate) : null} //to check this
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
            <div className="column" key={this.state.attachmentType.type + '.' + field.field_label + '_' + id}>
                <label name={field.field_label} className="selected-file">
                    {lookup(field.field_label)}
                </label>
                <br/>
                <NumberInput
                    className="m-input-element"
                    name="attachment-amount"
                    onBlur={event => this.handleAttachmentAmountChangeOnBlur(event, field)}
                    onChange={this.handleAttachmentAmountChange}
                    id={id}
                />
            </div>
        );
    }

    createFileTypeOptions() {
        if (this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY && this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.length > 0) {
            if (
                (this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY &&
                    this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.length === 1) ||
                this.state.fileType != null
            ) {
                return this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.map(this.toOption);
            } else {
                return [<option key="null">{lookup('mrc.attachments.choose')}</option>].concat(
                    this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.map(this.toOption)
                );
            }
        } else {
            return null;
        }
    }

    toOption(t) {
        return (
            <option key={t.type} value={t.type.toLowerCase()}>
                {lookup(t.label)}
            </option>
        );
    }

    createRow = item => {
        if (!item) {
            return null;
        }
        return (
            <div className="mrc-attachment" key={item.id}>
                {this.displayIcon(item)}
                <span onClick={this.downloadFile.bind(this, item)}>
                    <h4 className="attachment-title">
                        <span className="fileType">
                            {lookup('mrc.attachments.types.' + item.fileType.toLowerCase().replace(' ', '_'))}
                        </span>{' '}
                        <span>{item.title}</span>
                    </h4>
                    {this.displayCollateralsMeta(item)}
                    <h4 className="attachment-collaterals-meta"> </h4>
                    <h4>
                        <mrc-datetime class="datetime">{item.uploadTimestamp}</mrc-datetime>
                        <span className="author">
                            {' '}
                            {item.uploaderPrincipalName} ({item.uploaderPosition}){' '}
                        </span>
                    </h4>
                    {this.displayMetadataJson(item)}
                </span>
            </div>
        );
    };

    displayIcon(item) {
        return (
            <img className="mrc-icon-large" src={this.getIcon(item).src} alt={this.getIcon(item).extension + ' File'}/>
        );
    }

    displayCollateralsMeta(item) {
        var dateString = item.expiryDate == null ? '' : new Date(item.expiryDate).toLocaleDateString();
        return (
            <h4 className="attachment-collaterals-meta">
                {item.expiryDate && true ? (
                    <span>
                        {lookup('mrc.attachment.expiry-date')}: {dateString}{' '}
                    </span>
                ) : null}
                {item.amount ? (
                    <span>
                        {lookup('mrc.attachment.amount')}:{' '}
                        <mrc-number dynamic={true} show-currency-for-country={this.props.country}>
                            {item.amount}
                        </mrc-number>
                    </span>
                ) : null}
            </h4>
        );
    }

    displayMetadataJson(item) {
        let rez = [];
        if (item.metadataJson != undefined && item.metadataJson != null && item.metadataJson !== '') {
            let metadataObject = JSON.parse(item.metadataJson);
            if (
                metadataObject != undefined &&
                metadataObject != null &&
                metadataObject.fields != undefined &&
                metadataObject.fields != null &&
                metadataObject.fields.length != null &&
                metadataObject.fields.length > 0
            ) {
                metadataObject.fields
                    .filter(
                        field =>
                            field.field_in_db === undefined ||
                            (field.field_in_db !== null && field.field_in_db == 'metadata_json')
                    )
                    .forEach(field => rez.push(this.displayFieldMetadata(field)));
            }
        }
        return rez;
    }

    displayFieldMetadata(field) {
        let fieldValueString =
            field.data_type && field.data_type.toLowerCase() == 'date'
                ? new Date(field.value).toLocaleDateString()
                : field.value;
        return (
            <h4 className="attachment-collaterals-meta" key={field.field_label}>
                {field.value ? (
                    <span>
                        {lookup(field.field_label)}: {fieldValueString}
                    </span>
                ) : null}
            </h4>
        );
    }

    downloadFile(item) {
        window.open(item.contentUri, '_blank');
    }

    getIcon(item) {
        const re = /(?:\.([^.]+))?$/;
        const extension = re.exec(item.filename)[1];
        if (extension === 'doc' || extension === 'docx') {
            return {src: DocIcon, extension: extension};
        } else if (extension === 'pdf') {
            return {src: PdfIcon, extension: extension};
        } else if (extension === 'csv') {
            return {src: CsvIcon, extension: extension};
        } else if (extension === 'xls' || extension === 'xlsx') {
            return {src: XlsIcon, extension: extension};
        } else if (extension === 'tif') {
            return {src: TifIcon, extension: extension};
        } else if (extension === 'png') {
            return {src: PngIcon, extension: extension};
        } else if (extension === 'jpg') {
            return {src: JpgIcon, extension: extension};
        } else {
            //We need an icon for unknown file types.
            return {src: UnknownIcon, extension: extension};
        }
    }

    createTs(ts) {
        return (
            <div className="registration-date">
                <mrc-datetime>{ts}</mrc-datetime>
            </div>
        );
    }

    updateFile = file => {
        if (this.state.title.trim().length > 0) {
            this.setState({...this.state, file: file});
        } else {
            this.setState({...this.state, title: file.name, file: file});
        }
    };

    sendFile = () => {
        let fileType = this.state.fileType;
        if (fileType === null) fileType = this.props.fileTypes[0];

        // let fieldsForBackEnd = [];
        // let fieldsInState = this.state.attachmentType.fields;
        // for (let i = 0; i < fieldsInState.length; i++) {
        //     fieldsForBackEnd [i] = {value: fieldsInState[i].value, data_type: fieldsInState[i].data_type};
        // }

        this.props.addAttachment(
            this.state.file,
            this.state.title,
            fileType,
            this.state.attachmentExpiryDate,
            this.state.attachmentAmount,
            this.state.attachmentType
        );

        this.setState({
            title: '',
            file: null,
            fileType: null,
            showCollateralMeta: false,
            attachmentAmount: 0,
            attachmentExpiryDate: null,
            attachmentType: null,
        });
    };

    updateTitle = evt => {
        evt.preventDefault();
        this.setState({...this.state, title: evt.target.value});
    };

    handleFileTypeChange = event => {
        let attachmentFromJson = this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.filter(
            att => att.type.toLowerCase() === event.target.value)[0];

        let showCollateralMeta = false;
        if (attachmentFromJson.fields) showCollateralMeta = true;

        for (let i = 0; attachmentFromJson.fields && i < attachmentFromJson.fields.length; i++) {
            if (attachmentFromJson.fields[i].value) {
                attachmentFromJson.fields[i].value = null;
            }
        }

        this.setState({
            ...this.state,
            fileType: attachmentFromJson.type,
            showCollateralMeta: showCollateralMeta,
            attachmentType: attachmentFromJson,
            attachmentExpiryDate: null,
            attachmentAmount: null,
        });
    };

    handleAttachmentAmountChangeOnBlur = (event, field) => {
        this.addFieldValueOnState(parseFloat(event.target.value), field);
    };

    handleAttachmentAmountChange = () => {
        null;
    };

    handleDatePickerChange = (event, field) => {
        let formattedDate = event; // && this.appendLeadingZeroes(event.getDate()) + "." + this.appendLeadingZeroes(event.getMonth() + 1) + "." + event.getFullYear();
        this.addFieldValueOnState(formattedDate, field);
    };

    addFieldValueOnState = (value, field) => {
        let attachmentTypeArr = this.state.attachmentType || [];
        let index = attachmentTypeArr.fields.indexOf(field);
        let expiryDate = this.state.attachmentExpiryDate;
        let attachmentAmount = this.state.attachmentAmount;
        if (index > -1) {
            attachmentTypeArr.fields[index].value =
                field.data_type && field.data_type.toLowerCase() === 'date' ? value.valueOf() : value;
        }

        if (field.field_in_db && field.field_in_db === 'expiry_date') {
            //can be only one field_in_db = expiry_date per attachment type
            expiryDate = value;
        } else if (field.field_in_db && field.field_in_db === 'amount') {
            //can be only one field_in_db = amount per attachment type
            attachmentAmount = value;
        }
        this.setState({
            ...this.state,
            attachmentType: attachmentTypeArr,
            attachmentExpiryDate: expiryDate,
            attachmentAmount: attachmentAmount,
        });
    };

    checkMandatoryFields = () => {
        let fieldsToCheckArr =
            this.state.attachmentType &&
            this.state.attachmentType.fields &&
            this.state.attachmentType.fields.filter(elem => elem.mandatory === true);

        for (let i = 0; fieldsToCheckArr && i < fieldsToCheckArr.length; i++) {
            if (
                fieldsToCheckArr[i].value === undefined ||
                fieldsToCheckArr[i].value === null ||
                fieldsToCheckArr[i].value === ''
            ) {
                return false;
            }
        }
        return true;
    };

    getFieldValueFromAttachmentType = field => {
        let index = this.state.attachmentType.fields.indexOf(field);
        return this.state.attachmentType.fields[index].value;
    };

    appendLeadingZeroes = n => {
        if (n <= 9) {
            return '0' + n;
        }
        return n;
    };
}

AttachmentsRows.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool,
    currentApprover: PropTypes.string,
    fileTypes: PropTypes.Array,
    country: PropTypes.string,
    hideUploader: PropTypes.bool,
};
