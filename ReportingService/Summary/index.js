import React, { Component } from 'react';

import Reports from '../../Reports';

export default class Summary extends Component {
    render() {
        return this.props.reports ? <Reports data={this.props.reports} /> : null;
    }
}
