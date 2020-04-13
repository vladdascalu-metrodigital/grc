import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import { lookup } from '../Util/translations';
import React from 'react';
import Author from '../Author';

const intersperse = (xs, e) => _.initial(_.reduce(xs, (acc, x) => _.concat(acc, [x, e]), []));

export function CommentsList(props) {
    if (_.isEmpty(props.comments)) {
        return null;
    }
    const comments = props.comments.map((comment, i) => (
        <div key={i} className="mrc-ui-comment">
            <Author
                name={comment.uploaderPrincipalName}
                position={comment.uploaderPosition}
                writeTime={comment.uploadTimestamp}
                key={i}
            />
            <div className="mrc-ui-comment-text">{comment.comment}</div>
        </div>
    ));
    return (
        <div className="mrc-ui-comments">
            <h3 className="mrc-ui-comments-headline">{lookup('mrc.comments.comments')}</h3>
            <div className="mrc-ui-comments-list">
                {intersperse(
                    comments,
                    <hr
                        key={Math.random()
                            .toString(36)
                            .substr(2, 9)}
                        className="mrc-ui-comment-divider"
                    />
                )}
            </div>
        </div>
    );
}

export const CommentPropTypes = PropTypes.shape({
    id: PropTypes.string,
    comment: PropTypes.string.isRequired,
    uploadTimestamp: PropTypes.string.isRequired,
    uploaderPosition: PropTypes.string,
    uploaderPrincipalName: PropTypes.string.isRequired,
});

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(CommentPropTypes),
};
