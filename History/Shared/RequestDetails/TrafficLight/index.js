import React, { Component } from 'react';
import ApprovedIcon from '../../../../icons/signal-approved.svg';
import CreditCorrectionIcon from '../../../../icons/credit-correction-blue.svg';
import BlockedIcon from '../../../../icons/signal-blocked.svg';
import PendingIcon from '../../../../icons/signal-pending.svg';
import QuickCheckIcon from '../../../../icons/quick-check.svg';
import OpenIcon from '../../../../icons/signal-open.svg';

export default class TrafficLight extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const requestStatus = this.props.requestStatus;
        if (requestStatus.requestType === 'CREDIT_CORRECTION') {
            return <img src={CreditCorrectionIcon} alt="Credit Correction Light"></img>;
        }
        if (requestStatus.trafficLight == 'red') {
            return <img src={BlockedIcon} alt="RED Traffic Light"></img>;
        }
        if (requestStatus.trafficLight == 'yellow') {
            return <img src={PendingIcon} alt="YELLOW Traffic Light"></img>;
        }
        if (requestStatus.trafficLight == 'green') {
            return <img src={ApprovedIcon} alt="GREEN Traffic Light"></img>;
        }
        if (requestStatus.trafficLight == 'quickcheck') {
            return <img src={QuickCheckIcon} alt="QUICKCHECK Traffic Light"></img>;
        }
        return <img src={OpenIcon} alt="GREY Traffic Light"></img>;
    }
}
