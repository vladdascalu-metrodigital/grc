import React, { Component } from 'react';

import './index.scss';

export class Select extends Component {
    render() {
        return (
            <div className="mrc-ui-select">
                <select name="creditPeriod" className="mrc-ui-select-input">
                    <option value="7" default>
                        7
                    </option>
                    <option value="14">14</option>
                    <option value="21">21</option>
                </select>
            </div>
        );
    }
}

export default Select;
