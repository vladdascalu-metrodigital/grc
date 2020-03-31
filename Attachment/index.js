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

    logHelloWorld = () => {
        console.log('Hello World');
    };

    modalDialogContent() {
        return (
            <div>
                <AttachmentsRows
                    readonly={false}
                    addAttachment={() => this.logHelloWorld()}
                    fileTypes={['general', 'delkredere', 'warenkreditversicherung']}
                    fileTypesForCC={['general', 'warenkreditversicherung']}
                    country={'DE'}
                    currentApprover={'CC'}
                    hideUploader={false}
                />
            </div>
        );
    }

    render() {
        const attachments = this.props.attachments.map((attachment, index) => (
            <Attachment
                key={index}
                type={attachment.type}
                title={attachment.title}
                filetype={attachment.filetype}
                documenttype={attachment.documenttype}
                amount={attachment.amount}
                expiry={attachment.expiry}
                author={attachment.author}
                timestamp={attachment.timestamp}
                onClick={this.toggleModal}
                secondaryInteraction={attachment.secondaryInteraction}
            />
        ));
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
};
