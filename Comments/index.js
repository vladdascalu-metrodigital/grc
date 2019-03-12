import React, {Component} from 'react';
import './index.scss';
import {lookup} from '../Util/translations';
import PropTypes from 'prop-types';

export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {newComment: ''};
    }

    render() {
        const readyToSend = this.state.newComment.trim().length > 0;
        const comments = this.props.data || [];
        const addCommentTitle = this.props.addCommentTitle || 'Add Comment';
        return (
            <div className='mrc-comments'>
                {comments.map(comment => {
                    return (<div key={comment.id} className='mrc-comment'>
                        <mrc-datetime class='datetime'>{comment.uploadTimestamp}</mrc-datetime> <span className='author'>{comment.uploaderPrincipalName} ({comment.uploaderPosition})</span>
                        <div className='content'>{lookup(comment.comment)}</div>
                    </div>);
                })}
                <div className='m-input m-input-name'>
                    <div className='m-input-elementWrapper'>
                        <textarea value={this.state.newComment} onChange={this.handleNewCommentChange}
                                  disabled={this.props.readonly}
                                  className='m-input-element extra-class-on-input-tag'/>
                    </div>
                </div>
                <button disabled={this.props.readonly || !readyToSend} onClick={this.addComment}
                        type='button' className='mrc-secondary-button'>{addCommentTitle}</button>
            </div>);
    }

    handleNewCommentChange = (event) => {
        this.setState({newComment: event.target.value});
    };

    addComment = () => {
        const comment = this.state.newComment;
        this.setState({newComment: ''});
        this.props.addComment(comment);
    };
}

Comments.propTypes = {
    addComment: PropTypes.func.isRequired,
    data: PropTypes.array,
    ready: PropTypes.bool,
    readonly: PropTypes.bool,
    addCommentTitle: PropTypes.string
};
