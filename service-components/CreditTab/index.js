import React, { Component } from 'react';
import Table from '../../MrcTable';
import CreditTableHead from './CreditTableHead';
import CreditTableRow from './CreditTableRow';

import CreditTableRowA from './CreditTableRowA';
import CreditTableRowB from './CreditTableRowB';
import CreditTableRowC from './CreditTableRowC';
import CreditTableRowD from './CreditTableRowD';

// import CheckCard from '../CheckCard';
// import Grid from '../Grid';

// import CreditTableExpandableContent from './CreditTableExpandableContent';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';

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
                        <CreditTableRow />
                        <Table.Body>
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
