import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import PageTitle from '../PageTitle';
import MoreIcon from '../../icons/MoreIcon';
import SideScreen from '../../SideScreen';
import HeaderInfo from './HeaderInfo';
import { COLOR as ICOLOR } from '../../icons/index';
import SideScreenLanguageEntry from './SideScreenLanguageEntry';
import MetroIcon from '../../icons/MetroIcon';
import HistoryIcon from '../../icons/HistoryIcon';
import InboxIcon from '../../icons/InboxIcon';
import LaunchPadIcon from '../../icons/LaunchPadIcon';
import QuickCheckIcon from '../../icons/QuickCheckIcon';
import LimitCheckIcon from '../../icons/LimitCheckIcon';
import CreditCorrectionIcon from '../../icons/CreditCorrectionIcon';

import { COLOR as IC, SIZE as IS } from '../../icons/index';

import './index.scss';

export default class PageHeader extends Component {
    constructor() {
        super();
        this.toggleAsideInfo = this.toggleAsideInfo.bind(this);
        this.toggleLanguageSwitch = this.toggleLanguageSwitch.bind(this);
        this.state = {
            showAsideInfo: false,
            showLanguageSwitch: false,
        };
    }

    toggleAsideInfo() {
        this.setState({
            showAsideInfo: !this.state.showAsideInfo,
        });
    }

    toggleLanguageSwitch() {
        this.setState({
            showLanguageSwitch: !this.state.showLanguageSwitch,
        });
    }

    render() {
        let { title, customerName, customerId, customerStatus } = this.props;
        let { showAsideInfo } = this.state;
        let { showLanguageSwitch } = this.state;
        let headerInfoData = {
            requestStartDate: '2020-04-12',
            // TODO: put all data here
        };
        return (
            <div className="mrc-ui-main-wapper">
                <div className="mrc-ui-sidebar">
                    <MetroIcon size={IS.SIDEBAR} />
                    <div className="mrc-ui-sidebar-icon">
                        <LaunchPadIcon color={IC.CONTRAST_WHITE} size={IS.XSMALL} />
                        <h2 className="mrc-ui-sidebar-icon-title">Launchpad</h2>
                    </div>
                    <div className="mrc-ui-sidebar-icon">
                        <InboxIcon color={IC.CONTRAST_WHITE} size={IS.XSMALL} />
                        <h2 className="mrc-ui-sidebar-icon-title">Inbox</h2>
                    </div>
                    <div className="mrc-ui-sidebar-icon">
                        <LimitCheckIcon color={IC.CONTRAST_WHITE} size={IS.XSMALL} />
                        <h2 className="mrc-ui-sidebar-icon-title">Limit Check</h2>
                    </div>
                    <div className="mrc-ui-sidebar-icon">
                        <QuickCheckIcon color={IC.CONTRAST_WHITE} size={IS.XSMALL} />
                        <h2 className="mrc-ui-sidebar-icon-title">Quick Check</h2>
                    </div>
                    <div className="mrc-ui-sidebar-icon">
                        <CreditCorrectionIcon color={IC.CONTRAST_WHITE} size={IS.XSMALL} />
                        <h2 className="mrc-ui-sidebar-icon-title">Credit Correction</h2>
                    </div>
                    <div className="mrc-ui-sidebar-icon">
                        <HistoryIcon color={IC.CONTRAST_WHITE} size={IS.XSMALL} />
                        <h2 className="mrc-ui-sidebar-icon-title">History</h2>
                    </div>
                </div>
                <header className={'mrc-ui-pageheader'}>
                    <div className="mrc-ui-pageheader-title">
                        <PageTitle
                            title={title}
                            customerName={customerName}
                            customerId={customerId}
                            customerStatus={customerStatus}
                        />
                    </div>
                    <div className="mrc-ui-pageheader-info">
                        <HeaderInfo {...headerInfoData} />
                        <button onClick={this.toggleAsideInfo} className="mrc-ui-pageheader-more-button">
                            <MoreIcon color={ICOLOR.MUTED} />
                        </button>
                        <button onClick={this.toggleLanguageSwitch} className="mrc-ui-pageheader-language-button">
                            <div className="mrc-ui-pageheader-language-icon">de</div>
                        </button>
                    </div>
                    <div className="mrc-ui-pageheader-tabs">
                        <div className="mrc-ui-pageheader-tabitem mrc-ui-pageheader-tabitem-selected">
                            Customer Data
                        </div>
                        <div className="mrc-ui-pageheader-tabitem">Credit Details</div>
                        <div className="mrc-ui-pageheader-tabitem">Sales</div>
                        <div className="mrc-ui-pageheader-tabitem">Scroring</div>
                        <div className="mrc-ui-pageheader-tabitem">SAP Data</div>
                        <div className="mrc-ui-pageheader-tabitem">Strategy</div>
                        <div className="mrc-ui-pageheader-tabitem">Comments</div>
                        <div className="mrc-ui-pageheader-tabitem">Attachments</div>
                        <div className="mrc-ui-pageheader-tabitem">Audit Trail</div>
                    </div>
                    {this.state.showAsideInfo ? (
                        <SideScreen
                            isShown={showAsideInfo}
                            toggle={this.toggleAsideInfo}
                            title="More Request Info with very large text bla bla bla"
                        >
                            <HeaderInfo {...headerInfoData} isColStyle />
                        </SideScreen>
                    ) : null}
                    {this.state.showLanguageSwitch ? (
                        <SideScreen
                            isShown={showLanguageSwitch}
                            toggle={this.toggleLanguageSwitch}
                            title="Switch Language"
                        >
                            <SideScreenLanguageEntry language="Deutsch" languageISO="de" />
                            <SideScreenLanguageEntry language="English" languageISO="en" />
                            <SideScreenLanguageEntry language="Russian" languageISO="ru" />
                        </SideScreen>
                    ) : null}
                </header>
            </div>
        );
    }
}

PageHeader.propTypes = {
    title: PropTypes.string,
    customerName: PropTypes.string,
    customerId: PropTypes.string,
    customerStatus: PropTypes.string,
    // TODO: add all headerInfoData proptypes
};
