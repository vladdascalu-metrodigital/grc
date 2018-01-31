import React, {Component} from 'react';
import './index.scss';
import PrimaryButton from '../PrimaryButton';
import Add from '../icons/add.svg';
import Panel from '../Panel';
import PanelItem from '../Panel/PanelItem';
import CommentsRows from './CommentsRows';
import PropTypes from 'prop-types';

export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {newComment: ''};

        // this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
        // this.addComment = this.addComment.bind(this);
    }

    render() {
        const readyToSend = this.state.newComment.trim().length > 0;
        return (
            <Panel title='Comments' className='mrc-comments'>
                <PanelItem>
                    <CommentsRows data={this.props.data}/>
                </PanelItem>
                <PanelItem>
                    <label>Comment<textarea value={this.state.newComment}
                                            onChange={this.handleNewCommentChange}/></label>
                    <PrimaryButton
                        showSpinner={!this.props.ready}
                        icon={Add}
                        onClick={this.addComment}
                        disabled={this.props.readonly || !readyToSend}/>
                </PanelItem>
            </Panel>);
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
    readonly: PropTypes.bool
};
