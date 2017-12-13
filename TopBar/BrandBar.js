import React, {Component} from 'react';
import './brandbar.scss';
import LogoutIcon from '../../icons/logout.svg';
import CloseIcon from '../../icons/close.svg';
import {Link} from 'react-router-dom';

export default class BrandBar extends Component {

    getIcon() {
        if ('Launch Pad' === this.props.title) {
            return {src: LogoutIcon, alt: 'Logout'};
        } else {
            return {src: CloseIcon, alt: 'Close', href: '/'};
        }
    }

    renderIcon(icon) {
        const img = <img className='brandbar-icon' src={icon.src} alt={icon.alt} />;
        return icon.href ? <Link to={icon.href}>{img}</Link> : img;
    }

    render() {
        return (
            <div className='mrc-brandbar'>
                <div className='brandbar-title'>{this.props.title}</div>
                {this.renderIcon(this.getIcon())}
            </div>
        );
    }
}