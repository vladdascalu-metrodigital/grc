import React, {Component} from 'react';
import classNames from 'classnames';
import './index.scss';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { species, icon, text, type, disabled, onClick } = this.props;
        const buttonClasses = classNames(
            'mrc-btn',
            {'mrc-primary-button': species === 'primary'},
            {'mrc-secondary-button': species === 'secondary'},
            {'mrc-error-button': species === 'error'},
            {'mrc-success-button': species === 'success'},
        );
        return (
            <button className={buttonClasses} type={type || 'button'} onClick={onClick} disabled={disabled}>
                {icon ? <img className='icon' src={icon}/> : null}
                {text}
            </button>
        );
    }
}
