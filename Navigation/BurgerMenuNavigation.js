import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./burgermenu.scss";
import PropTypes from "prop-types";
import { createNav, extractNavsFromQuickNav } from "../Util/nav";
import SelectLanguage from "../i18n";
import classNames from "classnames";

export default class BurgerMenuNavigation extends Component {

    static classMenuEntry='mrc-contextual-menu-button';

    componentWillUnmount() {
        this.props.hideBurgerMenu();
    }

    createNavElement(btnConf) {
        const conf = createNav(btnConf, this.props.config.data.translations);
        if(conf.isAbsolute) {
            return <a href={conf.href} key={conf.key} className={BurgerMenuNavigation.classMenuEntry} onClick={this.props.hideBurgerMenu}>{conf.title}</a>;
        } else {
            return <Link to={conf.href} key={conf.key} className={BurgerMenuNavigation.classMenuEntry} onClick={this.props.hideBurgerMenu}>{conf.title}</Link>;
        }
    }

    render() {
        if (!this.props.config.data.quickNav) return null;
        return (
            <nav className='mrc-contextual-menu'>
                <div className='mrc-contextual-menu-list'>
                    {extractNavsFromQuickNav(this.props.config.data.quickNav).map(this.createNavElement, this)}
                    <div className={classNames('mrc-language', BurgerMenuNavigation.classMenuEntry)}>Language:<SelectLanguage/></div>
                </div>
            </nav>
        );
    }
}


BurgerMenuNavigation.propTypes = {
    hideBurgerMenu: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
};
