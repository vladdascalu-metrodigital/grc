import React, { Component } from 'react';
import classnames from 'classnames';
import Textlink from './TextLink';
import { PropTypes } from 'prop-types';
import { lookup } from '../Util/translations';
import * as mime from 'react-native-mime-types';
import moment from 'moment';
import { List } from 'immutable';

import * as _ from 'lodash';

export default class Attachment extends Component {
    constructor(props) {
        super(props);
        this.classnames = {
            missing: 'mrc-ui-attachment-missing',
            deleted: 'mrc-ui-attachment-deleted',
        };
    }

    getFileType(fileType) {
        const fileExtension = mime.extension(fileType);
        return fileExtension || lookup('mrc.attachments.unknown-mime');
    }

    documentTypeTitle(documentType) {
        return lookup('mrc.attachments.types.' + documentType) + ' ' + lookup('mrc.attachments.missing');
    }

    getAttachmentContent(amount, expiry, metadata) {
        if (this.props.status === 'missing') {
            return (
                <div className="mrc-ui-attachment-content" onClick={this.props.handlePrimaryAction}>
                    <div className="mrc-ui-attachment-documenttype">
                        {this.documentTypeTitle(this.props.documentType)}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="mrc-ui-attachment-content" onClick={this.props.handlePrimaryAction}>
                    <h2 className="mrc-ui-attachment-title">{this.props.title}</h2>
                    <div className="mrc-ui-attachment-filetype">{this.getFileType(this.props.fileType)}</div>
                    <div className="mrc-ui-attachment-documenttype">{this.props.documentType}</div>
                    {amount || expiry
                        ? List([
                              <div key="amount" className="mrc-ui-attachment-info-group">
                                  <div className="mrc-ui-attachment-info-label">{lookup('mrc.attachments.amount')}</div>
                                  <div className="mrc-ui-attachment-info-value">{amount ? amount : '-'}</div>
                              </div>,
                              <div key="expiry" className="mrc-ui-attachment-info-group">
                                  <div className="mrc-ui-attachment-info-label">{lookup('mrc.attachments.expiry')}</div>
                                  <div className="mrc-ui-attachment-info-value">
                                      {expiry ? moment(expiry).format('L') : '-'}
                                  </div>
                              </div>,
                          ]).concat(
                              _.isArray(metadata)
                                  ? List(
                                        metadata.map(e => (
                                            <div key="expiry" className="mrc-ui-attachment-info-group">
                                                <div className="mrc-ui-attachment-info-label">{lookup(e.label)}</div>
                                                <div className="mrc-ui-attachment-info-value">
                                                    {moment(e.value, 'dd.MM.YYYY').format('L')}
                                                </div>
                                            </div>
                                        ))
                                    )
                                  : null
                          )
                        : null}
                    <div className="mrc-ui-attachment-author">{this.props.author}</div>
                    <div className="mrc-ui-attachment-timestamp">{moment(this.props.timestamp).format('LLL')}</div>
                </div>
            );
        }
    }

    getSecondaryInteraction() {
        const ifNotDisabled = a => (!this.props.disabled ? a : null);
        switch (this.props.secondaryInteraction) {
            case 'delete':
                return ifNotDisabled(
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink icon="trash" text={lookup('mrc.attachments.delete')} />
                    </div>
                );
            case 'restore':
                return ifNotDisabled(
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink icon="restore" text={lookup('mrc.attachments.restore')} />
                    </div>
                );
            case 'add':
                return ifNotDisabled(
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink icon="add" text={lookup('mrc.attachments.add')} />
                    </div>
                );
            default:
                return ifNotDisabled(
                    <div className="mrc-ui-attachment-interaction" onClick={this.props.handleSecondaryAction}>
                        <Textlink text={this.props.secondaryInteraction} />
                    </div>
                );
        }
    }

    render() {
        return (
            <div
                className={
                    (this.props.disabled ? 'mrc-ui-attachment-disabled ' : '') +
                    classnames('mrc-ui-attachment', this.classnames[this.props.status])
                }
            >
                {this.getAttachmentContent(this.props.amount, this.props.expiry, this.props.metadata)}
                {this.getSecondaryInteraction()}
            </div>
        );
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
    metadata: PropTypes.array,
};
