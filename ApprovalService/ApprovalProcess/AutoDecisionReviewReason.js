import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import React, { Component } from 'react';
import ModalDialog from '../../ModalDialog';
import { lookup } from '../../Util/translations';

export default class AutoDecisionReviewReason extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.reviewReasonInput = React.createRef();
    }

    componentDidUpdate(prevState) {
        if (this.reviewReasonInput.current && this.state != prevState) {
            this.reviewReasonInput.current.focus();
        }
    }

    modalDialogContent() {
        return (
            <div>
                <div className="mrc-ui-input clear-both">
                    <label className="mrc-ui-label">{lookup('mrc.reviewReason.text')}</label>
                    <textarea
                        ref={this.reviewReasonInput}
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
                            this.props.toggleModal();
                        }}
                        disabled={_.isEmpty(this.props.newContent)}
                    >
                        {lookup('mrc.reviewReason.save')}
                    </button>
                    <button
                        type="button"
                        className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary"
                        onClick={this.props.toggleModal}
                    >
                        {lookup('mrc.reviewReason.cancel')}
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.isModalVisible ? (
                    <ModalDialog
                        toggle={this.props.toggleModal}
                        content={this.modalDialogContent()}
                        title={lookup('mrc.reviewReason.modalTitle')}
                    />
                ) : null}
            </div>
        );
    }
}

AutoDecisionReviewReason.propTypes = {
    onContentChange: PropTypes.func,
    toggleModal: PropTypes.func,
    isModalVisible: PropTypes.bool,
    onSave: PropTypes.func,
    newContent: PropTypes.string,
};
