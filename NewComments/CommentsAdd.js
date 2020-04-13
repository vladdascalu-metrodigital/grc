import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import { lookup } from '../Util/translations';
import React, { Component } from 'react';
import ModalDialog from '../ModalDialog';

export default class CommentsAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
    }

    modalDialogContent() {
        return (
            <div>
                <div className="mrc-ui-input clear-both">
                    <label className="mrc-ui-label">{lookup('mrc.comments.text')}</label>
                    <textarea
                        className="mrc-ui-textarea"
                        value={this.props.newContent}
                        onChange={e => this.props.onContentChange && this.props.onContentChange(e.target.value)}
                    ></textarea>
                </div>

                <div className="mrc-btn-group">
                    <button
                        type="button"
                        className="mrc-btn mrc-primary-button mrc-ui-button-small"
                        onClick={() => {
                            this.props.onSave && this.props.onSave();
                            this.toggleModal();
                        }}
                        disabled={_.isEmpty(this.props.newContent)}
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
            <div>
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
            </div>
        );
    }
}

CommentsAdd.propTypes = {
    onContentChange: PropTypes.func,
    onSave: PropTypes.func,
    newContent: PropTypes.string,
    canAddNew: PropTypes.bool,
    addNewDisabled: PropTypes.bool,
};
