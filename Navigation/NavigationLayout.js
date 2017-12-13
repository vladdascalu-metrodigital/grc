import React, {Component} from 'react';
import SidebarNavigation from './SidebarNavigation';
import BurgerMenuLayout from './BurgerMenuLayout';
import PropTypes from 'prop-types';
import BurgerMenu from '../../icons/burger-menu.svg';
import BackBtn from './BackBtn';
import './bottommenu.scss';

export default class NavigationLayout extends Component {

    constructor(props) {
        super(props);
        // this.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
        // this.hideBurgerMenu = this.hideBurgerMenu.bind(this);
        // this.renderSidebarNavigation = this.renderSidebarNavigation.bind(this);
        // this.renderBottomToolbarLayout = this.renderBottomToolbarLayout.bind(this);
    }

    toggleBurgerMenu = (event) => {
        event.preventDefault();
        this.props.updateBurgerMenuExpended(!this.props.displayMenu);
    }

    hideBurgerMenu = () => {
        this.props.updateBurgerMenuExpended(false);
    }

    renderSidebarNavigation = () => {
        return <div className='mrc-sidebar-navigation'>
            <SidebarNavigation showFlyout={this.props.showFlyout}
                               disappearFlyout={this.props.disappearFlyout}
                               backBtn={this.props.displayBottomToolbar}
            />
        </div>;
    }

    renderBottomToolbarLayout = () => {
        let classes = 'mrc-bottom-navigation';
        if (this.props.displayBottomToolbar) classes += ' bottom-toolbar';

        let btnBurgerMenuClasses = 'btn mrc-burger-menu';
        if (this.props.displayMenu) btnBurgerMenuClasses += ' active';

        // TODO Move Burger Menu stuff to BurgerMenuLayout and rename that to BurgerMenu
        return (
            <nav className={classes}>
                <BackBtn disabled={!this.props.displayBottomToolbar}/>
                <a className={btnBurgerMenuClasses} onClick={this.toggleBurgerMenu}>
                    <img src={BurgerMenu} alt='menu'/>
                </a>
                <BurgerMenuLayout isExpanded={this.props.displayMenu}
                                  hideBurgerMenu={this.hideBurgerMenu}/>
            </nav>
        );
    }

    render() {
        return this.props.tablet ? this.renderSidebarNavigation() : this.renderBottomToolbarLayout();
    }
}

NavigationLayout.propTypes = {
    tablet: PropTypes.bool,
    showFlyout: PropTypes.func,
    disappearFlyout: PropTypes.func.isRequired,
    displayMenu: PropTypes.bool.isRequired,
    displayBottomToolbar: PropTypes.bool.isRequired,
    updateBurgerMenuExpended: PropTypes.func // FIXME Typo: expended -> expanded
};