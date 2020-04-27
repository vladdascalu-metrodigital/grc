import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class Bullet extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <mrc-status-icon className="mrc-status-icon" status={this.modeToStatus(this.props.mode)}>
                &#9679;
            </mrc-status-icon>
        );
    }

    modeToStatus(mode) {
        switch (mode) {
            case 'new':
                return 'active';
            case 'read':
                return '';
            case 'claimed':
                return 'warning';
        }
    }
}

Bullet.propTypes = {
    mode: PropTypes.string,
};
