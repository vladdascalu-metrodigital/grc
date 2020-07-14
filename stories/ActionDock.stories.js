import React from 'react';
import { storiesOf } from '@storybook/react';
import ActionDock, { SimpleActionDock } from '../ActionDock';
import { action } from '@storybook/addon-actions';

storiesOf('ActionDock/simple', module).add('Simple ActionDock', () => (
    <SimpleActionDock onCancel={() => action('actionDockCancel')()} onApply={() => action('actionDockApply')()} />
));
