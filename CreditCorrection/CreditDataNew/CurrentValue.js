import React, { Component } from 'react';
import './index.scss';
import { lookup } from '../../Util/translations';
import MrcNumber from '../../MrcNumber';

export default class CurrentValue extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="current-value">
                <label>
                    {lookup('mrc.creditdetails.current')}: {this.toVisualRepresentation()}
                </label>
            </div>
        );
    }

    toVisualRepresentation() {
        switch (this.props.type) {
            case 'limit':
                if (this.isValidNumber()) return <MrcNumber country={this.props.country}>{this.props.value}</MrcNumber>;
                else return '-';
            default:
                return <span>{this.props.value || '-'}</span>;
        }
    }

    isValidNumber() {
        return (
            (this.props.value !== null && this.props.value !== '' && !Number.isNaN(this.props.value)) ||
            this.props.value === 0
        );
    }
}
