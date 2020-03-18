import React, { Component } from 'react';
import './burgermenu.scss';
import BurgerMenuNavigation from './BurgerMenuNavigation';
import PropTypes from 'prop-types';

export default class BurgerMenuLayout extends Component {
    render() {
        if (!this.props.isExpanded) return null;
        return (
            <div className="mrc-contextual-menu-wrapper">
                <BurgerMenuNavigation {...this.props} />
            </div>
        );
    }
}

BurgerMenuLayout.propTypes = {
    isExpanded: PropTypes.bool,
    hideBurgerMenu: PropTypes.func.isRequired,
    updateActiveItem: PropTypes.func,
    config: PropTypes.object.isRequired,
};
