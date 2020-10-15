import React, { Component } from 'react';
import { ModalDialogSimple } from '../../ModalDialog';
import Pill from '../../Pill';

export default class ColleaguesModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmail: '',
        };
    }

    render() {
        let { onCancel, onOk, colleagues } = this.props;
        return (
            <ModalDialogSimple title="Customer Consultants" onCancel={onCancel} onOk={onOk}>
                <div className="mrc-ui-audit-trail-colleages">
                    {colleagues.map((colleague, key) => {
                        return (
                            <Pill key={key} text={colleague} type="success" className="mrc-ui-audit-trail-email-pill" />
                        );
                    })}
                </div>
            </ModalDialogSimple>
        );
    }
}
