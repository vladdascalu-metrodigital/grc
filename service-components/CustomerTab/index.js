import React, { Component } from 'react';

import BoxWithTitle, { TYPE as BOX_TYPE } from '../../BoxWithTitle';
import MainContent from '../../MainContent';
import ToggleBox from '../../ToggleBox';
import CustomerToggler from './CustomerToggler';
import Grid, { GridItem } from '../../Grid';
import ClientBlocked from '../ClientBlocked';
import Card from '../../Card';
import VCard from '../../VCard';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';

import './index.scss';

import { person } from '../../stories/VCard.stories';

export default class CustomerTab extends Component {
    render() {
        return (
            <MainContent>
                <h2 className="mrc-ui-customer-tab-title">Customer</h2>
                <ToggleBox titleContent={<CustomerToggler isBlocked />}>
                    <Grid>
                        <GridItem colSpan="all">
                            <ClientBlocked size="large" text="Kunde zur Löschung vorgesehen" />
                        </GridItem>
                        <BoxWithTitle title="Contact Info" type={BOX_TYPE.SMALLER}>
                            <Card dropShadow>
                                <VCard person={person} />
                            </Card>
                        </BoxWithTitle>
                        <BoxWithTitle title="Business Info" type={BOX_TYPE.SMALLER}>
                            <KeyValueGroup>
                                <KeyValueRow>
                                    <Key>Tax ID</Key>
                                    <Value>123 123 422 123</Value>
                                </KeyValueRow>
                                <KeyValueRow>
                                    <Key>Legal Form</Key>
                                    <Value>1 - Kaufmann</Value>
                                </KeyValueRow>
                                <KeyValueRow spaced>
                                    <Key>Sector</Key>
                                    <Value>Ambul. Handler Käse und so</Value>
                                </KeyValueRow>
                                <KeyValueRow>
                                    <Key>Segment</Key>
                                    <Value>Traders</Value>
                                </KeyValueRow>
                                <KeyValueRow spaced>
                                    <Key>Founded</Key>
                                    <Value>2 Years ago, 12.01.18</Value>
                                </KeyValueRow>
                                <KeyValueRow>
                                    <Key>Customer Since</Key>
                                    <Value>since 2 Years, 12.04.18</Value>
                                </KeyValueRow>
                            </KeyValueGroup>
                        </BoxWithTitle>
                    </Grid>
                </ToggleBox>
                <ToggleBox titleContent={<CustomerToggler />}>
                    <Grid>
                        <BoxWithTitle title="Contact Info" type={BOX_TYPE.SMALLER}>
                            <Card>
                                <VCard person={person} />
                            </Card>
                        </BoxWithTitle>
                        <BoxWithTitle title="Business Info" type={BOX_TYPE.SMALLER}>
                            <KeyValueGroup>
                                <KeyValueRow>
                                    <Key>Tax ID</Key>
                                    <Value>123 123 422 123</Value>
                                </KeyValueRow>
                                <KeyValueRow>
                                    <Key>Legal Form</Key>
                                    <Value>1 - Kaufmann</Value>
                                </KeyValueRow>
                                <KeyValueRow spaced>
                                    <Key>Sector</Key>
                                    <Value>Ambul. Handler Käse und so</Value>
                                </KeyValueRow>
                                <KeyValueRow>
                                    <Key>Segment</Key>
                                    <Value>Traders</Value>
                                </KeyValueRow>
                                <KeyValueRow spaced>
                                    <Key>Founded</Key>
                                    <Value>2 Years ago, 12.01.18</Value>
                                </KeyValueRow>
                                <KeyValueRow>
                                    <Key>Customer Since</Key>
                                    <Value>since 2 Years, 12.04.18</Value>
                                </KeyValueRow>
                            </KeyValueGroup>
                        </BoxWithTitle>
                    </Grid>
                </ToggleBox>
            </MainContent>
        );
    }
}
