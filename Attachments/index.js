import React, { Component } from 'react';
import Attachment from './Attachment';
import ModalDialog from '../ModalDialog';
import { lookup } from '../Util/translations';
import './index.scss';
import { PropTypes } from 'prop-types';
import UploaderForm from './UploaderForm';
import SegmentedControl from '../SegmentedControl';

import * as _ from 'lodash';

export default class Attachments extends Component {
    toggleModal = fileType => {
        this.setState(prevState => ({
            isModalVisible: !prevState.isModalVisible,
            fileType: fileType ? fileType : null,
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
        const isPlaceholder = this.state.segment === 'Placeholder';
        return (
            <div>
                {this.props.noPlaceholder || this.state.fileType ? null : (
                    <SegmentedControl
                        callback={newSegment => this.setState({ segment: newSegment })}
                        selectedSegment={'Document'}
                        labels={['Document', 'Placeholder']}
                    />
                )}
                <UploaderForm
                    onlyPlaceholder={isPlaceholder}
                    country={this.props.country}
                    readonly={this.props.readonly}
                    fileTypes={this.state.fileType ? [this.state.fileType] : this.props.fileTypes}
                    currentApprover={this.props.currentApprover}
                    callback={
                        isPlaceholder
                            ? fileType => {
                                  this.props.savePlaceholder(fileType);
                                  this.toggleModal();
                              }
                            : (filetype, file, title, expiryDate, attachmentType) => {
                                  this.props.addAttachment(filetype, file, title, expiryDate, attachmentType);
                                  this.toggleModal();
                              }
                    }
                />
            </div>
        );
    }

    primaryAction(attachment) {
        switch (attachment.status) {
            case 'missing':
                return attachment.handlePrimaryAction
                    ? attachment.handlePrimaryAction
                    : () => this.toggleModal(attachment.fileType);
            case 'normal':
                return () => window.open(attachment.contentUri);
            case 'deleted':
                return null;
        }
    }

    contractLink() {
        const hasContractPlaceholder = !_.isEmpty(
            this.props.attachments.filter(a => a.fileType == 'contract' && a.status == 'missing')
        );
        return hasContractPlaceholder && this.props.contractUrl && !this.props.readonly ? (
            <a target="_blank" rel="noopener noreferrer" href={this.props.contractUrl}>
                {lookup('mrc.attachments.contractlinktext')}
            </a>
        ) : null;
    }

    render() {
        if (!this.props.attachments) {
            return null;
        }
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
                {this.props.readonly ? null : (
                    <button
                        type="button"
                        className="mrc-primary-large-add-button"
                        onClick={() => this.toggleModal()}
                        disabled={this.props.disabled}
                    >
                        {lookup('mrc.attachments.addbutton')}
                    </button>
                )}
                <div className="mrc-ui-attachments">
                    <div className="mrc-ui-attachments-headerrow">{this.contractLink()}</div>
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
