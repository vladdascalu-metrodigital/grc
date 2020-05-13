import React, { Component } from 'react';
import './IFrame.scss';

export default class IFrame extends Component {
    render() {
        return (
            <div className="mrc-iframe">
                <h1 clannName="span-metro-blue">{this.props.title}</h1>
                <iframe src={this.props.src} height="1024" width="736" frameBorder="0" allowFullScreen />
            </div>
        );
    }
}
