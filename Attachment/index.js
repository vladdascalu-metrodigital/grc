import React, { Component } from 'react';
import Attachment from './Attachment';
import ModalDialog from '../ModalDialog';
import { lookup } from '../Util/translations';
import './index.scss';
import { PropTypes } from 'prop-types';
import AttachmentsRows from './AttachmentsRows';

export default class Attachments extends Component {
    toggleModal = () => {
        this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    modalDialogContent() {
        return (
            <div>
                <AttachmentsRows
                    readonly={this.props.readonly}
                    hideUploader={false}
                    addAttachment={(file, title, filetype, expiryDate, attachmentType) => {
                        this.props.addAttachment(file, title, filetype, expiryDate, attachmentType);
                        this.toggleModal();
                    }}
                    fileTypes={this.props.fileTypesForCC}
                    fileTypesForCC={this.props.fileTypesForCC}
                    country={this.props.country}
                    currentApprover={this.props.currentApprover}
                />
            </div>
        );
    }

    render() {
        const attachments = this.props.attachments.map((attachment, index) => {
            const status = attachment.status ? attachment.status : 'normal';
            return (
                <Attachment
                    key={index}
                    status={status}
                    title={attachment.title}
                    fileType={attachment.contentType}
                    documentType={attachment.fileType}
                    amount={attachment.amount}
                    expiry={attachment.expiryDate}
                    author={attachment.uploaderPrincipalName}
                    timestamp={attachment.uploadTimestamp}
                    onClick={
                        attachment.status === 'missing' ? this.toggleModal : () => window.open(attachment.contentUri)
                    }
                    secondaryInteraction={attachment.secondaryInteraction}
                />
            );
        });
        return (
            <div className="mrc-ui-attachments-component">
                <button type="button" className="mrc-primary-large-add-button" onClick={this.toggleModal}>
                    {lookup('mrc.attachments.addbutton')}
                </button>
                <div className="mrc-ui-attachments">
                    <h3 className="mrc-ui-attachments-headline">{lookup('mrc.attachments.headline')}</h3>
                    <div className="mrc-ui-attachments-list">{attachments}</div>
                </div>
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={this.toggleModal}
                        content={this.modalDialogContent()}
                        title={lookup('mrc.attachments.modaltitle')}
                    />
                ) : null}
            </div>
        );
    }
}

Attachments.propTypes = {
    attachments: PropTypes.array,
    addAttachment: PropTypes.func,
    fileTypes: PropTypes.array,
    fileTypesForCC: PropTypes.array,
    country: PropTypes.string,
    currentApprover: PropTypes.string,
    readonly: PropTypes.bool,
};
