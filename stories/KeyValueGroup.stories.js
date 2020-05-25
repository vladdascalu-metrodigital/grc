import React from 'react';
import { storiesOf } from '@storybook/react';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../KeyValueGroup';

storiesOf('Fundamentals/KeyValueGroup', module).add('super automatic grid', () => (
    <>
        <KeyValueGroup>
            <KeyValueRow>
                <Key>Tax ID</Key>
                <Value>123 456 123 567</Value>
            </KeyValueRow>
            <KeyValueRow>
                <Key>Legal Form</Key>
                <Value>1 - Kaufmann</Value>
            </KeyValueRow>
            <KeyValueRow spaced>
                <Key>Sector</Key>
                <Value>
                    Ambul. Händler Käse / Feinkost / MoPo
                    <br />
                    ID381
                </Value>
            </KeyValueRow>
            <KeyValueRow>
                <Key>Segment super long key bla bla bla</Key>
                <Value>Traders</Value>
            </KeyValueRow>
        </KeyValueGroup>
    </>
));
