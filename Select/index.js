import React, { Component } from 'react';

import './index.scss';

export class Select extends Component {
    render() {
        return (
            <select name="creditPeriod" className="mrc-ui-select">
                <option value="7" default>
                    7
                </option>
                <option value="14">14</option>
                <option value="21">21</option>
            </select>
        );
    }
}

export default Select;
