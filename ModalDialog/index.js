import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

import closeModalImageFile from '../icons/modal-close.svg';
import Button from '../Button';

import './index.scss';

const MODAL_OPEN_CLASS = 'body--modal-open';

export default class ModalDialog extends Component {
    componentDidMount() {
        document.body.classList.add(MODAL_OPEN_CLASS);
    }

    componentWillUnmount() {
        document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    render() {
        return (
            <div className="mrc-ui-modal-component">
                <div className="mrc-ui-modal-overlay"></div>
                <div className="mrc-ui-modal">
                    <button className="mrc-ui-modal-close-button" onClick={this.props.toggle}>
                        <img src={closeModalImageFile} alt="Close" />
                    </button>
                    <h3 className="mrc-ui-modal-title">{this.props.title}</h3>
                    <div className="mrc-ui-modal-content">{this.props.content || this.props.children}</div>
                </div>
            </div>
        );
    }
}

ModalDialog.propTypes = {
    toggle: PropTypes.func,
    content: PropTypes.node,
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
};

export class ModalDialogSimple extends Component {
    render() {
        let { content, children, onCancel, onOk, cancelText, okText, ...otherProps } = this.props;
        otherProps.toggle = onCancel = onCancel || otherProps.toggle;
        cancelText = cancelText || lookup('mrc.cancel');
        okText = okText || 'OK';
        return (
            <ModalDialog {...otherProps}>
                <div>{content || children}</div>
                <div className="mrc-ui-modal-simple-buttons">
                    <Button isOutlined onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button onClick={onOk}>{okText}</Button>
                </div>
            </ModalDialog>
        );
    }
}

ModalDialogSimple.propTypes = {
    ...ModalDialog.propTypes,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
};
