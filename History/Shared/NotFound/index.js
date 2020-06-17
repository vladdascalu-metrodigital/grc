import React, { Component } from 'react';
import { lookup } from '../../../Util/translations';

export default class NotFound extends Component {
    render() {
        return (
            <div className="mrc-alert mrc-alert--error">
                <p>{lookup('history.errors.pageNotfFound')}</p>
            </div>
        );
    }
}
