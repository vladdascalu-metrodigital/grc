import React, {Component} from 'react';
import './index.scss';
import classNames from 'classnames';

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
        return this.props.title ? <div className='panel-header'>
            <div className='title'>{this.props.title}</div>
        </div> : null;
    }
}