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
            <ModalDialogSimple title="Select E-Mail" onCancel={onCancel} onOk={onOk} okText="Save">
                <div className="mrc-ui-single-email-modal-checkcards">
                    <CheckCard title="New E-Mail" checked={true} size="small">
                        <TextInput
                            value={this.state.customerEmail}
                            onChange={(value) => {
                                this.setState({ customerEmail: value });
                            }}
                        />
                    </CheckCard>
                    <CheckCard size="small" checked={false}>
                        <span className="mrc-ui-check-card-title">Dunning E-Mail</span>
                        <div className="mrc-ui-check-card-content">max.mustermann@meier.ag</div>
                    </CheckCard>
                    <CheckCard size="small" checked={false}>
                        <span className="mrc-ui-check-card-title">Special E-Mail</span>
                        <div className="mrc-ui-check-card-content">peter.parker@betterlife.gmbh</div>
                    </CheckCard>
                </div>
            </ModalDialogSimple>
        );
    }
}
