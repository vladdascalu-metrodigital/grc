import React, { Component } from 'react';
import classnames from 'classnames';
import Textlink from './TextLink';
import { PropTypes } from 'prop-types';
import { lookup } from '../Util/translations';
import * as mime from 'react-native-mime-types';

export default class Attachment extends Component {
    constructor(props) {
        super(props);
        this.classnames = {
            missing: 'mrc-ui-attachment-missing',
            deleted: 'mrc-ui-attachment-deleted',
        };
    }

    render() {
        const classes = classnames('mrc-ui-attachment', this.classnames[this.props.status]);
        let content;
        if (this.props.status === 'missing') {
            content = (
                <div className="mrc-ui-attachment-content" onClick={this.props.onClick}>
                    <div className="mrc-ui-attachment-documenttype">{this.props.documentType}</div>
                </div>
            );
        } else {
            content = (
                <div className="mrc-ui-attachment-content" onClick={this.props.onClick}>
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
                            {this.props.expiry ? this.props.expiry : '-'}
                        </div>
                    </div>
                    <div className="mrc-ui-attachment-author">{this.props.author}</div>
                    <div className="mrc-ui-attachment-timestamp">{this.props.timestamp}</div>
                </div>
            );
        }

        let secondaryAction;
        switch (this.props.secondaryInteraction) {
            case 'delete':
                secondaryAction = (
                    <div className="mrc-ui-attachment-interaction">
                        <Textlink icon="trash" text={lookup('mrc.attachments.delete')} onClick={null} />
                    </div>
                );
                break;
            case 'restore':
                secondaryAction = (
                    <div className="mrc-ui-attachment-interaction">
                        <Textlink icon="restore" text={lookup('mrc.attachments.restore')} onClick={null} />
                    </div>
                );
                break;
            case 'add':
                secondaryAction = (
                    <div className="mrc-ui-attachment-interaction">
                        <Textlink icon="add" text={lookup('mrc.attachments.add')} onClick={null} />
                    </div>
                );
                break;
            default:
                secondaryAction = (
                    <div className="mrc-ui-attachment-interaction">
                        <Textlink text={this.props.secondaryInteraction} onClick={null} />
                    </div>
                );
                null;
        }

        return (
            <div className={classes}>
                {content}
                {secondaryAction}
            </div>
        );
    }

    getFileType(str) {
        const fileExtension = mime.extension(str);
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
    onClick: PropTypes.func,
};
