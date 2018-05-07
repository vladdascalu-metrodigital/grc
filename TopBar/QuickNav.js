import React, {Component} from 'react';
import './quicknav.scss';

export default class QuickNav extends Component {

    render() {
        const config = this.props.config.data;
        if (!config) {
            return null;
        }

        const navEntry = (name) => {
            const entry = config.quickNav[name];
            if (!entry.show) {
                return null;
            } else if (entry.active) {
                return <li className='active'>{entry.title}</li>;
            } else {
                return <li>{entry.title}</li>;
            }
        };
        return (
            <nav className='mrc-quicknav'>
                <ul>
                    {navEntry('inbox')}
                    {navEntry('limitCheck')}
                    {navEntry('history')}
                </ul>
            </nav>
        );
    }
}
