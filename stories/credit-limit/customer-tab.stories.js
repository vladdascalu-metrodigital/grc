import React from 'react';
import { storiesOf } from '@storybook/react';

import BoxWithTitle, { TYPE as BOX_TYPE } from '../../BoxWithTitle';
import Grid from '../../Grid';
import ToggleBox from '../../ToggleBox';
import Card, { TYPE as CARD_TYPE } from '../../Card';
import VCard from '../../VCard';
import KeyValueGroup, { KeyValueRow, Key, Value } from '../../KeyValueGroup';
import BusinessIcon from '../../icons/BusinessIcon';
import WarningSmallFilledIcon from '../../icons/WarningSmallFilledIcon';
import { COLOR as ICOLOR, SIZE as ISIZE } from '../../icons/index';
import { FlexRow } from '../../Flex';
import Text, { COLOR } from '../../Text';

import { person } from '../VCard.stories';

let MeierGmbHToggler = () => (
    <FlexRow alignItems={'center'} gap="medium">
        <BusinessIcon />
        <div>
            <Text>Meier GmbH</Text>
            <br />
            <Text>122/45060</Text>
        </div>
        <ClientBlocked />
    </FlexRow>
);

let BlaumeierAGToggler = () => (
    <FlexRow alignItems={'center'} gap="medium">
        <BusinessIcon />
        <div>
            <Text>Blaumeier AG</Text>
            <br />
            <Text>122/45080</Text>
        </div>
    </FlexRow>
);

let ClientBlocked = () => (
    <FlexRow alignItems={'center'} gap="small">
        <WarningSmallFilledIcon size={ISIZE.XSMALL} fill={ICOLOR.DANGER} />
        <Text color={COLOR.DANGER}>Kundensperre</Text>
    </FlexRow>
);

let ClientBlockedBigger = () => (
    <FlexRow alignItems={'center'} gap="small">
        <WarningSmallFilledIcon size={ISIZE.SMALL} fill={ICOLOR.DANGER} />
        <Text color={COLOR.DANGER}>Kundensperre</Text>
    </FlexRow>
);

storiesOf('S Credit Limit/Customer Tab', module).add('Customer Tab', () => {
    return (
        <>
            <ToggleBox titleContent={<MeierGmbHToggler />}>
                <Grid>
                    <div style={{ 'grid-column': '1/-1' }}>
                        <ClientBlockedBigger />
                    </div>
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
            <ToggleBox titleContent={<BlaumeierAGToggler />} initialShow>
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
    );
});
