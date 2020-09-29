import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { lookup } from '../Util/translations';
import _ from 'lodash';

import { extractNavsFromQuickNav } from './mainMenuHelper';

import { COLOR as IC, SIZE as IS } from '../icons/index';

import './index.scss';

export const MENU_CONTEXT = {
    SIDEBAR: 'sidebar',
    SIDESCREEN: 'sidescreen',
};

export default class MainMenu extends Component {
    render() {
        let { context, config: navConfig, activeItem, updateActiveItem } = this.props;
        if (_.isEmpty(navConfig) || navConfig.loading) return null;

        let mainMenuContextClass = classnames({
            'mrc-ui-main-menu-sidebar': context == MENU_CONTEXT.SIDEBAR,
            'mrc-ui-main-menu-sidescreen': context == MENU_CONTEXT.SIDESCREEN,
        });

        return (
            <div className={mainMenuContextClass}>
                {extractNavsFromQuickNav(navConfig.data.quickNav).map((navItem, k) => {
                    let className = classnames('mrc-ui-main-menu-item', {
                        'mrc-ui-main-menu-item-active': navItem.name === activeItem,
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
            </div>
        );
    }
}

MainMenu.propTypes = {
    context: PropTypes.oneOf(['sidebar', 'sidescreen']),
    config: PropTypes.object,
    activeItem: PropTypes.string,
    updateActiveItem: PropTypes.func,
};
