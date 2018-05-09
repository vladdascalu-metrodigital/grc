import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import LaunchpadIcon from "../icons/menu.svg";
import InboxIcon from "../icons/inbox.svg";
import LimitcheckIcon from "../icons/credit-request.svg";
import HistoryIcon from "../icons/history.svg";
import PropTypes from "prop-types";
import { createUriPath } from "../Util/util";
import SelectLanguage from "../i18n";

export default class SidebarNavigation extends Component {

    constructor(props) {
        super(props);
        this.iconMap = {
            launchpad: LaunchpadIcon, // Will not be part of the config, just for here
            limitcheck: LimitcheckIcon,
            history: HistoryIcon,
            inbox:  InboxIcon
        };
        this.sortMap = [
            'launchpad',
            'inbox',
            'limitcheck',
            'history'
        ];
    }

    static createHref(template, roleKey) {
        if (!template) return '/';
        return template.indexOf('{') < 0
            ? template
            : createUriPath('search', roleKey, template);
    }

    createNav = (btnConf) => {
        const title = this.props.config.data.translations[`mrc.apps.${btnConf.roleKey.toLowerCase()}`];
        const icon = this.iconMap[btnConf.roleKey.toLowerCase()];
        if (!icon || !title) {
            console.warn('Missing icon or translation to render sidebar nav. Data:', btnConf);
        }
        const href = SidebarNavigation.createHref(btnConf.template, btnConf.roleKey);
        const isAbsolute = href.startsWith('http');
        const img = <img className='m-icon-medium' src={icon} alt={title}/>;
        const anchor = isAbsolute
            ? <a href={href} onClick={this.props.disappearFlyout}>{img}</a>
            : <Link to={href}>{img}</Link>;
        return <div key={btnConf.roleKey} className='action'>{anchor}</div>;
    };

    extractNavsFromQuickNav() {
        if (!this.props.config.data.quickNav) return null;
        const navConfigs = this.props.config.data.quickNav;
        const navs = Object.keys(navConfigs).reduce((result, nav) => {
            if (navConfigs[nav].show) result.push({...navConfigs[nav], roleKey: nav, template: navConfigs[nav].url});
            return result;
        }, []);
        const sortedNavs = SidebarNavigation.sortNavs(navs, this.sortMap);
        return sortedNavs.map(this.createNav, this);
    }

    render() {
        return (
            <div>
                {this.extractNavsFromQuickNav()}
                <div className='action mrc-language'><SelectLanguage/></div>
            </div>
        );
    }

    static sortNavs(navs, sortMap) {
        return navs.sort((a,b) => sortMap.indexOf(a.roleKey.toLowerCase()) - sortMap.indexOf(b.roleKey.toLowerCase()));
    }
}


SidebarNavigation.propTypes = {
    showFlyout: PropTypes.func.isRequired,
    disappearFlyout: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
};
