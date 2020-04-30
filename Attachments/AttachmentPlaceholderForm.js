import React, { Component } from 'react';
import './AttachmentsRows.scss';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations.js';
import * as Constants from './AttachmentsDefinition';

export default class AttachmentsPlaceholderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            file: null,
            fileType: null,
            showCollateralMeta: false,
            attachmentType: null,
            attachmentTypesLoaded: false,
        };
    }

    loadAttachmentTypes() {
        this.ALL_ATTACHMENT_TYPES_JSON = JSON.parse(Constants.ALL_ATTACHMENT_TYPES_JSON);
        this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY = this.ALL_ATTACHMENT_TYPES_JSON.attachment_types
            .filter(
                attType =>
                    attType.country.toLowerCase() === this.props.country.toLowerCase() ||
                    attType.country.toLowerCase() === 'all'
            )
            .filter(attType => this.props.fileTypes.includes(attType.type.toLowerCase()));
        this.setState({ attachmentTypesLoaded: true });
    }

    componentDidMount() {
        !this.state.attachmentTypesLoaded ? this.loadAttachmentTypes() : null;
        if (this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.length === 1) {
            this.handleFileTypeChange(this.props.fileTypes[0]);
        }
    }

    render() {
        return <div className="mrc-attachments">{this.createUploader(this.props.currentApprover)}</div>;
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
        !this.state.attachmentTypesLoaded ? this.loadAttachmentTypes() : null;
        return (
            <select
                name="file-type"
                id="select-file-type"
                value={this.state.fileType == null || this.state.fileType === '' ? '' : this.state.fileType}
                onChange={event => this.handleFileTypeChange(event.target.value)}
                disabled={this.props.readonly || (this.props.fileTypes && this.props.fileTypes.length === 1)}
                placeholder="File Type"
            >
                {this.createFileTypeOptions()}
            </select>
        );
    }

    handleFileTypeChange = value => {
        let attachmentFromJson = this.AVAILABLE_ATTACHMENT_TYPES_FOR_COUNTRY.filter(
            att => att.type.toLowerCase() === value
        )[0];

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

    createUploader() {
        if (
            this.props.hideUploader !== undefined &&
            this.props.hideUploader !== null &&
            this.props.hideUploader === true
        ) {
            return null;
        }
        return (
            <div className="mrc-add-attachment">
                <div className={'column'}>
                    <label name="selected-file-type" className="selected-file">
                        {lookup('mrc.attachments.fields.fileType')}:{' '}
                    </label>
                    {this.fileSelection()}
                </div>

                <button
                    className="mrc-btn mrc-secondary-button"
                    type="button"
                    name="upload-button"
                    onClick={() => this.props.savePlaceholder(this.state.fileType)}
                >
                    {lookup('mrc.file.upload')}
                </button>
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
}

AttachmentsPlaceholderForm.propTypes = {
    addAttachment: PropTypes.func,
    readonly: PropTypes.bool,
    currentApprover: PropTypes.string,
    fileTypes: PropTypes.array,
    country: PropTypes.string,
    hideUploader: PropTypes.bool,
    savePlaceholder: PropTypes.func,
};
