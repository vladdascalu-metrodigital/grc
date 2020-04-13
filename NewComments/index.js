import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import ModalDialog from '../ModalDialog';
import './index.scss';
import { PropTypes } from 'prop-types';
import { CommentPropTypes, CommentsList } from './CommentsList';

export default class Comments extends Component {
    toggleModal = () => {
        this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    modalDialogContent() {
        return (
            <div>
                <div className="mrc-ui-input clear-both">
                    <label className="mrc-ui-label">{lookup('mrc.comments.text')}</label>
                    <textarea
                        className="mrc-ui-textarea"
                        value={this.props.newContent}
                        onChange={e => this.props.onContentChange(e.target.value)}
                    ></textarea>
                </div>

                <div className="mrc-btn-group">
                    <button
                        type="button"
                        className="mrc-btn mrc-primary-button mrc-ui-button-small"
                        onClick={() => {
                            this.props.onSave(this.props.newContent);
                            this.toggleModal();
                        }}
                    >
                        {lookup('mrc.comments.save')}
                    </button>
                    <button
                        type="button"
                        className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary"
                        onClick={this.toggleModal}
                    >
                        {lookup('mrc.comments.cancel')}
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="mrc-ui-comment-component">
                {this.props.canAddNew && !this.props.addNewDisabled ? (
                    <button
                        type="button"
                        className="mrc-primary-large-add-button"
                        onClick={this.toggleModal}
                        disabled={this.props.addNewDisabled}
                    >
                        {lookup('mrc.comments.addcomment')}
                    </button>
                ) : null}
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={this.toggleModal}
                        content={this.modalDialogContent()}
                        title={lookup('mrc.comments.modaltitle')}
                    />
                ) : null}
                <CommentsList comments={this.props.comments} />
            </div>
        );
    }
}

Comments.propTypes = {
    onContentChange: PropTypes.func,
    onSave: PropTypes.func,
    newContent: PropTypes.string,
    comments: PropTypes.arrayOf(CommentPropTypes),
    canAddNew: PropTypes.bool,
    addNewDisabled: PropTypes.bool,
};
