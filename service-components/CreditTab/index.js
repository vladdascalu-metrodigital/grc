import React, { Component } from 'react';
import MainContent from '../../MainContent';
import Table from '../../MrcTable';
import Grid, { GridItem } from '../../Grid';
import BoxWithTitle from '../../BoxWithTitle';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';

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
            <MainContent>
                <Grid>
                    <BoxWithTitle title="Groupdetails" action={{ title: 'edit', fn: () => alert('edit') }}>
                        <KeyValueGroup>
                            <KeyValueRow>
                                <Key>Name</Key>
                                <Value>Peter Parker</Value>
                            </KeyValueRow>
                            <KeyValueRow spaced>
                                <Key>Telefon</Key>
                                <Value>123 456 789</Value>
                            </KeyValueRow>
                            <KeyValueRow spaced>
                                <Key>Email</Key>
                                <Value>peter@parker.com</Value>
                            </KeyValueRow>
                        </KeyValueGroup>
                    </BoxWithTitle>
                    <BoxWithTitle title="Requestdetails" action={{ title: 'edit', fn: () => {} }}></BoxWithTitle>
                    <GridItem colSpan="all">
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
                    </GridItem>
                </Grid>
            </MainContent>
        );
    }
}
