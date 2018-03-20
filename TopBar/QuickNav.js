import React, {Component} from 'react';
import './quicknav.scss';

export default class QuickNav extends Component {

    render() {
        const config = this.props.config.data;
        if (!config) {
            return null;
        }

        const navEntry = (name) => {
            const entryConfig = config.quickNav[name];
            if (!entryConfig.show) {
                return null;
            } else if (entryConfig.active) {
                return <li className='active'>{name}</li>;
            } else {
                return <li>{name}</li>;
            }
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
