import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import ModalDialog from '../ModalDialog';
import Author from '../Author';
import './index.scss';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

const intersperse = (xs, e) => _.initial(_.reduce(xs, (acc, x) => _.concat(acc, [x, e]), []));

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
        const _comments = this.props.comments;
        const comments = _comments.map((comment, i) => (
            <div key={i} className="mrc-ui-comment">
                <Author
                    name={comment.uploaderName}
                    position={comment.uploaderPosition}
                    writeTime={comment.uploadTime}
                />
                <div className="mrc-ui-comment-text">{comment.content}</div>
            </div>
        ));
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
                {_.isEmpty(comments) ? null : (
                    <div className="mrc-ui-comments">
                        <h3 className="mrc-ui-comments-headline">{lookup('mrc.comments.comments')}</h3>
                        <div className="mrc-ui-comments-list">
                            {intersperse(comments, <hr className="mrc-ui-comment-divider" />)}
                        </div>
                    </div>
                )}
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={this.toggleModal}
                        content={this.modalDialogContent()}
                        title={lookup('mrc.comments.modaltitle')}
                    />
                ) : null}
            </div>
        );
    }
}

Comments.propTypes = {
    onContentChange: PropTypes.func,
    onSave: PropTypes.func,
    newContent: PropTypes.string,
    comments: PropTypes.array,
    canAddNew: PropTypes.bool,
    addNewDisabled: PropTypes.bool,
};
