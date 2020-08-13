import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import closeModalImageFile from '../icons/modal-close.svg';
import './index.scss';

export default class SideScreen extends Component {
    render() {
        let { children, title, isShown, toggle, side } = this.props;
        let className = classnames('mrc-ui-sidescreen', {
            'mrc-ui-sidescreen-shown': isShown === true,
            'mrc-ui-sidescreen-left': side === 'left',
        });
        return (
            <div className={className}>
                <div className="mrc-ui-sidescreen-slider">
                    <div className="mrc-ui-sidescreen-header">
                        <h2 className="mrc-ui-sidescreen-title">{title}</h2>
                        <button className="mrc-ui-sidescreen-close-button" onClick={toggle}>
                            <img src={closeModalImageFile} alt="Close" />
                        </button>
                    </div>
                    <div className="mrc-ui-sidescreen-content">{children}</div>
                </div>
            </div>
        );
    }
}

SideScreen.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    isShown: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    side: PropTypes.oneOf(['left', 'right']),
};

SideScreen.defaultProps = {
    side: 'right',
};
