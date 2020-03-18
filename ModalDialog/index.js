import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import './index.scss';
import closeModalImageFile from '../icons/modal-close.svg';

export default class ModalDialog extends Component {
    render() {
        return (
            <div className="mrc-ui-modal-component">
                <div className="mrc-ui-modal-overlay"></div>
                <div className="mrc-ui-modal">
                    <button className="mrc-ui-close-button" onClick={this.props.toggle}>
                        <img src={closeModalImageFile} alt="Close" />
                    </button>
                    <h3 className="mrc-ui-modal-title">Add Recommendation</h3>

                    <div className="mrc-ui-modal-content">{this.props.content}</div>
                </div>
            </div>
        );
    }
}

ModalDialog.propTypes = {
    toggle: PropTypes.func,
    content: PropTypes.node,
};
