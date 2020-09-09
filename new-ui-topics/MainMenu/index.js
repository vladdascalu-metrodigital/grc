import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import HistoryIcon from '../../icons/HistoryIcon';
import InboxIcon from '../../icons/InboxIcon';
import LaunchPadIcon from '../../icons/LaunchPadIcon';
import QuickCheckIcon from '../../icons/QuickCheckIcon';
import LimitCheckIcon from '../../icons/LimitCheckIcon';
import CreditCorrectionIcon from '../../icons/CreditCorrectionIcon';
import PrepaymentIcon from '../../icons/PrepaymentIcon';
import BatchUpdateIcon from '../../icons/BatchUpdateIcon';

import { COLOR as IC, SIZE as IS } from '../../icons/index';

import './index.scss';

export const MENU_CONTEXT = {
    SIDEBAR: 'sidebar',
    SIDESCREEN: 'sidescreen',
};

export default class MainMenu extends Component {
    render() {
        let { context } = this.props;

        let mainMenuContextClass = classnames({
            'mrc-ui-main-menu-sidebar': context == MENU_CONTEXT.SIDEBAR,
            'mrc-ui-main-menu-sidescreen': context == MENU_CONTEXT.SIDESCREEN,
        });

        return (
            <div className={mainMenuContextClass}>
                <div className="mrc-ui-main-menu-item">
                    <LaunchPadIcon color={IC.CURRENT_COLOR} size={IS.XSMALL} />
                    <h2>Launchpad</h2>
                </div>
                <div className="mrc-ui-main-menu-item">
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
                </div>
            </div>
        );
    }
}

MainMenu.propTypes = {
    context: PropTypes.string,
};
