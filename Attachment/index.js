import React, { Component } from 'react';
import Attachment from './Attachment';
import './index.scss';

export default class Attachments extends Component {
    render() {
        return (
            <div className="mrc-ui-attachments-component">
                <button type="button" className="mrc-primary-button mrc-ui-add-attachment-button">
                    Add Attachment
                </button>
                <div className="mrc-ui-attachments">
                    <h3 className="mrc-ui-attachments-headline">Attachements</h3>
                    <div className="mrc-ui-attachments-list">
                        <Attachment type={'missing'} />
                        <Attachment type={'missing'} />
                        <Attachment type={'regular'} />
                        <Attachment type={'regular'} />
                        <Attachment type={'deleted'} />
                        <Attachment type={'deleted'} />
                        <Attachment type={'deleted'} />
                        <Attachment type={'regular'} />
                    </div>
                </div>
            </div>
        );
    }
}
