import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import PageTitle from '../PageTitle';
import MoreIcon from '../icons/MoreIcon';
import SideScreen from '../SideScreen';
import HeaderInfo from './HeaderInfo';
import { COLOR as ICOLOR } from '../icons/index';
import MetroIcon from '../icons/MetroIcon';
import MenuIcon from '../icons/MenuIcon';

import { MENU_CONTEXT } from '../MainMenu';
import { SIZE as IS } from '../icons/index';

import './index.scss';

export default class PageHeader extends Component {
    constructor() {
        super();
        this.toggleAsideInfo = this.toggleAsideInfo.bind(this);
        this.toggleLanguageSwitch = this.toggleLanguageSwitch.bind(this);
        this.toggleMenuSwitch = this.toggleMenuSwitch.bind(this);

        this.state = {
            showAsideInfo: false,
            showLanguageSwitch: false,
            showAppSwitch: false,
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

    toggleMenuSwitch() {
        this.setState({
            showAppSwitch: !this.state.showAppSwitch,
        });
    }

    render() {
        let {
            tabs,
            activeTabId,
            title,
            customerName,
            customerId,
            customerStatus,
            headerInfoData,
            MainMenuComponent,
            LanguageListComponent,
            NotificationComponent,
        } = this.props;
        let { showAsideInfo } = this.state;
        let { showLanguageSwitch } = this.state;
        let { showAppSwitch } = this.state;
        return (
            <header className={'mrc-ui-pageheader'}>
                <div className="mrc-ui-pageheader-notification-area">
                    {NotificationComponent ? <NotificationComponent /> : null}
                </div>
                <div className="mrc-ui-pageheader-menu" onClick={this.toggleMenuSwitch}>
                    <div className="mrc-ui-pageheader-menu-metro-icon">
                        <MetroIcon size={IS.XSMALL} />
                    </div>
                    <div className="mrc-ui-pageheader-menu-burger-icon">
                        <MenuIcon size={IS.XSMALL} />
                    </div>
                </div>
                <div className="mrc-ui-pageheader-title">
                    <PageTitle
                        title={title}
                        customerName={customerName}
                        customerId={customerId}
                        customerStatus={customerStatus}
                    />
                </div>
                <div className="mrc-ui-pageheader-info">
                    {headerInfoData ? (
                        <React.Fragment>
                            <HeaderInfo {...headerInfoData} />
                            <button onClick={this.toggleAsideInfo} className="mrc-ui-pageheader-more-button">
                                <MoreIcon color={ICOLOR.MUTED} />
                            </button>
                        </React.Fragment>
                    ) : null}
                    <button onClick={this.toggleLanguageSwitch} className="mrc-ui-pageheader-language-button">
                        <div className="mrc-ui-pageheader-language-icon">de</div>
                    </button>
                </div>
                <div className="mrc-ui-pageheader-tabs">
                    {tabs.map((t, k) => {
                        let activeClass = activeTabId === t.id ? 'mrc-ui-pageheader-tabitem-selected' : '';
                        return (
                            <div
                                key={k}
                                className={`mrc-ui-pageheader-tabitem ${activeClass}`}
                                onClick={() => t.onClick(t.id)}
                            >
                                {t.text}
                            </div>
                        );
                    })}
                </div>
                {this.state.showAsideInfo ? (
                    <SideScreen
                        isShown={showAsideInfo}
                        toggle={this.toggleAsideInfo}
                        title="More Request Info with very large text bla bla bla"
                    >
                        <HeaderInfo {...headerInfoData} context="sidescreen" />
                    </SideScreen>
                ) : null}
                {this.state.showLanguageSwitch ? (
                    <SideScreen isShown={showLanguageSwitch} toggle={this.toggleLanguageSwitch} title="Switch Language">
                        <LanguageListComponent />
                    </SideScreen>
                ) : null}

                {this.state.showAppSwitch ? (
                    <SideScreen isShown={showAppSwitch} toggle={this.toggleMenuSwitch} title="Menu" side="left">
                        <MainMenuComponent context={MENU_CONTEXT.SIDESCREEN} />
                    </SideScreen>
                ) : null}
            </header>
        );
    }
}

PageHeader.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            ir: PropTypes.string,
            text: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
    activeTabId: PropTypes.string,

    title: PropTypes.string,

    customerName: PropTypes.string,
    customerId: PropTypes.string,
    customerStatus: PropTypes.string,

    headerInfoData: PropTypes.object,

    MainMenuComponent: PropTypes.elementType,
    LanguageListComponent: PropTypes.elementType,
    NotificationComponent: PropTypes.elementType,
};

PageHeader.defaultProps = {
    tabs: [],
};
