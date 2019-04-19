import React, {Component} from 'react';
import SidebarNavigation from './SidebarNavigation';
import BurgerMenuLayout from './BurgerMenuLayout';
import PropTypes from 'prop-types';
import BurgerMenu from '../icons/burger-menu.svg';
import BackBtn from './BackBtn';
import SelectLanguage from '../i18n';
import './bottommenu.scss';
import classNames from 'classnames';

export default class NavigationLayout extends Component {

    toggleBurgerMenu = (event) => {
        event.preventDefault();
        this.props.updateBurgerMenuExpended(!this.props.displayMenu);
    };

    hideBurgerMenu = () => {
        this.props.updateBurgerMenuExpended(false);
    };

    renderSidebarNavigation = () => {
        if (this.props.config.loading) return null;
        return <div className='mrc-sidebar-wrapper'>
            <div className='mrc-sidebar'>
                <SidebarNavigation config={this.props.config}/>
                <div className='secondary-actions'>
                    <ul>
                        <li className='lang-setting'>
                            <SelectLanguage />
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    };

    createBackBtn() {
        // BackBtn not removed from dom but only set to 'invisible' to make sure that the onMouseEnter event is not
        // triggered on the <ul> when the back button is clicked
        return (
            <li className={classNames('back-action', {hidden: !this.props.displayBackButton})}>
                <BackBtn/>
            </li>
        );
    }

    renderBottomToolbarLayout = () => {
        let classes = 'mrc-bottom-navigation';
        if (this.props.displayBottomToolbar) classes += ' bottom-toolbar';

        let btnBurgerMenuClasses = 'btn mrc-burger-menu';
        if (this.props.displayMenu) btnBurgerMenuClasses += ' active';

        // if (!this.props.displayBottomToolbar) return null;

        // TODO Move Burger Menu stuff to BurgerMenuLayout and rename that to BurgerMenu
        return (
            <nav className={classes}>
                <BackBtn/>
                <a className={btnBurgerMenuClasses} onClick={this.toggleBurgerMenu}>
                    <img src={BurgerMenu} alt='menu'/>
                </a>
                <BurgerMenuLayout isExpanded={this.props.displayMenu}
                                  config={this.props.config}
                                  hideBurgerMenu={this.hideBurgerMenu}/>
            </nav>
        );
    };

    render() {
        return this.props.tablet ? this.renderSidebarNavigation() : this.renderBottomToolbarLayout();
    }
}

NavigationLayout.propTypes = {
    tablet: PropTypes.bool,
    config: PropTypes.object.isRequired,
    displayMenu: PropTypes.bool.isRequired,
    displayBottomToolbar: PropTypes.bool.isRequired,
    displayBackButton: PropTypes.bool.isRequired,
    updateBurgerMenuExpended: PropTypes.func // FIXME Typo: expended -> expanded
};
