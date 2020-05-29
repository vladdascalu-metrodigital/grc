import React, { Component } from 'react';
import Table from './Table';
import CreditTableHead from './CreditTableHead';
import CreditTableRowA from './CreditTableRowA';
import CreditTableRowB from './CreditTableRowB';
import CreditTableRowC from './CreditTableRowC';
import CreditTableRowD from './CreditTableRowD';
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
                            <CreditTableRowC />
                            <CreditTableRowD />

                            <CreditTableRowA />
                            <CreditTableRowB />
                            <CreditTableRowC />

                            <CreditTableRowA />
                            <CreditTableRowB />
                            <CreditTableRowC />

                            <CreditTableRowA />
                            <CreditTableRowB />
                            <CreditTableRowC />
                        </Table.Body>
                    </Table.Root>
                </section>
            </div>
        );
    }
}
