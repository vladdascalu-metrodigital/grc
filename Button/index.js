import React, {Component} from 'react';
import classNames from 'classnames';
import './index.scss';

export default class Button extends Component {
    render() {

        const species = this.props.species
        const classnames = classNames(
            'mrc-btn',
            {'mrc-primary-button': species === 'primary'},
            {'mrc-secondary-button': species === 'secondary'},
            {'mrc-error-button': species === 'error'},
            {'mrc-success-button': species === 'success'},
        )

        return (
            <button className={classnames} type={props.type || 'button'} onClick={props.onClick} disabled={props.disabled}>
                {props.icon ? <img className='icon' src={props.icon}/> : null}
                {props.text}
            </button>
        );
    }
}
