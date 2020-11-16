import React, { Component } from 'react';
import { ModalDialogSimple } from '../../ModalDialog';
import * as _ from 'lodash';
import MrcSpinner from '../../Util/MrcSpinner';
import { createNotification, createValidationMessage, validateDunningEmailForCustomers } from '../util/util';
import { lookup } from '../../Util/translations';
import { WAITING_FOR_HANDLING } from '../util/Constants';
import AutoSuggestInput from '../../AutoSuggestInput';

export default class MultipleEMailEditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmail: '',
            pending: false,
            disableDialog: false,
            status: null,
            validation: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleGetSuggestionValue = (suggestion) => {
        const email = _.isEmpty(suggestion) ? null : suggestion.toLowerCase().trim();
        this.setState({
            customerEmail: email,
        });
    };

    handleOnOk() {
        this.setState({
            pending: true,
            disableDialog: true,
            status: WAITING_FOR_HANDLING,
        });

        const email = _.isEmpty(this.state.customerEmail) ? null : this.state.customerEmail.toLowerCase().trim();

        const validation = validateDunningEmailForCustomers(
            email,
            this.props.customers,
            this.props.selectedCustomerAccountIds
        );
        if (!_.isEmpty(validation)) {
            this.setState({
                status: null,
                pending: false,
                disableDialog: false,
                validation: validation,
            });
        } else {
            this.props.onOk(email, this.props.selectedCustomerAccountIds).then((result) => {
                if (this._isMounted) {
                    this.setState({
                        status: result,
                        pending: false,
                        disableDialog: false,
                    });
                }
            });
        }
    }

    findSuggestions = (value) => {
        if (_.isEmpty(this.props.allCustomerEmails) || _.isEmpty(value)) {
            return [];
        }
        const search = value.toLowerCase().trim();
        let recommendations = [];
        for (let index = 0; index < this.props.allCustomerEmails.length; ++index) {
            const v = this.props.allCustomerEmails[index];
            //if (v.substring(0, len) === search) {
            if (v.includes(search)) {
                recommendations.push(v);
                if (recommendations.length === 5) {
                    break;
                }
            }
        }
        return recommendations === null ? [] : recommendations;
    };

    render() {
        let { onCancel } = this.props;
        const email = _.isEmpty(this.state.customerEmail) ? null : this.state.customerEmail.toLowerCase().trim();
        return (
            <ModalDialogSimple
                title={lookup('mrc.dunningemailmanagement.editSelectionDialogTitle')}
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
                <AutoSuggestInput
                    label={lookup('mrc.dunningemailmanagement.emailLabel')}
                    value={this.state.customerEmail}
                    placeholder={lookup('')}
                    onChange={(value) => {
                        this.setState({
                            customerEmail: value,
                            status: null,
                            validation: null,
                        });
                    }}
                    disabled={this.state.disableDialog}
                    findSuggestions={this.findSuggestions}
                    getSuggestionValue={this.handleGetSuggestionValue}
                />
            </ModalDialogSimple>
        );
    }
}
