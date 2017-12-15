import React, {Component} from 'react';
import './index.scss';

export default class ErrorLayout extends Component {

    createError(error, btn) {
        return <div className='mrc-error'>
            <div className='message'>
                {error}
            </div>
            {btn ? <button onClick={document.location.reload()}>Reload</button> : null}
        </div>;
    }

    render() {
        return this.props.error
            ? this.createError(this.props.error)
            : null;
    }
}
