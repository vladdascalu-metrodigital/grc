import React from 'react';
import { storiesOf } from '@storybook/react';
import { FlexRow, FlexColumn } from '../Flex';

storiesOf('Layouts/Flex', module)
    .add('rows', () => (
        <FlexRow alignItems="center" gap="medium">
            <div>
                A simple
                <br />
                flex row component
            </div>
            <div>for flexing around</div>
        </FlexRow>
    ))
    .add('columns', () => (
        <FlexColumn alignItems="center" gap="medium">
            <div>
                A simple
                <br />
                flex column component
            </div>
            <div>for flexing about</div>
        </FlexColumn>
    ));
