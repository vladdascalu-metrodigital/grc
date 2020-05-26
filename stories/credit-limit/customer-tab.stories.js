import React from 'react';
import { storiesOf } from '@storybook/react';

import BoxWithTitle, { TYPE as BOX_TYPE } from '../../BoxWithTitle';
import Grid from '../../Grid';
import ToggleBox from '../../ToggleBox';
import Card, { TYPE as CARD_TYPE } from '../../Card';
import VCard from '../../VCard';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';

import { person } from '../VCard.stories';

storiesOf('S Credit Limit/Customer Tab', module).add('Customer Tab', () => (
    <>
        <ToggleBox titleContent="Meier GmbH">
            <Grid></Grid>
        </ToggleBox>
        <ToggleBox titleContent="Blaumeier AG" initialShow>
            <Grid>
                <BoxWithTitle title="Contact Info" type={BOX_TYPE.SMALLER}>
                    <Card type={CARD_TYPE.PRIMARY}>
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
    </>
));
