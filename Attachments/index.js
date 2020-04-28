import React, { Component } from 'react';
import Attachment from './Attachment';
import ModalDialog from '../ModalDialog';
import { lookup } from '../Util/translations';
import './index.scss';
import { PropTypes } from 'prop-types';
import AttachmentsRows from './AttachmentsRows';
import SegmentedControl from '../SegmentedControl';
import AttachmentPlaceholderForm from './AttachmentPlaceholderForm';

import * as _ from 'lodash';
import moment from 'moment';

export default class Attachments extends Component {
    toggleModal = fileTypes => {
        this.setState(prevState => ({
            isModalVisible: !prevState.isModalVisible,
            fileTypes: fileTypes ? fileTypes : null,
            segment: 'Document',
        }));
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            fileTypes: null,
            segment: 'Document',
        };
    }

    modalDialogContent() {
        const explicitFileTypes = this.state.fileTypes;
        return (
            <div>
                {this.props.noPlaceholder ? null : (
                    <SegmentedControl
                        callback={newSegment => this.setState({ segment: newSegment })}
                        selectedSegment={'Document'}
                        labels={['Document', 'Placeholder']}
                    />
                )}
                {this.state.segment === 'Document' ? (
                    <AttachmentsRows
                        readonly={this.props.readonly}
                        explicitFileType={!_.isNil(explicitFileTypes)}
                        hideUploader={false}
                        addAttachment={(file, title, filetype, expiryDate, attachmentType) => {
                            this.props.addAttachment(
                                file,
                                title,
                                filetype,
                                typeof expiryDate === 'string' ? moment(expiryDate, 'DD.MM.YYY') : expiryDate,
                                attachmentType
                            );
                            this.toggleModal();
                        }}
                        fileTypes={explicitFileTypes ? explicitFileTypes : this.props.fileTypes}
                        fileTypesForCC={explicitFileTypes ? explicitFileTypes : this.props.fileTypesForCC}
                        country={this.props.country}
                        currentApprover={this.props.currentApprover}
                        contractUrl={this.props.contractUrl}
                    />
                ) : (
                    <AttachmentPlaceholderForm
                        country={this.props.country}
                        fileTypes={explicitFileTypes ? explicitFileTypes : this.props.fileTypes}
                        fileTypesForCC={explicitFileTypes ? explicitFileTypes : this.props.fileTypesForCC}
                        readonly={false}
                        currentApprover={this.props.currentApprover}
                        savePlaceholder={fileType => {
                            if (!_.isNil(fileType)) {
                                this.props.savePlaceholder(fileType);
                                this.toggleModal();
                            } else {
                                console.log('error saving placeholder');
                            }
                        }}
                        hideUploader={false}
                    />
                )}
            </div>
        );
    }

    primaryAction(attachment) {
        switch (attachment.status) {
            case 'missing':
                return attachment.handlePrimaryAction
                    ? attachment.handlePrimaryAction
                    : () => this.toggleModal([attachment.fileType]);
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
            const disabled = attachment.disabled || this.props.disabled;

            const secondaryAction = disabled
                ? null
                : !attachment.handleSecondaryAction && isMissing
                ? () => this.toggleModal(isMissing ? [attachment.fileType] : null)
                : () => attachment.handleSecondaryAction();

            return (
                <Attachment
                    disabled={disabled}
                    key={index}
                    status={status}
                    title={attachment.title}
                    fileType={attachment.contentType}
                    documentType={attachment.fileType}
                    amount={attachment.amount}
                    expiry={attachment.expiryDate}
                    author={attachment.uploaderPrincipalName}
                    timestamp={attachment.uploadTimestamp}
                    handlePrimaryAction={disabled ? null : this.primaryAction(attachment)}
                    handleSecondaryAction={secondaryAction}
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
    savePlaceholder: PropTypes.func,
    fileTypes: PropTypes.array,
    fileTypesForCC: PropTypes.array,
    country: PropTypes.string,
    currentApprover: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    noPlaceholder: PropTypes.bool,
    contractUrl: PropTypes.string,
};
