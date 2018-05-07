import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './sidebar.scss';
import LaunchpadIcon from '../icons/menu.svg';
import InboxIcon from '../icons/inbox.svg';
import LimitcheckIcon from '../icons/credit-request.svg';
import HistoryIcon from '../icons/history.svg';
import PropTypes from 'prop-types';
import {createUriPath} from '../Util/util';
import SelectLanguage from '../i18n';

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
            'launchpad',
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

    extractNavsFromQuickNav() {
        if (!this.props.config.data.quickNav) return null;
        const navConfigs = this.props.config.data.quickNav;
        const navs = Object.keys(navConfigs).reduce((result, nav) => {
            if (navConfigs[nav].show) result.push({...navConfigs[nav], roleKey: nav, template: navConfigs[nav].url});
            return result;
        }, []);
        const sortedNavs = SidebarNavigation.sortNavs(navs, this.sortMap);
        return sortedNavs.map(this.createBtn, this);

    }
    extractNavsFromLaunchpad() {
        if (!this.props.config.data.launchpad.tiles) return null;
        const sortedNavs = SidebarNavigation.sortNavs(this.props.config.data.launchpad.tiles, this.sortMap);
        const navElements = sortedNavs.map(this.createBtn, this);
        navElements.unshift(this.createBtn({roleKey:'launchpad', title: 'Launchpad'}));
        return navElements;
    }

    render() {
        return (
            <div> {/*onMouseEnter={this.props.showFlyout}*/}
                {this.extractNavsFromQuickNav() || this.extractNavsFromLaunchpad()}
                <div className='action mrc-language'><SelectLanguage/></div>
            </div>
        );
    }

    static sortNavs(navs, sortMap) {
        return navs.sort((a,b) => sortMap.indexOf(a.roleKey) - sortMap.indexOf(b.roleKey));
    }
}


SidebarNavigation.propTypes = {
    showFlyout: PropTypes.func.isRequired,
    disappearFlyout: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
};
