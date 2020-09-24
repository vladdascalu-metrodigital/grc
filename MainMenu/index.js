import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { lookup } from '../Util/translations';

import { extractNavsFromQuickNav } from './mainMenuHelper';

import { COLOR as IC, SIZE as IS } from '../icons/index';

import './index.scss';

export const MENU_CONTEXT = {
    SIDEBAR: 'sidebar',
    SIDESCREEN: 'sidescreen',
};

export default class MainMenu extends Component {
    render() {
        let { context, navConfig, activeItem, updateActiveItem } = this.props;
        if (navConfig.loading) return null;

        let mainMenuContextClass = classnames({
            'mrc-ui-main-menu-sidebar': context == MENU_CONTEXT.SIDEBAR,
            'mrc-ui-main-menu-sidescreen': context == MENU_CONTEXT.SIDESCREEN,
        });

        console.log('sdkjgdshflgkjsdhfglksjdhglskj');

        return (
            <div className={mainMenuContextClass}>
                {extractNavsFromQuickNav(navConfig.data.quickNav).map((navItem, k) => {
                    console.log('name', navItem);
                    let className = classnames('mrc-ui-main-menu-item', {
                        'mrc-ui-main-menu-item-active': name === activeItem,
                    });
                    if (navItem.isAbsolute) {
                        return (
                            <a
                                href={navItem.href}
                                onClick={() => updateActiveItem(navItem.name)}
                                key={k}
                                className={className}
                            >
                                {navItem.Icon && <navItem.Icon color={IC.CURRENT_COLOR} size={IS.XSMALL} />}
                                <h2>{lookup(navItem.title)}</h2>
                            </a>
                        );
                    } else {
                        return (
                            <Link
                                to={navItem.href}
                                onClick={() => updateActiveItem(navItem.name)}
                                key={k}
                                className={className}
                            >
                                {navItem.Icon && <navItem.Icon color={IC.CURRENT_COLOR} size={IS.XSMALL} />}
                                <h2>{lookup(navItem.title)}</h2>
                            </Link>
                        );
                    }
                })}
                {/* <div className="mrc-ui-main-menu-item">
                    <InboxIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Inbox</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
                    <LimitCheckIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Limit Check</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
                    <QuickCheckIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Quick Check</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
                    <CreditCorrectionIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Credit Correction</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
                    <PrepaymentIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Prepayment</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
                    <BatchUpdateIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Batch Update</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
                    <HistoryIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>History</h2>
                </div> */}
            </div>
        );
    }
}

MainMenu.propTypes = {
    context: PropTypes.string,
    navConfig: PropTypes.object,
    activeItem: PropTypes.string,
    updateActiveItem: PropTypes.func,
};
