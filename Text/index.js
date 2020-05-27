import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const COLOR = {
    CONTRAST_WHITE: 'white',
    CONTRAST_BLACK: 'black',
    INTERACTION: 'interaction',
    SUCCESS: 'success',
    NEUTRAL: 'neutral',
    DANGER: 'danger',
    ATTENTION: 'attention',
    LIGHT: 'light',
};

export default class Text extends Component {
    render() {
        let { color, children } = this.props;
        let className = classnames('mrc-ui-text', color && 'mrc-ui-text-' + color);
        return <span className={className}>{children}</span>;
    }
}

Text.propTypes = {
    color: PropTypes.oneOf(['white', 'black', 'interaction', 'success', 'neutral', 'danger', 'attention']),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
