import React, { Component } from 'react';
import TextInput from '../../TextInput';
import { ModalDialogSimple } from '../../ModalDialog';

export default class MultipleEMailEditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmail: '',
        };
    }

    render() {
        let { onCancel, onOk } = this.props;
        console.log(this.props.selectedCustomers);
        return (
            <ModalDialogSimple title="Edit E-Mail" onCancel={onCancel} onOk={onOk} okText="Save">
                <TextInput
                    label="E-Mail"
                    value={this.state.customerEmail}
                    placeholder="Type Email"
                    onChange={(value) => {
                        this.setState({ customerEmail: value });
                    }}
                />
            </ModalDialogSimple>
        );
    }
}
