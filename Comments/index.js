import React, { Component } from 'react';
import './index.scss';
import { PropTypes } from 'prop-types';
import { CommentsList } from './CommentsList';
import CommentsAdd from './CommentsAdd';
import { CommentPropTypes } from './CommentsPropTypes';

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
        return (
            <div className="mrc-ui-comment-component">
                <CommentsAdd
                    newContent={this.state.newValue}
                    onContentChange={(newValue) => this.setState({ newValue })}
                    onSave={this.onSave}
                    canAddNew={!this.props.disabled}
                    addNewDisabled={this.props.disabled}
                />
                <CommentsList {...this.props} />
            </div>
        );
    }
}

Comments.propTypes = {
    onSave: PropTypes.func,
    comments: PropTypes.arrayOf(CommentPropTypes),
    disabled: PropTypes.bool,
    timeoutDate: PropTypes.string,
};
