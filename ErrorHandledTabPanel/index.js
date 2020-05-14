import React, { Component } from 'react';
import { TabPanel } from 'react-tabs';
import ErrorHandler from '../ErrorHandler';

export default class ErrorHandledTabPanel extends Component {
    render() {
        const { children, ...otherPanelProps } = this.props;
        return (
            <TabPanel {...otherPanelProps}>
                <ErrorHandler>{children}</ErrorHandler>
            </TabPanel>
        );
    }
}

ErrorHandledTabPanel.tabsRole = 'TabPanel';
