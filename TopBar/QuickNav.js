import React, {Component} from 'react';
import './quicknav.scss';

export default class QuickNav extends Component {

    render() {
        const navEntry = (name) => {
            return name === this.props.active
                ? <li className='active'>{name}</li>
                : <li>{name}</li>;
        };
        return (
            <nav className='mrc-quicknav'>
                <ul>
                    {navEntry('Inbox')}
                    {navEntry('Limit Check')}
                    {navEntry('History')}
                </ul>
            </nav>
        );
    }
}
