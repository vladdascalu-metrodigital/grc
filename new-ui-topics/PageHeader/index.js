import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import PageTitle from '../PageTitle';
import MoreIcon from '../../icons/MoreIcon';
import SideScreen from '../../SideScreen';
import HeaderInfo from './HeaderInfo';
import { COLOR as ICOLOR } from '../../icons/index';

import './index.scss';

export default class PageHeader extends Component {
    constructor() {
        super();
        this.toggleAsideInfo = this.toggleAsideInfo.bind(this);
        this.state = {
            showAsideInfo: false,
        };
    }

    toggleAsideInfo() {
        this.setState({
            showAsideInfo: !this.state.showAsideInfo,
        });
    }

    render() {
        let { title, customerName, customerId, customerStatus } = this.props;
        let { showAsideInfo } = this.state;
        let headerInfoData = {
            requestStartDate: '2020-04-12',
            // TODO: put all data here
        };
        return (
            <header className={'mrc-ui-pageheader'}>
                {/* <nav>
                    sidebar ??
                </nav> */}
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
                </div>
                <div className="mrc-ui-pageheader-tabs">
                    <div className="mrc-ui-pageheader-tabitem">tab item</div>
                    <div className="mrc-ui-pageheader-tabitem">tab item</div>
                    <div className="mrc-ui-pageheader-tabitem">tab iteeeeeeeeem</div>
                    <div className="mrc-ui-pageheader-tabitem">tab item</div>
                    <div className="mrc-ui-pageheader-tabitem">tab iteeeeeeeeeeeeeeeeeeem</div>
                    <div className="mrc-ui-pageheader-tabitem">tab iteeeeeeeeeeeem</div>
                    <div className="mrc-ui-pageheader-tabitem">tab iteeeeeem</div>
                    <div className="mrc-ui-pageheader-tabitem">tab item</div>
                    <div className="mrc-ui-pageheader-tabitem">tab iteeeeeeeeeeeem</div>
                    <div className="mrc-ui-pageheader-tabitem">tab item</div>
                </div>
                <SideScreen
                    isShown={showAsideInfo}
                    toggle={this.toggleAsideInfo}
                    title="More Request Info with very large text bla bla bla"
                >
                    <HeaderInfo {...headerInfoData} isColStyle />
                </SideScreen>
            </header>
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
