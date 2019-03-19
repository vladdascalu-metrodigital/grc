import React, {Component} from 'react';
import classNames from 'classnames';
import './index.scss';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { status, icon, text, type, disabled, onClick } = this.props;
        const buttonClasses = classNames(
            'mrc-btn',
            {'mrc-primary-button': status === 'primary'},
            {'mrc-secondary-button': status === 'secondary'},
            {'mrc-error-button': status === 'error'},
            {'mrc-success-button': status === 'success'},
        );
        return (
            <button className={buttonClasses} type={type || 'button'} onClick={onClick} disabled={disabled}>
                {icon ? <img className='icon' src={icon}/> : null}
                {text}
            </button>
        );
    }
}
