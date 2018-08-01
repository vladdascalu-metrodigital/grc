import React, { Component } from 'react';
import './index.scss';
import classNames from 'classnames';

export default class Panel extends Component {

    render() {
        return (
            <div className='mrc-panel'>
                <div className={classNames(this.props.className, 'panel-content')}>
                    {this.props.children}
                </div>
            </div>);
    }
}
