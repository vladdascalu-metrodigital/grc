import React, { Component } from 'react';
import TextInput from '../../TextInput';
import { ModalDialogSimple } from '../../ModalDialog';
import CheckCard from '../../CheckCard';

import './SingleEMailEditModalDialog.scss';

export default class SingleEMailEditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmail: props.customer.dunningEmail,
        };
    }

    render() {
        let { onCancel, onOk } = this.props;

        return (
            <ModalDialogSimple title="Edit E-Mail" onCancel={onCancel} onOk={onOk}>
                <TextInput
                    label="E-Mail"
                    value={this.state.customerEmail}
                    onChange={(value) => {
                        this.setState({ customerEmail: value });
                    }}
                />
                <div className="mrc-ui-modal-checkcards">
                    <CheckCard title="max.mustermann@meier.ag" size="small" checked={true} />
                    <CheckCard title="peter.parker@betterlife.gmbh" size="small" checked={false} />
                </div>
            </ModalDialogSimple>
        );
    }
}
