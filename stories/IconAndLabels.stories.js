import React from 'react';
import { storiesOf } from '@storybook/react';
import MainContent from '../MainContent';
import IconAndLabels, { TYPE } from '../icons/IconAndLabels';
import BusinessIcon from '../icons/BusinessIcon';

storiesOf('Fundamentals/IconAndLabels', module).add('icon label combo', () => (
    <MainContent>
        <IconAndLabels icon={BusinessIcon} title="Alex GmbH" subtitle="45/123789" />
        <IconAndLabels type={TYPE.STRONG_AND_NORMAL} icon={BusinessIcon} title="Alex GmbH" subtitle="45/123789" />
        <IconAndLabels type={TYPE.ALL_LIGHT} icon={BusinessIcon} title="Alex GmbH" subtitle="45/123789" />
    </MainContent>
));
