import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../../Panel';
import PanelItem from '../../Panel/PanelItem';
import { Link } from 'react-router-dom';
import { displayName } from '../../Util/index';
import './index.scss';
import { lookup } from '../../Util/translations';
import MrcNumber from '../../MrcNumber';

export default class RequestSubmitted extends Component {
    createSummaryPanel() {
        if (!this.props.data) return null;
        const cd = this.props.data.requestedItems[0].creditData;
        const cust = this.props.data.requestedItems[0].customer;
        const activationResultMessage = this.props.data.requestedItems[0].activationInfo.resultMessage;
        const activationResultCode = this.props.data.requestedItems[0].activationInfo.resultCode;
        return (
            <Panel>
                <PanelItem>
                    <section className="details">
                        <h2>{lookup('creditcorrection.request.summary')}</h2>
                        <dl>
                            <dt>{lookup('mrc.creditcorrection.activationResultCode')}</dt>
                            <dd>{activationResultCode}</dd>
                            <dt>{lookup('mrc.creditcorrection.activationResultMessage')}</dt>
                            <dd>{activationResultMessage}</dd>
                            <dt>{lookup('mrc.creditdetails.creditproduct')}</dt>
                            <dd>{this.lookupPayment(cd.creditProduct)}</dd>
                            <dt>{lookup('mrc.creditdetails.creditperiod')}</dt>
                            <dd>{this.lookupPayment(cd.creditPeriod)}</dd>
                            <dt>{lookup('mrc.creditdetails.paymenttype')}</dt>
                            <dd>{this.lookupPayment(cd.debitType)}</dd>
                            <dt>{lookup('mrc.creditdetails.creditlimit')}</dt>
                            <dd>
                                <MrcNumber country={this.props.data.requestedItems[0].customer.country}>
                                    {cd.amount}
                                </MrcNumber>
                            </dd>
                        </dl>

                        <h2>{lookup('mrc.customerdata.title')}</h2>
                        <dl>
                            <dt>{lookup('mrc.customerdetails.fields.customernumber')}</dt>
                            <dd>{cust.storeNumber + '/' + cust.customerNumber}</dd>
                            <dt>{lookup('mrc.customerdata.name')}</dt>
                            <dd>{displayName(cust)}</dd>
                        </dl>
                    </section>
                </PanelItem>
            </Panel>
        );
    }

    lookupPayment = payment => {
        if (payment) {
            let tLookup = payment;
            if (!payment.includes('mrc.payment.')) tLookup = 'mrc.payment.' + payment.split(' ').join('_');
            return lookup(tLookup);
        } else return '-';
    };

    render() {
        return (
            <div className="mrc-request-submitted">
                <Panel>
                    <PanelItem>
                        <h1>{lookup('creditcorrection.request.thankyou')}</h1>
                    </PanelItem>
                </Panel>
                {this.createSummaryPanel()}
                <Panel>
                    <PanelItem>
                        <p>
                            <Link to="/">{lookup('mrc.apps.launchpad')}</Link>
                        </p>
                    </PanelItem>
                </Panel>
            </div>
        );
    }
}

RequestSubmitted.propTypes = {
    data: PropTypes.object,
};
