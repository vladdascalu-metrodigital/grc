import React, { PureComponent } from 'react';
import { PreviousRequestCommentsMetaPropTypes } from './CommentsPropTypes';
import { lookup } from '../Util/translations';
import classnames from 'classnames';

import MrcDate from '../MrcDate';
import MrcNumber from '../MrcNumber';

import './CommentsRequestMeta.scss';

export default class CommentsRequestMeta extends PureComponent {
    render() {
        let { startDate, finalState, country, groupLimit, appliedLimit } = this.props;
        let finalStateClassName = classnames('mrc-ui-comments-request-meta-state', {
            'mrc-ui-comments-request-meta-state-danger':
                finalState === 'STATE.BLOCKED' || finalState === 'STATE.ABORTED',
            'mrc-ui-comments-request-meta-state-success': finalState === 'STATE.APPROVED',
        });
        return (
            <div className="mrc-ui-comments-request-meta">
                <div className="mrc-ui-comments-request-meta-box">
                    <MrcDate>{startDate}</MrcDate>
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.startDate')}</span>
                </div>
                <div className="mrc-ui-comments-request-meta-box">
                    <span className={finalStateClassName}>{finalState}</span>
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.finalState')}</span>
                </div>
                <div className="mrc-ui-comments-request-meta-box">
                    <MrcNumber isCurrency country={country}>
                        {groupLimit}
                    </MrcNumber>
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.groupLimit')}</span>
                </div>
                <div className="mrc-ui-comments-request-meta-box">
                    {appliedLimit ? (
                        <MrcNumber isCurrency country={country}>
                            {appliedLimit}
                        </MrcNumber>
                    ) : (
                        '–'
                    )}
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.appliedLimit')}</span>
                </div>
            </div>
        );
    }
}

CommentsRequestMeta.propTypes = {
    ...PreviousRequestCommentsMetaPropTypes,
};
