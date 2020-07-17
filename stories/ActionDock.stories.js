import React from 'react';
import { storiesOf } from '@storybook/react';
import ActionDock, { SimpleActionDock } from '../ActionDock';
import { action } from '@storybook/addon-actions';

storiesOf('Fundamentals/ActionDock', module)
    .add('Simple ActionDock', () => (
        <SimpleActionDock onCancel={() => action('actionDockCancel')()} onApply={() => action('actionDockApply')()} />
    ))
    .add('Simple ActionDock, custom labels', () => (
        <SimpleActionDock
            onCancel={() => action('actionDockCancel')()}
            cancelText="NO"
            onApply={() => action('actionDockApply')()}
            applyText="YES"
        />
    ));
