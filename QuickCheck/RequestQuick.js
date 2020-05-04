import React, { Component } from 'react';
import PrimaryButton from '../PrimaryButton';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { createUriPath } from '../../../../../node_modules/global-react-components/Util/util.js';
import CoinReceive from '../icons/coin-receive.svg';
import { lookup } from '../Util/translations';
import Precheck from './Precheck';

export default class RequestQuick extends Component {
    constructor(props) {
        super(props);
        this.state = { qcrData: null };
    }

    requestQuick = () => {
        this.props.requestQuick(this.props.selectedCustomerInfo).then(result => {
            this.setState({ qcrData: result });
        });
    };

    render() {
        if (this.state.qcrData) {
            return (
                <div className="mrc-detail">
                    <h2 className="centered">{lookup('mrc.quickcheck.success')}</h2>
                </div>
            );
        }
        const showSpinner = this.props.customers.loading || this.props.request.loading;
        return (
            <div>
                <Precheck customers={this.props.customers} />
                <PrimaryButton
                    disabled={this.props.disabled}
                    icon={CoinReceive}
                    showSpinner={showSpinner}
                    text={lookup('creditlimit.requestquick')}
                    onClick={this.requestQuick}
                />
            </div>
        );
    }
}

RequestQuick.propTypes = {
    selectedCustomerInfo: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired,
    icon: PropTypes.string,
    requestQuick: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
};
