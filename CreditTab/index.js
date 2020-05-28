import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';

import './index.scss';

// export const GAP = {
// 'NONE'
// 'SMALL'
// 'LARGE'
// }

export default class CreditTab extends Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Group</th>
                            <th colSpan="3">20000</th>
                            <th colSpan="3">22000</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th rowSpan="2">Customer</th>
                            <th colSpan="3">Current</th>
                            <th colSpan="3">Customer Wish/ New</th>
                            <th rowSpan="2"></th>
                        </tr>
                        <tr>
                            <th>Exhausted/Granted</th>
                            <th>Expiry</th>
                            <th>Creditproduct</th>
                            <th>Limit</th>
                            <th>Expiry</th>
                            <th>Creditproduct</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan="2">Mepo Gmbh</td>
                            <td rowSpan="2">Exhausted/Granted</td>
                            <td rowSpan="2">Expiry</td>
                            <td rowSpan="2">Creditproduct</td>
                            <td>wish 21000</td>
                            <td>wish 22.03.2020</td>
                            <td>product a</td>
                            <td rowSpan="2">toggler</td>
                        </tr>
                        <tr>
                            <td>new 21300</td>
                            <td>new expiry</td>
                            <td>new product</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
