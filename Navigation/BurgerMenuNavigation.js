import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './burgermenu.scss';
import PropTypes from 'prop-types';
import { createNav, extractNavsFromQuickNav } from '../Util/nav';
import SelectLanguage from '../i18n';
import classNames from 'classnames';

export default class BurgerMenuNavigation extends Component {
    static classMenuEntry = 'mrc-contextual-menu-button';

    componentWillUnmount() {
        this.props.hideBurgerMenu();
    }

    createNavElement(btnConf) {
        const { config, highlight } = this.props;
        const conf = createNav(btnConf, config.data.translations);
        const service = btnConf.roleKey;
        const active = highlight === service;

        if (conf.isAbsolute) {
            return (
                <a
                    onClick={this.handleClick.bind(this, service)}
                    href={conf.href}
                    key={conf.key}
                    className={
                        BurgerMenuNavigation.classMenuEntry + (active ? ' mrc-contextual-menu-button-isSelected' : '')
                    }
                >
                    {conf.title}
                </a>
            );
        } else {
            return (
                <Link
                    onClick={this.handleClick.bind(this, service)}
                    to={conf.href}
                    key={conf.key}
                    className={
                        BurgerMenuNavigation.classMenuEntry + (active ? ' mrc-contextual-menu-button-isSelected' : '')
                    }
                >
                    {conf.title}
                </Link>
            );
        }
    }

    handleClick(service) {
        const { hideBurgerMenu, updateActiveItem } = this.props;
        updateActiveItem(service);
        hideBurgerMenu();
    }

    render() {
        if (!this.props.config.data.quickNav) return null;
        return (
            <nav className="mrc-contextual-menu">
                <div className="mrc-contextual-menu-list">
                    {extractNavsFromQuickNav(this.props.config.data.quickNav).map(this.createNavElement, this)}
                    <div className={classNames('mrc-language', BurgerMenuNavigation.classMenuEntry)}>
                        Language:
                        <SelectLanguage />
                    </div>
                </div>
            </nav>
        );
    }
}

BurgerMenuNavigation.propTypes = {
    highlight: PropTypes.string,
    hideBurgerMenu: PropTypes.func.isRequired,
    updateActiveItem: PropTypes.func,
    config: PropTypes.object.isRequired,
};
