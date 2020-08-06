import React from 'react';
import { createUriPath } from './util';
import LaunchpadIcon from '../icons/menu.svg';
import InboxIcon from '../icons/inbox.svg';
import LimitcheckIcon from '../icons/credit-request.svg';
import HistoryIcon from '../icons/history.svg';
import QuickcheckIcon from '../icons/quick-check.svg';
import CreditcorrectionIcon from '../icons/credit-correction-white.svg';
import BatchUpdateIcon from '../icons/batch-update-white.svg';
import ReportingIcon from '../icons/reporting-white.svg';
import PrepaymentIcon from '../icons/prepayment-white.svg';

const iconMap = {
    launchpad: LaunchpadIcon, // Will not be part of the config, just for here
    limitcheck: LimitcheckIcon,
    history: HistoryIcon,
    inbox: InboxIcon,
    quickcheck: QuickcheckIcon,
    creditcorrection: CreditcorrectionIcon,
    batchupdate: BatchUpdateIcon,
    reports: ReportingIcon,
    prepayment: PrepaymentIcon,
};
const sortMap = [
    'launchpad',
    'inbox',
    'limitcheck',
    'quickcheck',
    'creditcorrection',
    'history',
    'batchupdate',
    'reports',
    'prepayment',
];

function sortNavs(navs, sortMap) {
    return navs.sort((a, b) => sortMap.indexOf(a.roleKey.toLowerCase()) - sortMap.indexOf(b.roleKey.toLowerCase()));
}

function createHref(template, roleKey) {
    if (!template) return '/';
    return template.indexOf('{') < 0 ? template : createUriPath('search', roleKey, template);
}

export function extractNavsFromQuickNav(navConfigs) {
    if (!navConfigs) return null;
    const navs = Object.keys(navConfigs).reduce((result, nav) => {
        if (navConfigs[nav].show) result.push({ ...navConfigs[nav], roleKey: nav, template: navConfigs[nav].url });
        return result;
    }, []);
    return sortNavs(navs, sortMap);
}

export function createNav(btnConf, translations) {
    const service = btnConf.roleKey.toLowerCase();
    const title = translations[`mrc.apps.${service}`];
    const icon = iconMap[service];
    const href = createHref(btnConf.template, btnConf.roleKey);
    return {
        key: btnConf.roleKey,
        title: title || btnConf.title || btnConf.roleKey,
        icon: icon,
        href: href,
        isAbsolute: href.startsWith('http'),
        imgEl: <img className={'mrc-icon-base ' + service} src={icon} alt={title} />,
    };
}
