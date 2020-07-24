import React, { PureComponent } from 'react';
import { PreviousRequestCommentsMetaPropTypes } from './CommentsPropTypes';
import { lookup } from '../Util/translations';

import MrcDate from '../MrcDate';
import MrcNumber from '../MrcNumber';

import './CommentsRequestMeta.scss';

export default class CommentsRequestMeta extends PureComponent {
    render() {
        let { startDate, finalState, country, groupLimit, appliedLimit } = this.props;
        return (
            <div className="mrc-ui-comments-request-meta">
                <div className="mrc-ui-comments-request-meta-block">
                    <MrcDate>{startDate}</MrcDate>
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.startDate')}</span>
                </div>
                <div className="mrc-ui-comments-request-meta-block">
                    <span>{finalState}</span>
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.finalState')}</span>
                </div>
                <div className="mrc-ui-comments-request-meta-block">
                    <MrcNumber isCurrency country={country}>
                        {groupLimit}
                    </MrcNumber>
                    <span className="mrc-ui-comments-request-meta-label">{lookup('mrc.groupLimit')}</span>
                </div>
                <div className="mrc-ui-comments-request-meta-block">
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
