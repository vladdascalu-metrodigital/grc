import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { lookup } from '../Util/translations';

import { CommentsList } from './CommentsList';
import CommentsAdd from './CommentsAdd';
import { CommentPropTypes, PreviousRequestCommentsMetaPropTypes } from './CommentsPropTypes';
import Button from '../Button';

import './index.scss';

let previousRequestsTitles = [
    'mrc.comments.last_request',
    'mrc.comments.secont_last_request',
    'mrc.comments.third_last_request',
];

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSave = this.onSave.bind(this);
    }

    onSave() {
        const newValue = this.state.newValue;
        this.setState({ newValue: undefined });
        this.props.onSave && this.props.onSave(newValue);
    }

    render() {
        let { onClickShowPrevious, previousRequestsComments } = this.props;
        return (
            <div className="mrc-ui-comment-component">
                <CommentsAdd
                    newContent={this.state.newValue}
                    onContentChange={(newValue) => this.setState({ newValue })}
                    onSave={this.onSave}
                    canAddNew={!this.props.disabled}
                    addNewDisabled={this.props.disabled}
                />
                <CommentsList title={lookup('mrc.comments.title')} {...this.props} />
                {onClickShowPrevious && !previousRequestsComments ? (
                    <Button
                        onClick={onClickShowPrevious}
                        text={lookup('mrc.comments.show_previous_comments')}
                        isOutlined
                    />
                ) : null}
                {previousRequestsComments ? (
                    <div className="mrc-ui-comment-component-previous">
                        {previousRequestsComments.slice(0, 3).map((item, i) => (
                            <CommentsList
                                previousRequestMeta={item}
                                title={previousRequestsTitles[i]}
                                comments={item.comments}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
}

Comments.propTypes = {
    onSave: PropTypes.func,
    comments: PropTypes.arrayOf(CommentPropTypes),
    disabled: PropTypes.bool,
    timeoutDate: PropTypes.string,
    onClickShowPrevious: PropTypes.func,
    previousRequestsComments: PropTypes.arrayOf(
        PropTypes.shape({
            ...PreviousRequestCommentsMetaPropTypes,
            comments: PropTypes.arrayOf(CommentPropTypes),
        })
    ),
};
