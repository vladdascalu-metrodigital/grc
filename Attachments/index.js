import React, { Component } from 'react';
import Attachment from './Attachment';
import ModalDialog from '../ModalDialog';
import { lookup } from '../Util/translations';
import './index.scss';
import { PropTypes } from 'prop-types';
import UploaderForm from './UploaderForm';
import SegmentedControl from '../SegmentedControl';
import Toggle from '../Toggle';

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
            showDeletedAttachments: false,
        };
    }

    modalDialogContent() {
        const isPlaceholder = this.state.segment === 'Placeholder';
        const fileTypes = _.isEmpty(this.props.fileTypes) ? ['general'] : this.props.fileTypes;
        const placeholderTypes = _.isEmpty(this.props.placeholderTypes) ? fileTypes : this.props.placeholderTypes;
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
                    fileTypes={this.state.fileTypes ? [this.state.fileTypes] : fileTypes}
                    placeholderTypes={this.state.placeholderTypes ? [this.state.placeholderTypes] : placeholderTypes}
                    callback={
                        isPlaceholder
                            ? fileType => {
                                  this.props.savePlaceholder(fileType);
                                  this.toggleModal();
                              }
                            : (filetype, file, title, expiryDate, amount, metadata) => {
                                  this.props.addAttachment(filetype, file, title, expiryDate, amount, metadata);
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
        const _attachments = this.state.showDeletedAttachments
            ? this.props.attachments
            : this.props.attachments.filter(a => a.status !== 'deleted');
        const attachments = _attachments.map((attachment, index) => {
            const isMissing = attachment.status === 'missing';
            const status = attachment.status ? attachment.status : 'normal';
            const disabled = attachment.disabled || this.props.disabled;

            const secondaryAction =
                disabled || _.isNil(attachment.secondaryInteraction)
                    ? null
                    : !attachment.handleSecondaryAction && isMissing
                    ? () => this.toggleModal(isMissing ? attachment.fileType : null)
                    : () => attachment.handleSecondaryAction();

            let metadata = null;
            try {
                metadata = JSON.parse(_.get(attachment, 'metadataJson'));
            } catch (e) {
                // metadata will be passed on as null
            }
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
                    metadata={metadata}
                />
            );
        });
        return (
            <div className="mrc-ui-attachments-component">
                {this.props.noDeletedAttachmentsToggle ? null : (
                    <Toggle
                        disabled={this.props.disabled}
                        checked={this.state.showDeletedAttachments}
                        onClick={() => {
                            this.setState({ showDeletedAttachments: !this.state.showDeletedAttachments });
                        }}
                    >
                        <label>{lookup('mrc.attachments.showDeletedAttachments')}</label>
                    </Toggle>
                )}
                {this.props.noAddButton ? null : (
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
                    {_.isEmpty(attachments) || this.props.noHeader ? null : (
                        <h3 className="mrc-ui-attachments-headline">{lookup('mrc.attachments.headline')}</h3>
                    )}
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
    placeholderTypes: PropTypes.array,
    fileTypesForCC: PropTypes.array,
    country: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    noPlaceholder: PropTypes.bool,
    noAddButton: PropTypes.bool,
    noDeletedAttachmentsToggle: PropTypes.bool,
    noHeader: PropTypes.bool,
    contractUrl: PropTypes.string,
};
