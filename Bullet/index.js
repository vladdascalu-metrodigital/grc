import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

export const MODE = {
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
    ACTIVE: 'ACTIVE',
    // business related, for compatibility
    // new modes should be mapped to WARNING/ERROR/SUCCESS/ACTIVE
    NEW: 'NEW',
    READ: 'READ',
    CLAIMED: 'CLAIMED',
};

export default class Bullet extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let { alt, mode } = this.props;
        mode = mode ? mode.toUpperCase() : null;
        let className = classnames('mrc-ui-bullet', {
            'mrc-ui-bullet-default': Object.keys(MODE).indexOf(mode) == -1,
            'mrc-ui-bullet-warning': mode === MODE.WARNING || mode === MODE.CLAIMED,
            'mrc-ui-bullet-error': mode === MODE.ERROR,
            'mrc-ui-bullet-success': mode === MODE.SUCCESS,
            'mrc-ui-bullet-active': mode === MODE.ACTIVE || mode === MODE.NEW,
        });
        return <div className={className}>{!!alt && <span className="sr-only">{alt}</span>}</div>;
    }
}

Bullet.propTypes = {
    alt: PropTypes.string,
    mode: PropTypes.string,
};
