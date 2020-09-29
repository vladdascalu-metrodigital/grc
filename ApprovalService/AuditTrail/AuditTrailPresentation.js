import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AuditTrail.scss';
import { lookup } from '../../Util/translations.js';
import classNames from 'classnames';
import MrcDate from '../../MrcDate';

import * as _ from 'lodash';

export default class AuditTrailPresentation extends Component {
    render() {
        // get the trail in reverse order, to display latest entries on top
        const trail = [...this.props.auditTrail].reverse();

        if (!(trail && trail.length > 0)) {
            return (
                <span>
                    <i>No data.</i>
                </span>
            );
        }

        return this.renderTrail(trail, {
            approval: [...(this.props.pendingApprovalPositions || [])].reverse(),
            contracting: [...(this.props.pendingContractingPositions || [])].reverse(),
        });
    }

    renderTrail(trail, pendingPositions) {
        const contractingSection =
            !_.isNil(pendingPositions.contracting) && !_.isEmpty(pendingPositions.contracting) ? (
                <section className="mrc-logs" key={'mrc-audit-trail-contracting-logs'}>
                    <h5 className="span-metro-blue uppercase" key={'mrc-audit-trail-contracting-uppercase'}>
                        {lookup('mrc.phase.contracting')}
                    </h5>
                    {pendingPositions.contracting.map(this.createPending)}
                </section>
            ) : null;

        const compartments = trail.reduce(
            (compartments, audit) => {
                (audit.action === 'REQUESTED' ? compartments.inits : compartments.approvals).push(audit);
                return compartments;
            },
            { approvals: [], inits: [] }
        );

        return (
            <div className="mrc-audit-trail" key={'mrc-audit-trail'}>
                {contractingSection}
                <section className="mrc-logs" key={'mrc-audit-trail-approval-logs'}>
                    <h5 className="span-metro-blue uppercase" key={'mrc-audit-trail-approval-uppercase'}>
                        {lookup('mrc.phase.approval')}
                    </h5>
                    {pendingPositions.approval.map(this.createPending)}
                    {compartments.approvals.map(this.createRow)}
                </section>
                <section className="mrc-logs" key={'mrc-audit-trail-init-logs'}>
                    <h5 className="span-metro-blue uppercase" key={'mrc-audit-trail-init-uppercase'}>
                        {lookup('mrc.phase.initialization')}
                    </h5>
                    {compartments.inits.map(this.createRow)}
                </section>
            </div>
        );
    }

    //
    // map item.action values to I18N keys
    // values taken from Java class AuditTrailEntry.Action
    //
    actionI18N = {
        REQUESTED: 'mrc.status.requested',
        APPROVED: 'mrc.status.approved',
        BLOCKED: 'mrc.status.blocked',
        CANCELLED: 'mrc.status.cancelled',
        SENT_BACK: 'mrc.status.sentback',
        WAITING_FOR_INFO: 'mrc.status.waitingforinfo',
        INFO_PROVIDED: 'mrc.status.infoprovided',
        REJECTED: 'mrc.status.rejected',
        MANUAL: 'mrc.status.manual',
        REVIEW: 'mrc.status.review',
        REVIEW_PENDING: 'mrc.status.review_pending',
    };

    //
    // lookup I18N for an action
    //
    actionlookup = (action) => {
        return lookup(this.actionI18N[action] || action);
    };

    createRow = (item) => {
        const action = item.action.toLowerCase();
        const classnames = classNames(
            'uppercase',
            {
                'span-blue':
                    action === 'review' ||
                    action === 'pending' ||
                    action === 'requested' ||
                    action === 'sent_back' ||
                    action === 'provided',
            },
            {
                'span-error':
                    action === 'failed' || action === 'blocked' || action === 'cancelled' || action === 'rejected',
            },
            { 'span-success': action === 'approved' || action === 'activated' }
        );
        return (
            <div className="mrc-log" key={item.whenTimestamp}>
                <ul>
                    <li key={item.whenTimestamp}>{this.createDateTimeEntry(item.whenTimestamp)}</li>
                    <li>
                        <span className="user">
                            {item.who || ''} ({item.position})
                        </span>
                    </li>
                </ul>
                <span className={classnames}>{this.actionlookup(item.action)}</span>
            </div>
        );
    };

    createPending = (position, idx) => {
        return (
            <div className="mrc-log" key={idx}>
                <ul>
                    <li key={idx}>
                        <span className="when">-</span>
                    </li>
                    <li>
                        <span className="pendingposition">({position})</span>
                    </li>
                </ul>
                <span className="span-blue uppercase pending">{lookup('mrc.status.pending')}</span>
            </div>
        );
    };

    createDateTimeEntry = (key) => {
        return key ? <MrcDate>{key}</MrcDate> : <span className="when">-</span>;
    };
}

AuditTrailPresentation.propTypes = {
    auditTrail: PropTypes.array,
    pendingApprovalPositions: PropTypes.array,
    pendingContractingPositions: PropTypes.array,
};
