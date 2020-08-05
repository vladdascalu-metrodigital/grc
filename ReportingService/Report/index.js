import React, { Component } from 'react';

import IFrame from '../../IFrame';

export default class ReportPresentation extends Component {
    render() {
        return this.props.datastudioId ? (
            <IFrame
                title={this.props.name}
                src={'https://datastudio.google.com/embed/reporting/' + this.props.datastudioId}
            />
        ) : null;
    }
}
