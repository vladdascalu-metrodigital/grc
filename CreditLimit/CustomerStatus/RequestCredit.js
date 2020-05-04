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
        this.editRequest = this.editRequest.bind(this);
    }

    requestCredit = () => {
        this.props.requestCredit(this.props.selectedCustomerInfo);
    };

    editRequest = () => {
        this.editLink.click();
    };

    render() {
        if (this.props.request.data) {
            // Redirect to details of the pending limitrequest
            return <Redirect push to={createUriPath('limitrequests', this.props.request.data.id)} />;
        } else if (this.props.customers.error) {
            return null;
        } else if (!this.props.pendingRequest.data) {
            const showSpinner =
                this.props.customers.loading || this.props.request.loading || this.props.pendingRequest.loading;
            return (
                <PrimaryButton
                    disabled={this.props.disabledRequests || this.props.disabledPrechecks}
                    icon={CoinReceive}
                    showSpinner={showSpinner}
                    text={lookup('creditlimit.requestcredit')}
                    onClick={this.requestCredit}
                />
            );
        } else if (this.props.pendingRequest.data && !this.props.pendingRequest.data.submitInfo) {
            const showSpinner =
                this.props.customers.loading || this.props.request.loading || this.props.pendingRequest.loading;
            return (
                <div>
                    <PrimaryButton
                        disabled={this.props.disabledRequests}
                        icon={IconEdit}
                        showSpinner={showSpinner}
                        text={lookup('creditlimit.editrequest')}
                        onClick={this.editRequest}
                    />
                    <Link
                        ref={link => {
                            this.editLink = link;
                        }}
                        to={createUriPath('limitrequests', this.props.pendingRequest.data.id)}
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
    disabledRequests: PropTypes.bool,
    disabledPrechecks: PropTypes.bool,
};
