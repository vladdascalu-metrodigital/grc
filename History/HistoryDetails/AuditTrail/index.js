import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../../../Util/translations.js';
import classNames from 'classnames';
import { Accordion, Collapsible } from '../../../Accordion';
import * as _ from 'lodash';
import './index.css';
import { Table } from '../../../Table';

export default class AuditTrail extends Component {
    actionToTranslationKey = {
        RETRY_GETTING_INDICATORS: 'mrc.status.retry_getting_indicators',
        RELEASED: 'mrc.status.released',
        PENDING: 'mrc.status.pending',
        CLAIMED: 'mrc.status.claimed',
        REQUESTED: 'mrc.status.requested',
        FAILED: 'mrc.status.failed',
        ACTIVATED: 'mrc.status.activated',
        RETRIED: 'mrc.status.retried',
        APPROVED: 'mrc.status.approved',
        BLOCKED: 'mrc.status.blocked',
        CANCELLED: 'mrc.status.cancelled',
        SENT_BACK: 'mrc.status.sentback',
        WAITING_FOR_INFO: 'mrc.status.waitingforinfo',
        INFO_PROVIDED: 'mrc.status.infoprovided',
        PROVIDED: 'mrc.status.provided',
        REJECTED: 'mrc.status.rejected',
        MANUAL: 'mrc.status.manual',
        REVIEW: 'mrc.status.review',
        REVIEW_PENDING: 'mrc.status.review_pending',
        CHANGED: 'mrc.status.changed',
        ABORTED: 'mrc.status.aborted',
        CONTRACT_SIGNED: 'mrc.status.done',
        CONTRACT_VALIDATED: 'mrc.status.done',
        SENT_BACK_CONTRACTING: 'mrc.status.sentback_contracting',
    };

    actionTranslation = action => {
        const capitalized = action.toUpperCase();
        return lookup(this.actionToTranslationKey[capitalized] || capitalized);
    };

    createRow = (item, status, i) => {
        const action = item.status.toLowerCase();
        const normalAction =
            action === 'review' ||
            action === 'pending' ||
            action === 'review_pending' ||
            action === 'requested' ||
            action === 'sent_back' ||
            action === 'provided';
        const erroneousAction =
            action === 'failed' || action === 'blocked' || action === 'cancelled' || action === 'rejected';
        const successfulAction = action === 'approved' || action === 'activated' || action === 'changed';
        const classnames = classNames(
            'uppercase',
            { 'span-blue': normalAction },
            { 'span-error': erroneousAction },
            { 'span-success': successfulAction }
        );
        return (
            <div key={'item-' + i}>
                <div className="mrc-log">
                    <ul>
                        {item.date ? <li>{this.createDateTimeEntry(item.date)}</li> : null}
                        <li>
                            <span className="user">{item.user}</span>
                        </li>
                    </ul>
                    <span className={classnames}>{this.actionTranslation(item.status)}</span>
                </div>
                <div>{this.additionalInfo(item.additionalInfo)}</div>
            </div>
        );
    };

    createDateTimeEntry = key => {
        return key ? <mrc-date class="when">{key}</mrc-date> : <span className="when">-</span>;
    };

    additionalInfoTable(responses) {
        const columns = [
            { Header: lookup('history.storeNumber'), accessor: 'storeNumber' },
            { Header: lookup('history.customerNumber'), accessor: 'customerNumber' },
            { Header: lookup('history.resultCode'), accessor: 'resultCode' },
            {
                Header: lookup('history.resultMessage'),
                accessor: 'resultMessage',
                renderFn: resultMessage => lookup('history.' + resultMessage),
            },
        ];

        return <Table className={'mrc-data-table'} columns={columns} data={responses} />;
    }

    additionalInfo(info) {
        return info && info.responses ? (
            <Accordion>
                <Collapsible open={false} trigger={lookup('history.auditTrail.activationResultTable')}>
                    {this.additionalInfoTable(info.responses)}
                </Collapsible>
            </Accordion>
        ) : null;
    }

    render() {
        const phaseSet = _.get(this.props, 'auditTrailDetails.phaseSet');
        if (_.isNil(phaseSet) || _.isEmpty(phaseSet)) {
            return <div className="mrc-detail">{lookup('history.auditTrail.loadingError')}</div>;
        } else {
            return phaseSet.map(phase => {
                return (
                    <section className="mrc-logs" key={phase.auditStep}>
                        <h5 className="span-metro-blue uppercase" key={'mrc-audit-trail-init-uppercase'}>
                            {lookup(
                                'mrc.phase.' +
                                    (phase.auditStep !== undefined ? String(phase.auditStep).toLocaleLowerCase() : '')
                            )}
                        </h5>
                        {phase.items.map((item, i) => this.createRow(item, this.props.status, i))}
                    </section>
                );
            });
        }
    }
}

AuditTrail.propTypes = {
    auditTrail: PropTypes.array,
    status: PropTypes.string,
};
