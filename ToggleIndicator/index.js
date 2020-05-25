import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class ToggleIndicator extends PureComponent {
    render() {
        let className = classnames('mrc-ui-toggle-indicator', {
            'mrc-ui-toggle-indicator-tilted': this.props.tilt,
        });
        return <span className={className}>+</span>;
    }
}

ToggleIndicator.propTypes = {
    tilt: PropTypes.bool,
};
