import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './sidebarflyout.scss';
import classNames from 'classnames';
import { navFlyoutVisibilityChangeEvent } from '../Util/events';
import CloseDarkIcon from '../icons/close-dark.svg';

class SidebarNavigationFlyoutLayout extends Component {
    render() {
        const flyoutClasses = {
            'mrc-sidebar-navigation-flyout': true,
            show: this.props.flyoutVisibility === 'show',
            disappear: this.props.flyoutVisibility === 'disappear',
        };
        return (
            <div onMouseLeave={this.props.hideFlyout} className={classNames(flyoutClasses)}>
                <header>
                    <p className="header-text">Risk Check</p>
                    <Link to="#" onClick={this.props.disappearFlyout}>
                        <img className="header-icon" src={CloseDarkIcon} alt="Close" />
                    </Link>
                </header>
                <ul className="links">
                    <li>
                        <a href="/" onClick={this.props.disappearFlyout}>
                            LAUNCH PAD
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const SidebarNavigationFlyout = connect(mapStateToProps, mapDispatchToProps)(SidebarNavigationFlyoutLayout);

export default SidebarNavigationFlyout;

function mapStateToProps(state) {
    return {
        flyoutVisibility: state.ui.navFlyoutVisible,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideFlyout: () => dispatch(navFlyoutVisibilityChangeEvent('hide')),
        disappearFlyout: () => dispatch(navFlyoutVisibilityChangeEvent('disappear')),
    };
}
