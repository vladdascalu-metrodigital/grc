import React, { Component } from 'react';
import './index.scss';
import classNames from 'classnames';

export default class InfoRow extends Component {
    render() {
        return (
            <section className="mrc-info-row">
                <div className="infos">
                    {this.createPrimary()}
                    {this.createSecondary()}
                </div>
                <div className="icon">
                    {this.createIcon()}
                    {this.createIconText()}
                </div>
            </section>
        );
    }

    createPrimary() {
        return <h1>{this.props.primary}</h1>;
    }

    createSecondary() {
        return this.props.secondary ? <h2>{this.props.secondary}</h2> : null;
    }

    createIcon() {
        return this.props.icon ? (
            <img src={this.props.icon} className={classNames({ 'no-icon-text': !this.props.iconText })} />
        ) : null;
    }

    createIconText() {
        return this.props.iconText ? <p>{this.props.iconText}</p> : null;
    }
}
