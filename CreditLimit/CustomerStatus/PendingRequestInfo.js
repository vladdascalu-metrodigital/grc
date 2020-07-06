import React, { Component } from 'react';
import InfoRow from '../../InfoRow';
import PropTypes from 'prop-types';

import ProgressBar from '../../ProgressBar/index';
import MrcNumber from '../../MrcNumber';
import MrcDate from '../../MrcDate';
import { lookup } from '../../Util/translations';
import './index.scss';

export default class PendingRequestInfo extends Component {
    render() {
        const request = this.props.pendingRequest.data;
        if (request) {
            const requestedItemForRequester = this.findRequestedItemForRequester(request);
            const primary = this.createInfoRowPrimary();
            const secondary = this.createInfoRowSecondary(request, requestedItemForRequester);
            return (
                <div className="pending-request-info">
                    <a className="no-underline">{this.createInfoRow(primary, secondary)}</a>
                    {this.createProgressBar(request)}
                </div>
            );
        } else {
            return null;
        }
    }

    createProgressBar(request) {
        const totalSteps = request.containsContracting ? 4 : 3;
        return request.submitInfo ? null : (
            // if the request was already submitted the recent history which is loaded from history service includes includes a progress bar
            <ProgressBar name={lookup('mrc.phase.initialization')} step={1} totalSteps={totalSteps} />
        );
    }

    createInfoRow(primary, secondary) {
        return <InfoRow primary={primary} secondary={secondary} />;
    }

    createInfoRowPrimary() {
        return <span>{lookup('mrc.pending.request')}</span>;
    }

    createInfoRowSecondary(request, requestedItemForRequester) {
        const creditProduct =
            requestedItemForRequester.creditData && requestedItemForRequester.creditData.creditProduct;
        const translatedCreditProduct =
            creditProduct !== undefined && creditProduct !== null ? ' / ' + lookup(creditProduct) : creditProduct;
        return (
            <div>
                <MrcDate>{request.creationTimestamp}</MrcDate> {' / '}
                <MrcNumber isCurrency country={requestedItemForRequester.customer.country}>
                    {requestedItemForRequester.creditData.amount}
                </MrcNumber>
                {translatedCreditProduct}
            </div>
        );
    }

    findRequestedItemForRequester(request) {
        const requestedCustomer = request.requestedCustomerId;
        return request.requestedItems.find(
            (ri) =>
                ri.customerId.country === requestedCustomer.country &&
                ri.customerId.storeNumber === requestedCustomer.storeNumber &&
                ri.customerId.customerNumber === requestedCustomer.customerNumber
        );
    }
}

PendingRequestInfo.propTypes = {
    pendingRequest: PropTypes.object.isRequired,
};
