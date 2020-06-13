import React, { Component } from 'react';
import MainContent from '../../MainContent';
import Table from '../../MrcTable';
import Grid, { GridItem } from '../../Grid';
import BoxWithTitle from '../../BoxWithTitle';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';
import { lookup } from '../../Util/translations';

import CreditTableHead from './CreditTableHead';
import CreditTableRow from './CreditTableRow';

import './index.scss';

import * as _ from 'lodash';

export default class CreditTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { customer, customers } = this.props;
        const translations = {
            name: lookup('mrc.customerdata.name'),
            phone: lookup('mrc.credittab.telephone'),
            email: lookup('mrc.customerdetails.fields.email'),
        };
        return (
            <MainContent>
                <Grid>
                    {customer ? (
                        <BoxWithTitle
                            title={lookup('mrc.credittab.groupdetails')}
                            // TODO
                            action={null}
                        >
                            <KeyValueGroup>
                                <KeyValueRow>
                                    <Key>{translations.name}</Key>
                                    <Value>{customer.name}</Value>
                                </KeyValueRow>
                                <KeyValueRow spaced>
                                    <Key>{translations.phone}</Key>
                                    <Value>{customer.phone}</Value>
                                </KeyValueRow>
                                <KeyValueRow spaced>
                                    <Key>{translations.email}</Key>
                                    <Value>{customer.email}</Value>
                                </KeyValueRow>
                            </KeyValueGroup>
                        </BoxWithTitle>
                    ) : null}
                    <BoxWithTitle
                        title={lookup('mrc.credittab.requestdetails')}
                        // TODO
                        action={null}
                    >
                        <h3 className="mrc-ui-credit-tab-profit-label">{lookup('addfield.profitability')}</h3>
                        <span className="mrc-ui-credit-tab-profit-number">20</span>%
                    </BoxWithTitle>
                    <GridItem colSpan="all">
                        <Table.Root>
                            <Table.Body>
                                <CreditTableHead {...this.props} />
                                {customers
                                    ? customers.map((customer, i) => (
                                          <CreditTableRow
                                              customer={customer}
                                              historical={this.props.historical}
                                              key={_.get(customer, 'customerData.displayName')}
                                              id={'credit-table-sticky-row-' + i}
                                              isZebra={!!(i % 2)}
                                          />
                                      ))
                                    : null}
                            </Table.Body>
                        </Table.Root>
                    </GridItem>
                </Grid>
            </MainContent>
        );
    }
}
