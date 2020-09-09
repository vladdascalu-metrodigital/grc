import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageHeader from '../PageHeader';
import MetroIcon from '../../icons/MetroIcon';
import MainContent from '../../MainContent';

import MainMenu, { MENU_CONTEXT } from '../MainMenu';

import { SIZE as IS } from '../../icons/index';

import './index.scss';

export default class AppShell extends Component {
    render() {
        let { children, title, customerName, customerId, customerStatus } = this.props;
        // let headerInfoData = {
        //     requestStartDate: '2020-04-12',
        //     // TODO: put all data here
        // };
        return (
            <div className="mrc-ui-app-shell">
                <div className="mrc-ui-sidebar">
                    <div className="mrc-ui-sidebar-metro-icon">
                        <MetroIcon size={IS.SMALL} />
                    </div>

                    <MainMenu context={MENU_CONTEXT.SIDEBAR} />
                </div>
                <PageHeader
                    title={title}
                    customerName={customerName}
                    customerId={customerId}
                    customerStatus={customerStatus}
                />
                <MainContent>
                    {children}
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                </MainContent>
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
    // TODO: add all headerInfoData proptypes
};
