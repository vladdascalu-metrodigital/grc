import React, { Component } from 'react';
import TextInput from '../../TextInput';
import { ModalDialogSimple } from '../../ModalDialog';

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
            </ModalDialogSimple>
        );
    }
}
