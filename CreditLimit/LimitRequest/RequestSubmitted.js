import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../../Panel';
import PanelItem from '../../Panel/PanelItem';
import { Link } from 'react-router-dom';
import './index.scss';
import { lookup } from '../../Util/translations';

export default class RequestSubmitted extends Component {
    createSummaryPanel() {
        if (!this.props.data) return null;

        const host = window.location.origin;
        return (
            <Panel>
                <PanelItem>
                    <section className="details">
                        <p>
                            {lookup('mrc.creditdetails.requestdetails')}{' '}
                            <a href={host + '/history/items/request/' + this.props.data.id}>
                                {lookup('mrc.creditdetails.here')}
                            </a>
                        </p>
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
                        <h1>{lookup('creditlimit.limitrequest.thankyou')}</h1>
                        <p>{lookup('creditlimit.limitrequest.approval')}</p>
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
