import React, { Component } from 'react';
import ModalDialog from '../../ModalDialog';
import classnames from 'classnames';
import Textlink from './TextLink';
import { PropTypes } from 'prop-types';
import { lookup } from '../../Util/translations';
import * as mime from 'react-native-mime-types';
import moment from 'moment';
import { List } from 'immutable';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';

import * as _ from 'lodash';

import './attachment.scss';
import Moment from 'react-moment';

export default class Attachment extends Component {
    toggleModal(event) {
        event.stopPropagation();
        this.setState((prevState) => ({
            isModalVisible: !prevState.isModalVisible,
        }));
    }

    constructor(props) {
        super(props);
        this.classnames = {
            missing: 'mrc-ui-attachment-missing',
            deleted: 'mrc-ui-attachment-deleted',
        };

        this.state = {
            isModalVisible: false,
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
                                      {expiry ? moment(expiry).locale(Moment.globalLocale).format('L') : '-'}
                                  </div>
                              </div>,
                          ])
                        : null}

                    {metadata && _.isArray(metadata) && metadata.length > 0 ? (
                        <React.Fragment>
                            <div className="mrc-ui-attachment-show-details" onClick={this.toggleModal.bind(this)}>
                                <Textlink text={lookup('mrc.attachments.showDetails')} />
                            </div>

                            {this.state.isModalVisible ? (
                                <ModalDialog
                                    toggle={(event) => this.toggleModal(event)}
                                    content={this.createModalMetadataContent(metadata)}
                                    title={lookup('mrc.attachments.showDetailsModalTitle')}
                                />
                            ) : null}
                        </React.Fragment>
                    ) : null}
                    <div className="mrc-ui-attachment-author">{this.props.author}</div>
                    <div className="mrc-ui-attachment-timestamp">
                        {moment(this.props.timestamp).locale(Moment.globalLocale).format('LLL')}
                    </div>
                </div>
            );
        }
    }

    createModalMetadataContent(metadata) {
        return (
            <KeyValueGroup>
                {metadata.map((e) => this.createKeyValue(e.label, this.displayMetadataFieldValue(e)))}
            </KeyValueGroup>
        );
    }

    createKeyValue(key, value) {
        console.log(!_.isEmpty(value));
        return !_.isEmpty(value) ? (
            <KeyValueRow key={key}>
                <Key>{lookup(key)}</Key>
                <Value>{value}</Value>
            </KeyValueRow>
        ) : (
            <KeyValueRow key={key}>
                <Key>{lookup(key)}</Key>
                <Value>-</Value>
            </KeyValueRow>
        );
    }

    displayMetadataFieldValue(metadataField) {
        if (metadataField.data_type === undefined || metadataField.data_type === null) {
            return moment(metadataField.value, 'DD.MM.YYYY').locale(Moment.globalLocale).format('L');
        }

        switch (metadataField.data_type.toUpperCase()) {
            case 'DATE':
                return moment(metadataField.value, 'DD.MM.YYYY').locale(Moment.globalLocale).format('L');

            case 'DOUBLE':
            case 'INTEGER':
                return metadataField.value.toString();

            case 'DROPDOWN':
                if (metadataField.optionLabelKey === undefined || metadataField.optionLabelKey === null) {
                    console.error('Option label key is not defined for type Dropdown');
                }
                return lookup(
                    (metadataField.optionLabelKey ? metadataField.optionLabelKey + '.' : '') + metadataField.value
                );

            default:
                console.warn(
                    'Attachment metadata value ' +
                        metadataField.value +
                        ' may not be displayed properly for unknown data type ' +
                        metadataField.data_type
                );
                return metadataField.value.toString();
        }
    }

    getSecondaryInteraction() {
        if (_.isNil(this.props.handleSecondaryAction)) {
            return null;
        }
        const ifNotDisabled = (a) => (!this.props.disabled ? a : null);
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
