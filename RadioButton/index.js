import React, { Component } from 'react';

export default class RadioButton extends Component {
    render() {
        const label = this.props.label;
        return (
            <div className="mrc-radio-button">
                <label className="m-radioButton" htmlFor={label}>
                    <span>
                        <input
                            checked={this.props.checked ? 'checked' : ''}
                            type="radio"
                            className="m-radioButton-input"
                            id={label}
                            label={label}
                            name={this.props.tag}
                            onClick={this.props.onClick}
                            onChange={this.props.onChange}
                        />
                        <div className="m-radioButton-inputIcon"></div>
                    </span>
                    <span className="m-radioButton-label">{label}</span>
                </label>
            </div>
        );
    }
}
