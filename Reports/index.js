import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import './index.scss';
import ReportingIcon from '../icons/reporting-blue.svg';

import BoxWithTitle, { TYPE } from '../BoxWithTitle';
import MainContent from '../MainContent';

export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const reports = this.props.data.map(report => (
            <>
                <div className="mrc-ui-report">
                    <a href={'#/reports/' + report.id}>
                        <div className="mrc-ui-report-icon-background">
                            <img className="mrc-ui-report-icon" src={ReportingIcon} alt={'report'} />
                        </div>
                        <h3 className="mrc-ui-report-text">{report.name}</h3>
                    </a>
                </div>
            </>
        ));
        return (
            <MainContent>
                <div className="mrc-ui-report-component">
                    <BoxWithTitle title={lookup('mrc.reports.title')} type={TYPE.SMALLER}>
                        <div className="mrc-ui-reports-list">{reports}</div>
                    </BoxWithTitle>
                </div>
            </MainContent>
        );
    }
}
