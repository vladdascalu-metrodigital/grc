import React, {Component} from 'react';
import './index.scss';
import {lookup} from '../Util/translations';
import PropTypes from 'prop-types';

export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    handleChange(e) {
        this.props.handleNewCommentChange(e.target.value);
    }

    addComment(e) {
        this.props.addComment();
    }

    render() {
        const readyToSend = this.props.newComment.trim().length > 0;
        const comments = this.props.data || [];
        const addCommentTitle = this.props.addCommentTitle || 'Add Comment';
        return (
            <div className='mrc-comments'>
                {comments.map(comment => {
                    return (<div key={comment.id} className='mrc-comment'>
                        <mrc-datetime class='datetime'>{comment.uploadTimestamp}</mrc-datetime> <span className='author'>{comment.uploaderPrincipalName} ({comment.uploaderPosition})</span>
                        <div className='content'>
                            {lookup(comment.comment)}&nbsp;
                            {(comment.comment === 'strategy.decision.blocked' || comment.comment === 'strategy.decision.rejected' ) && this.props.timeoutDate != undefined && this.props.timeoutDate != null
                                ? <mrc-datetime className='datetime'>{this.props.timeoutDate}</mrc-datetime> : ''}
                        </div>
                    </div>);
                })}
                <div className='m-input m-input-name'>
                    <div className='m-input-elementWrapper'>
                        <textarea value={this.props.newComment} onChange={this.handleChange}
                                  disabled={this.props.readonly}
                                  className='m-input-element extra-class-on-input-tag'/>
                    </div>
                </div>
                <button disabled={this.props.readonly || !readyToSend} onClick={this.addComment}
                        type='button' className='mrc-secondary-button'>{addCommentTitle}</button>
            </div>);
    }
}

Comments.propTypes = {
    addComment: PropTypes.func.isRequired,
    handleNewCommentChange: PropTypes.func.isRequired,
    newComment: PropTypes.string.isRequired,
    data: PropTypes.array,
    ready: PropTypes.bool,
    readonly: PropTypes.bool,
    addCommentTitle: PropTypes.string,
    timeoutDate: PropTypes.string
};
