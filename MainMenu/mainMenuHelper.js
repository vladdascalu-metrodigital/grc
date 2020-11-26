import { createUriPath } from '../Util/util';

import HistoryIcon from '../icons/HistoryIcon';
import InboxIcon from '../icons/InboxIcon';
import LaunchPadIcon from '../icons/LaunchPadIcon';
import QuickCheckIcon from '../icons/QuickCheckIcon';
import LimitCheckIcon from '../icons/LimitCheckIcon';
import CreditCorrectionIcon from '../icons/CreditCorrectionIcon';
import PrepaymentIcon from '../icons/PrepaymentIcon';
import BatchUpdateIcon from '../icons/BatchUpdateIcon';
import ReportingIcon from '../icons/ReportingIcon';
import EmailServiceIcon from '../icons/EmailServiceIcon';

const iconMap = {
    launchpad: LaunchPadIcon, // Will not be part of the config, just for here
    inbox: InboxIcon,
    limitcheck: LimitCheckIcon,
    quickcheck: QuickCheckIcon,
    creditcorrection: CreditCorrectionIcon,
    history: HistoryIcon,
    batchupdate: BatchUpdateIcon,
    reports: ReportingIcon,
    prepayment: PrepaymentIcon,
    dunningemailmanagement: EmailServiceIcon,
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
    'dunningemailmanagement',
];

function sortNavs(navs, sortMap) {
    return navs.sort((a, b) => sortMap.indexOf(a.name.toLowerCase()) - sortMap.indexOf(b.name.toLowerCase()));
}

function createHref(url, name) {
    if (!url) return '/';
    return url.indexOf('{') < 0 ? url : createUriPath('search', name, url);
}

function morphNavItem(btnConf, name) {
    const service = name.toLowerCase();
    const title = `mrc.apps.${service}`;
    const icon = iconMap[service];
    const href = createHref(btnConf.url, name);
    return {
        name,
        title: title || btnConf.title || name,
        Icon: icon,
        href: href,
        isAbsolute: href.startsWith('http'),
    };
}

export function extractNavsFromQuickNav(navConfigs) {
    if (!navConfigs) return null;
    const navs = Object.keys(navConfigs).reduce((result, nav) => {
        if (navConfigs[nav].show) {
            // result.push(morphNavItem({ ...navConfigs[nav], roleKey: nav, template: navConfigs[nav].url }));
            result.push(morphNavItem(navConfigs[nav], nav));
        }
        return result;
    }, []);
    return sortNavs(navs, sortMap);
}
