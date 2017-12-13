import React, {Component} from 'react';
import './quicknav.scss';

export default class QuickNav extends Component {

    render() {
        return (
            <nav className='mrc-quicknav'>
                <ul>
                    <li className='active'>Limit Check</li>
                </ul>
            </nav>
        );
    }
}