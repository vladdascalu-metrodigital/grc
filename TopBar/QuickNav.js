import React, {Component} from 'react';
import './quicknav.scss';

export default class QuickNav extends Component {

    render() {
        const navEntry = (name, href) => {
            return name === this.props.active
                ? <li className='active'>{name}</li>
                : <li><a href={href} className='no-underline'>{name}</a></li>;
        };
        return (
            <nav className='mrc-quicknav'>
                <ul>
                    {navEntry('Inbox', '/inbox')}
                    {navEntry('Limit Check', '/creditlimit')}
                    {navEntry('History', '/history')}
                </ul>
            </nav>
        );
    }
}
