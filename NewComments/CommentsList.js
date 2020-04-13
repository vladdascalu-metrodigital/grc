import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import { lookup } from '../Util/translations';
import React from 'react';
import Author from '../Author';
import { CommentPropTypes } from './CommentsPropTypes';

export function CommentsList(props) {
    if (_.isEmpty(props.comments)) {
        return (
            <div className="mrc-ui-comments">
                <h3 className="mrc-ui-no-comment">{lookup('mrc.comment.nocomments')}</h3>
            </div>
        );
    }
    const comments = props.comments.map((comment, i) => (
        <div key={i}>
            <div className="mrc-ui-comment">
                <Author
                    name={comment.uploaderPrincipalName}
                    position={comment.uploaderPosition}
                    writeTime={comment.uploadTimestamp}
                    key={i}
                />
                <div className="mrc-ui-comment-text">
                    {lookup(comment.comment)}&nbsp;
                    {(comment.comment === 'strategy.decision.blocked' ||
                        comment.comment === 'strategy.decision.rejected') &&
                    props.timeoutDate != undefined &&
                    props.timeoutDate != null ? (
                        <mrc-datetime className="datetime">{props.timeoutDate}</mrc-datetime>
                    ) : null}
                </div>
            </div>
            {i !== props.comments.length - 1 && (
                <hr
                    key={Math.random()
                        .toString(36)
                        .substr(2, 9)}
                    className="mrc-ui-comment-divider"
                />
            )}
        </div>
    ));
    return (
        <div className="mrc-ui-comments">
            <h3 className="mrc-ui-comments-headline">{lookup('mrc.comments.title')}</h3>
            <div className="mrc-ui-comments-list">{comments}</div>
        </div>
    );
}

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(CommentPropTypes),
    timeoutDate: PropTypes.string,
};
