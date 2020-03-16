import React, { Component } from 'react';
import './index.scss';
import './attachments.scss';
import AttachmentsRows from './AttachmentsRows';
import PropTypes from 'prop-types';

export default class Attachments extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', file: null };
    }

    render() {
        const { data, readonly, country, fileTypes, addAttachment, currentApprover, fileTypesForCC} = this.props;
        const hideUploader =
            this.props.hideUploader !== undefined &&
            this.props.hideUploader !== null &&
            this.props.hideUploader === true;
        return (
            <AttachmentsRows
                data={data}
                readonly={readonly}
                addAttachment={addAttachment}
                fileTypes={fileTypes}
                fileTypesForCC={fileTypesForCC}
                country={country}
                currentApprover={currentApprover}
                hideUploader={hideUploader}
            />
        );
    }
}

Attachments.propTypes = {
    country: PropTypes.string,
    fileTypes: PropTypes.array,
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool,
    currentApprover: PropTypes.string,
    hideUploader: PropTypes.bool,
};
