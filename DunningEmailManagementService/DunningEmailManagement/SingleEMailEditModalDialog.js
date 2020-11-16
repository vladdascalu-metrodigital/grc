import React, { Component } from 'react';
import TextInput from '../../TextInput';
import { ModalDialogSimple } from '../../ModalDialog';
import CheckCard from '../../CheckCard';

import './SingleEMailEditModalDialog.scss';
import * as _ from 'lodash';
import MrcSpinner from '../../Util/MrcSpinner';
import { createNotification, createValidationMessage, validateSingleDunningEmail } from '../util/util';
import { lookup } from '../../Util/translations';
import { WAITING_FOR_HANDLING } from '../util/Constants';

export default class SingleEMailEditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmail: props.customer.dunningEmail,
            isNewEmail: _.isEmpty(props.customer.dunningEmail),
            newCustomerEmail: null,
            pending: false,
            disableDialog: false,
            status: null,
            validation: null,
        };
        this.bin;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOnOk() {
        this.setState({
            pending: true,
            disableDialog: true,
            status: WAITING_FOR_HANDLING,
            validation: null,
        });

        const email = _.isEmpty(this.state.customerEmail) ? null : this.state.customerEmail.toLowerCase().trim();
        const validation = validateSingleDunningEmail(
            email,
            this.props.customer.dunningEmail,
            this.props.customer.dunningEmailStatus
        );
        if (!_.isEmpty(validation)) {
            this.setState({
                status: null,
                pending: false,
                disableDialog: false,
                validation: validation,
            });
        } else {
            this.props.onOk(email, [this.props.customer.accountId]).then((result) => {
                if (this._isMounted) {
                    this.setState({
                        status: result,
                        pending: false,
                        disableDialog: false,
                        validation: null,
                    });
                }
            });
        }
    }

    render() {
        let { onCancel, customer } = this.props;
        const email = _.isEmpty(this.state.customerEmail) ? null : this.state.customerEmail.toLowerCase().trim();
        return (
            <ModalDialogSimple
                title={lookup('mrc.dunningemailmanagement.editSingleDialogTitle')}
                onCancel={onCancel}
                onOk={() => this.handleOnOk()}
                disabledOK={this.state.disableDialog}
                disabledCancel={this.state.disableDialog}
                disabledClose={this.state.disableDialog}
                okText={
                    email
                        ? lookup('mrc.dunningemailmanagement.button.save')
                        : lookup('mrc.dunningemailmanagement.button.delete')
                }
            >
                {this.state.pending ? <MrcSpinner /> : null}
                {createValidationMessage(this.state.validation)}
                {createNotification(this.state.status)}
                <div className="mrc-ui-single-email-modal-checkcards">
                    <CheckCard
                        title={lookup('mrc.dunningemailmanagement.newEmailLabel')}
                        checked={this.state.isNewEmail}
                        onClick={() => {
                            this.setState({
                                isNewEmail: true,
                                customerEmail: this.state.newCustomerEmail,
                                status: null,
                                validation: null,
                            });
                        }}
                        disabled={this.state.disableDialog}
                        size="small"
                    >
                        <TextInput
                            value={this.state.newCustomerEmail}
                            onChange={(value) => {
                                this.setState({
                                    customerEmail: value,
                                    newCustomerEmail: value,
                                    isNewEmail: true,
                                    status: null,
                                    validation: null,
                                });
                            }}
                            onBlur={() => {
                                this.setState({ isNewEmail: true, status: null, validation: null });
                            }}
                            disabled={this.state.disableDialog}
                        />
                    </CheckCard>
                    {_.isEmpty(customer.dunningEmail) ? null : (
                        <CheckCard
                            size="small"
                            checked={
                                !this.state.isNewEmail &&
                                !_.isEmpty(this.state.customerEmail) &&
                                this.state.customerEmail.toLowerCase().trim() ===
                                    customer.dunningEmail.toLowerCase().trim()
                            }
                            key={customer.accountId + '_dunning'}
                            disabled={this.state.disableDialog}
                            onClick={() => {
                                this.setState({
                                    customerEmail: customer.dunningEmail,
                                    isNewEmail: false,
                                    status: null,
                                    validation: null,
                                });
                            }}
                        >
                            <span className="mrc-ui-check-card-title">
                                {lookup('mrc.dunningemailmanagement.dunningEmailLabel')}
                            </span>
                            <div className="mrc-ui-check-card-content">{customer.dunningEmail}</div>
                        </CheckCard>
                    )}
                    {customer.customerEmails
                        ? customer.customerEmails.map((email, i) =>
                              !_.isEmpty(customer.dunningEmail) &&
                              email.toLowerCase().trim() === customer.dunningEmail.toLowerCase().trim() ? null : (
                                  <CheckCard
                                      size="small"
                                      checked={
                                          !this.state.isNewEmail &&
                                          !_.isEmpty(this.state.customerEmail) &&
                                          this.state.customerEmail.toLowerCase().trim() === email.toLowerCase().trim()
                                      }
                                      key={customer.accountId + '_' + i}
                                      disabled={this.state.disableDialog}
                                      onClick={() => {
                                          this.setState({
                                              customerEmail: email,
                                              isNewEmail: false,
                                              status: null,
                                              validation: null,
                                          });
                                      }}
                                  >
                                      <span className="mrc-ui-check-card-title">
                                          {lookup('mrc.dunningemailmanagement.otherEmailLabel')}
                                      </span>
                                      <div className="mrc-ui-check-card-content">{email}</div>
                                  </CheckCard>
                              )
                          )
                        : null}
                </div>
            </ModalDialogSimple>
        );
    }
}
