import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import closeModalImageFile from '../icons/modal-close.svg';
import './index.scss';

const SIDESCREEN_OPEN_CLASS = 'body--sidescreen-open';

export default class SideScreen extends Component {
    componentDidMount() {
        document.body.classList.add(SIDESCREEN_OPEN_CLASS);
        document.documentElement.classList.add(SIDESCREEN_OPEN_CLASS);
    }

    componentWillUnmount() {
        document.body.classList.remove(SIDESCREEN_OPEN_CLASS);
        document.documentElement.classList.remove(SIDESCREEN_OPEN_CLASS);
    }

    render() {
        let { children, title, toggle, side } = this.props;
        let className = classnames('mrc-ui-sidescreen', {
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
    toggle: PropTypes.func.isRequired,
    side: PropTypes.oneOf(['left', 'right']),
};

SideScreen.defaultProps = {
    side: 'right',
};
