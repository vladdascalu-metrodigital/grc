import React, { Component } from 'react';
import Attachment from './Attachment';
import ModalDialog from '../ModalDialog';
import { lookup } from '../Util/translations';
import './index.scss';
import { PropTypes } from 'prop-types';
import AttachmentsRows from './AttachmentsRows';
import SegmentedControl from '../SegmentedControl';

export default class Attachments extends Component {
    toggleModal = fileTypes => {
        this.setState(prevState => ({
            isModalVisible: !prevState.isModalVisible,
            fileTypes: fileTypes ? fileTypes : null,
        }));
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            fileTypes: null,
        };
    }

    modalDialogContent() {
        const explicitFileTypes = this.state.fileTypes;
        return (
            <div>
                {this.props.noPlaceholder ? null : (
                    <SegmentedControl selectedSegment={'Document'} labels={['Document', 'Placeholder']} />
                )}
                <AttachmentsRows
                    readonly={this.props.readonly}
                    hideUploader={false}
                    addAttachment={(file, title, filetype, expiryDate, attachmentType) => {
                        this.props.addAttachment(file, title, filetype, expiryDate, attachmentType);
                        this.toggleModal();
                    }}
                    fileTypes={explicitFileTypes ? explicitFileTypes : this.props.fileTypes}
                    fileTypesForCC={explicitFileTypes ? explicitFileTypes : this.props.fileTypesForCC}
                    country={this.props.country}
                    currentApprover={this.props.currentApprover}
                />
            </div>
        );
    }

    primaryAction(attachment) {
        switch (attachment.status) {
            case 'missing':
                return () => this.toggleModal(['contract']);
            case 'normal':
                return () => window.open(attachment.contentUri);
            case 'deleted':
                return null;
        }
    }

    render() {
        const attachments = this.props.attachments.map((attachment, index) => {
            const isMissing = attachment.status === 'missing';
            const status = attachment.status ? attachment.status : 'normal';
            return (
                <Attachment
                    disabled={this.props.disabled}
                    key={index}
                    status={status}
                    title={attachment.title}
                    fileType={attachment.contentType}
                    documentType={attachment.fileType}
                    amount={attachment.amount}
                    expiry={attachment.expiryDate}
                    author={attachment.uploaderPrincipalName}
                    timestamp={attachment.uploadTimestamp}
                    handlePrimaryAction={this.props.disabled ? null : this.primaryAction(attachment)}
                    handleSecondaryAction={
                        this.props.disabled
                            ? null
                            : isMissing
                            ? () => this.toggleModal(isMissing ? ['contract'] : null)
                            : attachment.handleSecondaryAction
                    }
                    secondaryInteraction={attachment.secondaryInteraction}
                />
            );
        });
        return (
            <div className="mrc-ui-attachments-component">
                <button
                    type="button"
                    className="mrc-primary-large-add-button"
                    onClick={() => this.toggleModal()}
                    disabled={this.props.disabled}
                >
                    {lookup('mrc.attachments.addbutton')}
                </button>
                <div className="mrc-ui-attachments">
                    <h3 className="mrc-ui-attachments-headline">{lookup('mrc.attachments.headline')}</h3>
                    <div className="mrc-ui-attachments-list">{attachments}</div>
                </div>
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={() => this.toggleModal()}
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
    disabled: PropTypes.bool,
    noPlaceholder: PropTypes.bool,
};
