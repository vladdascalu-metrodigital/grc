import React, { Component } from 'react';
import MainContent from '../../MainContent';
import Table from '../../MrcTable';
import Grid, { GridItem } from '../../Grid';
import BoxWithTitle from '../../BoxWithTitle';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';
import { lookup } from '../../Util/translations';

import CreditTableHead from './CreditTableHead';
import CreditTableRow from './CreditTableRow';

import CreditTableRowA from './CreditTableRowA';
import CreditTableRowB from './CreditTableRowB';
import CreditTableRowC from './CreditTableRowC';
import CreditTableRowD from './CreditTableRowD';

import './index.scss';

// TODO additional fields

export default class CreditTab extends Component {
    render() {
        const { customer } = this.props;
        const groupInfo = customer ? (
            <BoxWithTitle title="Groupdetails" action={{ title: 'edit', fn: () => alert('edit') }}>
                <KeyValueGroup>
                    <KeyValueRow>
                        <Key>{lookup('mrc.customerdata.name')}</Key>
                        <Value>{customer.name}</Value>
                    </KeyValueRow>
                    <KeyValueRow spaced>
                        <Key>{lookup('mrc.credittab.telephone')}</Key>
                        <Value>{customer.phone}</Value>
                    </KeyValueRow>
                    <KeyValueRow spaced>
                        <Key>{lookup('mrc.customerdetails.fields.email')}</Key>
                        <Value>{customer.email}</Value>
                    </KeyValueRow>
                </KeyValueGroup>
            </BoxWithTitle>
        ) : null;
        return (
            <MainContent>
                <Grid>
                    {groupInfo}
                    <BoxWithTitle title="Requestdetails" action={{ title: 'edit', fn: () => {} }}>
                        <h3 className="mrc-ui-credit-tab-profit-label">{lookup('addfield.profitability')}</h3>
                        <span className="mrc-ui-credit-tab-profit-number">20</span>%
                    </BoxWithTitle>
                    <GridItem colSpan="all">
                        <Table.Root>
                            <CreditTableHead {...this.props} />
                            {[...Array(10).keys()].map((e, i) => (
                                <CreditTableRow key={i} isZebra={!!(i % 2)} />
                            ))}

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
                        </Table.Root>
                    </GridItem>
                </Grid>
            </MainContent>
        );
    }
}
