import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageHeader from '../PageHeader';
import MetroIcon from '../icons/MetroIcon';
import MainContent from '../MainContent';

import { MENU_CONTEXT } from '../MainMenu';

import { SIZE as IS } from '../icons/index';

import './index.scss';

export default class AppShell extends Component {
    render() {
        let {
            children,
            title,
            customerName,
            customerId,
            customerStatus,
            headerInfoData,
            MainMenuComponent,
            LanguageListComponent,
        } = this.props;
        return (
            <div className="mrc-ui-app-shell">
                <div className="mrc-ui-sidebar">
                    <div className="mrc-ui-sidebar-metro-icon">
                        <MetroIcon size={IS.SMALL} />
                    </div>
                    <MainMenuComponent context={MENU_CONTEXT.SIDEBAR} />
                </div>
                <PageHeader
                    title={title}
                    customerName={customerName}
                    customerId={customerId}
                    customerStatus={customerStatus}
                    headerInfoData={headerInfoData}
                    MainMenuComponent={MainMenuComponent}
                    LanguageListComponent={LanguageListComponent}
                />
                <MainContent>{children}</MainContent>
            </div>
        );
    }
}

AppShell.propTypes = {
    title: PropTypes.string,
    customerName: PropTypes.string,
    customerId: PropTypes.string,
    customerStatus: PropTypes.string,
    children: PropTypes.node,
    headerInfoData: PropTypes.object,

    MainMenuComponent: PropTypes.elementType,
    LanguageListComponent: PropTypes.elementType,
};
