import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import PropTypes from 'prop-types';
import { createNav, extractNavsFromQuickNav } from '../Util/nav';

export default class SidebarNavigation extends Component {
    createNavWithWrapper = (btnConf) => {
        const service = btnConf.roleKey;
        return (
            <li className={this.props.highlight === service ? 'mrc-highlighted-li' : null} key={service}>
                {this.createNavElement(btnConf)}
            </li>
        );
    };

    createNavElement(btnConf) {
        const { updateActiveItem } = this.props;
        const conf = createNav(btnConf, this.props.config.data.translations);
        const service = btnConf.roleKey;
        if (conf.isAbsolute) {
            return (
                <a onClick={updateActiveItem.bind(this, service)} href={conf.href}>
                    {conf.imgEl}
                </a>
            );
        } else {
            return (
                <Link onClick={updateActiveItem.bind(this, service)} to={conf.href}>
                    {conf.imgEl}
                </Link>
            );
        }
    }

    render() {
        return (
            <div className="primary-actions">
                <ul>{extractNavsFromQuickNav(this.props.config.data.quickNav).map(this.createNavWithWrapper, this)}</ul>
            </div>
        );
    }
}

SidebarNavigation.propTypes = {
    highlight: PropTypes.string,
    updateActiveItem: PropTypes.func,
    config: PropTypes.object.isRequired,
};
