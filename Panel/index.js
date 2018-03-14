import React, { Component } from 'react';
import './index.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default class Panel extends Component {

    render() {

        return (
            <div className='mrc-panel'>
                {this.createHeader()}
                <div className={classNames(this.props.className, 'panel-content')}>
                    {this.props.children}
                </div>
            </div>);
    }

    createHeader() {
        if(!this.props.title) return null;
        return <div className='panel-header'>
            <div className='title'>{this.props.title}</div>
            {this.props.closeTo && <Link to={this.props.closeTo}>Close</Link>}
        </div>;
    }
}
