import React, { Component } from 'react';
import classnames from 'classnames';
import Textlink from './TextLink';
import { PropTypes } from 'prop-types';
import { lookup } from '../Util/translations';
import * as mime from 'react-native-mime-types';
import moment from 'moment';

export default class Attachment extends Component {
    constructor(props) {
        super(props);
        this.classnames = {
            missing: 'mrc-ui-attachment-missing',
            deleted: 'mrc-ui-attachment-deleted',
        };
    }

    getAttachmentContent() {
        if (this.props.status === 'missing') {
            return (
                <div className="mrc-ui-attachment-content" onClick={this.props.handlePrimaryAction}>
                    <div className="mrc-ui-attachment-documenttype">{this.props.documentType}</div>
                </div>
            );
        } else {
            return (
                <div className="mrc-ui-attachment-content" onClick={this.props.handlePrimaryAction}>
                    <h2 className="mrc-ui-attachment-title">{this.props.title}</h2>
                    <div className="mrc-ui-attachment-filetype">{this.getFileType(this.props.fileType)}</div>
                    <div className="mrc-ui-attachment-documenttype">{this.props.documentType}</div>
                    <div className="mrc-ui-attachment-info-group">
                        <div className="mrc-ui-attachment-info-label">{lookup('mrc.attachments.amount')}</div>
                        <div className="mrc-ui-attachment-info-value">
                            {this.props.amount ? this.props.amount : '-'}
                        </div>
                    </div>
                    <div className="mrc-ui-attachment-info-group">
                        <div className="mrc-ui-attachment-info-label">{lookup('mrc.attachments.expiry')}</div>
                        <div className="mrc-ui-attachment-info-value">
                            {this.props.expiry ? moment(this.props.expiry).format('L') : '-'}
                        </div>
                    </div>
                    <div className="mrc-ui-attachment-author">{this.props.author}</div>
                    <div className="mrc-ui-attachment-timestamp">{moment(this.props.timestamp).format('LLL')}</div>
                </div>
            );
        }
    }

    getSecondaryInteraction() {
        switch (this.props.secondaryInteraction) {
            case 'delete':
                return (
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink icon="trash" text={lookup('mrc.attachments.delete')} />
                    </div>
                );
            case 'restore':
                return (
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink icon="restore" text={lookup('mrc.attachments.restore')} />
                    </div>
                );
            case 'add':
                return (
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink icon="add" text={lookup('mrc.attachments.add')} />
                    </div>
                );
            default:
                return (
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink text={this.props.secondaryInteraction} />
                    </div>
                );
        }
    }

    render() {
        const classes = classnames('mrc-ui-attachment', this.classnames[this.props.status]);
        const content = this.getAttachmentContent();
        const secondaryAction = this.getSecondaryInteraction();

        return (
            <div className={(this.props.disabled ? 'mrc-ui-attachment-disabled ' : '') + classes}>
                {content}
                {secondaryAction}
            </div>
        );
    }

    getFileType(contentType) {
        const fileExtension = mime.extension(contentType);
        return fileExtension || lookup('mrc.attachments.unknown-mime');
    }
}

Attachment.propTypes = {
    status: PropTypes.string,
    title: PropTypes.string,
    fileType: PropTypes.string,
    documentType: PropTypes.string,
    amount: PropTypes.string,
    expiry: PropTypes.string,
    author: PropTypes.string,
    timestamp: PropTypes.string,
    secondaryInteraction: PropTypes.string,
    handlePrimaryAction: PropTypes.func,
    handleSecondaryAction: PropTypes.func,
    disabled: PropTypes.bool,
};
