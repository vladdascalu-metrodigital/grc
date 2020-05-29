import React, { Component } from 'react';
import Table from './Table';
import CreditTableHead from './CreditTableHead';
import CreditTableRowA from './CreditTableRowA';
import CreditTableRowB from './CreditTableRowB';
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
                    <Table.Root>
                        <CreditTableHead />
                        <Table.Body>
                            <CreditTableRowA />
                            <CreditTableRowB />

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
                        </Table.Body>
                    </Table.Root>
                </section>
            </div>
        );
    }
}
