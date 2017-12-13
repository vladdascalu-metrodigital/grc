import React, {Component} from 'react';
import './panelitem.scss';

export default class PanelItem extends Component {

    render() {
        return <div className='mrc-panel-item'>
            {this.props.children}
        </div>;
    }
}