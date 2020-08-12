import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class Pill extends PureComponent {
    render() {
        let { text, type } = this.props;
        let className = classnames('mrc-ui-pill', {
            'mrc-ui-pill-danger': type === 'danger',
            'mrc-ui-pill-success': type === 'success',
        });
        return <span className={className}>{text}</span>;
    }
}

Pill.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['danger', 'success']),
};
