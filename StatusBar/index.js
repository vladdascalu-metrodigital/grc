import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

export default class StatusBar extends Component {

    render() {
        return (
            <div className={classNames({'mrc-status-bar': true, warning: this.props.isWarning})}>
                {this.props.icon ? <img className='icon' src={this.props.icon}/> : null}
                {this.props.message}
            </div>
        );
    }
}

StatusBar.propTypes = {
    isWarning: PropTypes.bool,
    icon: PropTypes.string,
    message: PropTypes.string
};