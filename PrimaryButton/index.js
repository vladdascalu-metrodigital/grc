import React, { Component } from 'react';
import MrcSpinner from '../Util/MrcSpinner';
import './index.scss';

export default class PrimaryButton extends Component {
    createContent(props) {
        if (props.showSpinner) {
            return <MrcSpinner />;
        }
        return (
            <button
                className={'mrc-primary-button ' + props.buttonClass}
                type={props.type || 'button'}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.icon ? <img className="icon" src={props.icon} /> : null}
                {props.text}
            </button>
        );
    }

    render() {
        return <div className="mrc-btn">{this.createContent(this.props)}</div>;
    }
}
