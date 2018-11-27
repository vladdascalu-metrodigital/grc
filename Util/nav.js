import React from 'react';
import {createUriPath} from './util';
import LaunchpadIcon from '../icons/menu.svg';
import InboxIcon from '../icons/inbox.svg';
import LimitcheckIcon from '../icons/credit-request.svg';
import HistoryIcon from '../icons/history.svg';

const iconMap = {
    launchpad: LaunchpadIcon, // Will not be part of the config, just for here
    limitcheck: LimitcheckIcon,
    history: HistoryIcon,
    inbox:  InboxIcon
};
const sortMap = [
    'launchpad',
    'inbox',
    'limitcheck',
    'history'
];

function sortNavs(navs, sortMap) {
    return navs.sort((a,b) => sortMap.indexOf(a.roleKey.toLowerCase()) - sortMap.indexOf(b.roleKey.toLowerCase()));
}

function createHref(template, roleKey) {
    if (!template) return '/';
    return template.indexOf('{') < 0
        ? template
        : createUriPath('search', roleKey, template);
}

export function extractNavsFromQuickNav(navConfigs) {
    if (!navConfigs) return null;
    const navs = Object.keys(navConfigs).reduce((result, nav) => {
        if (navConfigs[nav].show) result.push({...navConfigs[nav], roleKey: nav, template: navConfigs[nav].url});
        return result;
    }, []);
    return sortNavs(navs, sortMap);
}

export function createNav(btnConf, translations) {
    const title = translations[`mrc.apps.${btnConf.roleKey.toLowerCase()}`];
    const icon = iconMap[btnConf.roleKey.toLowerCase()];
    const href = createHref(btnConf.template, btnConf.roleKey);
    if (!icon || !title) {
        console.warn('Missing icon or title translation to render sidebar nav. Data:', btnConf);
    }
    return {
        key: btnConf.roleKey,
        title: title || btnConf.title || btnConf.roleKey,
        icon: icon,
        href: href,
        isAbsolute: href.startsWith('http'),
        imgEl: <img className='m-icon-medium' src={icon} alt={title}/>
    };
}
