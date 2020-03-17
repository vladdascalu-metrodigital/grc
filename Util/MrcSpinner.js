import React, { Component } from 'react';
import Spinner from 'spin.js';

// inspired by https://github.com/qimingweng/react-spinjs/blob/master/src/index.js
export default class MrcSpinner extends Component {
    componentDidMount() {
        this.spinner = new Spinner({ length: 6, width: 1.35, radius: 6, color: '#0099FF', direction: -1 });
        this.spinner.spin(this.container);
    }

    componentWillUnmount() {
        this.spinner.stop();
    }

    render() {
        return (
            <span
                className="mrc-spinner"
                {...this.props}
                ref={c => {
                    this.container = c;
                }}
            />
        );
    }
}
