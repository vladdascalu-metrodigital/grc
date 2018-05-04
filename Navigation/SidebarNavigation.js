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
            limitCheck: LimitcheckIcon,
            history: HistoryIcon,
            inbox:  InboxIcon
        };
        this.sortMap = [
            'inbox',
            'limitCheck',
            'history'
        ];
    }

    static createHref(template, roleKey) {
        if (!template) return '/';
        return template.indexOf('{') < 0
            ? template
            : createUriPath('search', roleKey, template);
    }

    createBtn = (btnConf) => {
        const href = SidebarNavigation.createHref(btnConf.template, btnConf.roleKey);
        const isAbsolute = href.startsWith('http');
        const title = this.props.config.data.translations[btnConf.roleKey];
        const img = <img className='m-icon-medium' src={this.iconMap[btnConf.roleKey]} alt={title}/>;
        const anchor = isAbsolute
            ? <a href={href} onClick={this.props.disappearFlyout}>{img}</a>
            : <Link to={href}>{img}</Link>;
        return <div key={btnConf.roleKey} className='action'>{anchor}</div>;
    };

    render() {
        const sortedTiles = this.props.config.data.launchpad.tiles.sort((a,b) => this.sortMap.indexOf(a.roleKey) - this.sortMap.indexOf(b.roleKey));
        const actions = sortedTiles.map(this.createBtn, this);
        return (
            <div onMouseEnter={this.props.showFlyout}>
                {this.createBtn({roleKey:'launchpad', title: 'Launchpad'})}
                {actions}
                <div className='action mrc-language'><SelectLanguage/></div>
            </div>
        );
    }
}


SidebarNavigation.propTypes = {
    showFlyout: PropTypes.func.isRequired,
    disappearFlyout: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
};
