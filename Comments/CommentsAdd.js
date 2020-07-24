import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import { lookup } from '../Util/translations';

import ModalDialog from '../ModalDialog';
import Button from '../Button';

export default class CommentsAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.toggleModal = this.toggleModal.bind(this);
        this.commentsInput = React.createRef();
    }

    componentDidUpdate(prevState) {
        if (this.commentsInput.current && this.state != prevState) {
            this.commentsInput.current.focus();
        }
    }

    toggleModal() {
        this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
    }

    modalDialogContent() {
        return (
            <div>
                <div className="mrc-ui-input clear-both">
                    <label className="mrc-ui-label">{lookup('mrc.comments.text')}</label>
                    <textarea
                        ref={this.commentsInput}
                        className="mrc-ui-textarea"
                        value={this.props.newContent}
                        onChange={(e) => this.props.onContentChange && this.props.onContentChange(e.target.value)}
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
        let { canAddNew, addNewDisabled } = this.props;
        if ((canAddNew && !addNewDisabled) === false) return null;
        return (
            <div className="mt-5">
                <Button
                    text={lookup('mrc.comments.addcomment')}
                    size="large"
                    onClick={this.toggleModal}
                    disabled={addNewDisabled}
                />
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
