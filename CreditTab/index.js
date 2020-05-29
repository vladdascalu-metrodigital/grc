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
            <div className="mrc-ui-wrapper">
                <section>
                    <table>
                        <thead className="mrc-ui-table-header">
                            <tr className="mrc-ui-table-light-header-row">
                                <th>Customer Group</th>
                                <th colSpan="3">20000</th>
                                <th colSpan="3">22000</th>
                                <th className="border-fix"></th>
                            </tr>
                            <tr>
                                <th rowSpan="2" className="mrc-ui-second-header-row">
                                    Customer
                                </th>
                                <th colSpan="3" className="mrc-ui-second-header-row">
                                    Current
                                </th>
                                <th colSpan="3" className="mrc-ui-second-header-row">
                                    Customer Wish/ New
                                </th>
                                <th rowSpan="2" className="mrc-ui-second-header-row border-fix"></th>
                            </tr>
                            <tr>
                                <th className="mrc-ui-third-header-row">Exhausted/Granted</th>
                                <th className="mrc-ui-third-header-row">Expiry</th>
                                <th className="mrc-ui-third-header-row">Creditproduct</th>
                                <th className="mrc-ui-third-header-row">Limit</th>
                                <th className="mrc-ui-third-header-row">Expiry</th>
                                <th className="mrc-ui-third-header-row">Creditproduct</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td className="border-fix">toggler</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td rowSpan="2">Exhausted/Granted</td>
                                <td rowSpan="2">Expiry</td>
                                <td rowSpan="2">Creditproduct</td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2" className="border-fix">
                                    toggler
                                </td>
                            </tr>
                            <tr>
                                <td>new 21300</td>
                                <td>new expiry</td>
                                <td>new product</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td className="border-fix">toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>

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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>
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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>

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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>
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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>

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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>
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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>

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

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td>Exhausted/Granted</td>
                                <td>Expiry</td>
                                <td>Creditproduct</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

                            <tr>
                                <td>Mepo Gmbh</td>
                                <td colSpan="3">Cash</td>
                                <td colSpan="3">Prepayment</td>
                                <td>toggler</td>
                            </tr>

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
                                <td colSpan="3">Cash</td>
                            </tr>

                            <tr>
                                <td rowSpan="2">Mepo Gmbh</td>
                                <td colSpan="3" rowSpan="2">
                                    Prepayment
                                </td>
                                <td>wish 21000</td>
                                <td>wish 22.03.2020</td>
                                <td>product a</td>
                                <td rowSpan="2">toggler</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Cash</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}
