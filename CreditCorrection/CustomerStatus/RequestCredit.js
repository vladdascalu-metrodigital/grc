import React, { Component } from 'react';
import PrimaryButton from '../../PrimaryButton';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { createUriPath } from '../../Util/util.js';
import CoinReceive from '../../icons/coin-receive.svg';
import { lookup } from '../../Util/translations';
import IconEdit from '../../icons/icon-edit-white.svg';

export default class RequestCredit extends Component {
    constructor(props) {
        super(props);
    }

    requestCredit = () => {
        this.props.requestCredit(this.props.selectedCustomerInfo);
    };

    editRequest = () => {
        this.editLink.click();
    };

    render() {
        const hasErrors = !(
            !this.props.customers ||
            !this.props.customers.data ||
            !this.props.customers.data.precheckErrors ||
            this.props.customers.data.precheckErrors.length <= 0
        );

        if (this.props.request.data) {
            // Redirect to details of the pending limitrequest
            return <Redirect push to={createUriPath('creditcorrection', 'requests', this.props.request.data.id)} />;
        } else if (hasErrors) {
            return null;
        } else if (this.props.customers.error) {
            return null;
        } else if (!this.props.pendingRequest.data) {
            const showSpinner =
                this.props.customers.loading || this.props.request.loading || this.props.pendingRequest.loading;
            return (
                <PrimaryButton
                    disabled={this.props.disabled}
                    icon={CoinReceive}
                    showSpinner={showSpinner}
                    text={lookup('creditcorrection.requestcredit')}
                    onClick={this.requestCredit}
                />
            );
        } else if (this.props.pendingRequest.data) {
            const showSpinner =
                this.props.customers.loading || this.props.request.loading || this.props.pendingRequest.loading;
            return (
                <div>
                    <PrimaryButton
                        disabled={this.props.disabled}
                        icon={IconEdit}
                        showSpinner={showSpinner}
                        text={lookup('creditcorrection.editrequest')}
                        onClick={this.editRequest}
                    />
                    <Link
                        ref={(link) => {
                            this.editLink = link;
                        }}
                        to={createUriPath('creditcorrection', 'requests', this.props.pendingRequest.data.id)}
                        className="no-underline"
                    ></Link>
                </div>
            );
        }
        return null;
    }
}

RequestCredit.propTypes = {
    selectedCustomerInfo: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired,
    icon: PropTypes.string,
    requestCredit: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    pendingRequest: PropTypes.object,
    disabled: PropTypes.bool,
};
