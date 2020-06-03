import React, { Component } from 'react';
import Table from '../MrcTable';
import CreditTableHead from './CreditTableHead';
import CreditTableRowA from './CreditTableRowA';
import CreditTableRowB from './CreditTableRowB';
import CreditTableRowC from './CreditTableRowC';
import CreditTableRowD from './CreditTableRowD';

import CreditTableExpandableContent from './CreditTableExpandableContent';
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
                        <Table.Body>
                            <CreditTableRowD />

                            <Table.R>
                                <Table.D colspan="8" className="mrc-ui-form-bg">
                                    <CreditTableExpandableContent
                                        title="Payment"
                                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                    />
                                    <hr />
                                    <CreditTableExpandableContent
                                        title="Limit"
                                        description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                                    />
                                </Table.D>
                            </Table.R>

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
