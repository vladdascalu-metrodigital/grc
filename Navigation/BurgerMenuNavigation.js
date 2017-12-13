import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './burgermenu.scss';
import PropTypes from 'prop-types';

export default class BurgerMenuNavigation extends Component {

    componentWillUnmount() {
        this.props.hideBurgerMenu();
    }

    render() {
        return (
            <nav className='fill'>
                <ul>
                    <li>
                        <Link to='/' onClick={this.props.hideBurgerMenu}>
                            <div className='link'>Launch Pad</div>
                        </Link>
                    </li>
                </ul>
                <div className='indicator'/>
            </nav>
        );
    }
}


BurgerMenuNavigation.propTypes = {
    hideBurgerMenu: PropTypes.func.isRequired
};