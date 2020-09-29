import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import SegmentedControl from '../SegmentedControl';

storiesOf('Segmented Control', module).add('basic', () => (
    <SegmentedControl selectedSegment={'Placeholder'} labels={['Document', 'Placeholder', 'bar', 'baz']} />
));
