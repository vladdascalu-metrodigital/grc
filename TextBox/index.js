import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { children, display, header, suffix, footer } = this.props;

        if (!children) {
            return null;
        }

        return (
            <div className={classnames('tb-wrapper', display)}>
                <div className="tb-header">{header}</div>
                <div>
                    <span className="tb-content">{children}</span>
                    <span className="tb-suffix">{suffix}</span>
                </div>
                {footer && <div className="tb-footer">{footer}</div>}
            </div>
        );
    }
}

TextBox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    suffix: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    success: PropTypes.bool,
    display: PropTypes.string,
};
