import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import './index.scss';

export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const reports = this.props.data.map((report, i) => (
            <div key={i}>
                <div className="mrc-ui-comment">
                    <div className="mrc-ui-comment-text">
                        <a href={'#/reports/' + report.id}>{report.name}</a>
                    </div>
                </div>
            </div>
        ));
        return (
            <div className="mrc-ui-report-component">
                <div className="mrc-ui-reports">
                    <h3 className="mrc-ui-reports-headline">{lookup('mrc.reports.title')}</h3>
                    <div className="mrc-ui-reports-list">{reports}</div>
                </div>
            </div>
        );
    }
}
