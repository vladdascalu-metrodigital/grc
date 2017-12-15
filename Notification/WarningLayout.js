import React, {Component} from 'react';
import './index.scss';

export default class WarningLayout extends Component {

    createWarning(error) {
        return <div className='mrc-warning'>
            <div className='message'>
                {error}
            </div>
        </div>;
    }

    render() {
        return this.props.message
            ? this.createWarning(this.props.message)
            : null;
    }
}
