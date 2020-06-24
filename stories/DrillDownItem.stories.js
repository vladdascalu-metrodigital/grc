import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import DrillDownItem from '../DrillDownItem';
import IconAndLabels from '../icons/IconAndLabels';
import ProfileIcon from '../icons/ProfileIcon';

storiesOf('Fundamentals/DrillDownItem', module).add('example usage', () => (
    <MainContent>
        <DrillDownItem onClick={() => action('drill down')('1')}>
            <IconAndLabels icon={ProfileIcon} title="Müller GmbH" subtitle="123/678432" />
        </DrillDownItem>
        <DrillDownItem onClick={() => action('drill down')('2')}>
            <IconAndLabels icon={ProfileIcon} title="Alberto AG" subtitle="789/334227" />
        </DrillDownItem>
    </MainContent>
));
