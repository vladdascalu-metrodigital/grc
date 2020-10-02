import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pill from '../Pill';

storiesOf('Fundamentals/Pill', module)
    .add('Pills', () => {
        return (
            <div>
                Lorem ipsum inline Pills:
                <Pill text="Dr. Mario Disapproves" type="danger" />
                <Pill text="Dr. Mario Approves" type="success" />
            </div>
        );
    })
    .add('Small Pills', () => {
        return (
            <div>
                Lorem ipsum inline Pills:
                <Pill text="Dr. Mario Disapproves" type="danger" size="small" />
                <Pill text="Dr. Mario Approves" type="success" size="small" />
            </div>
        );
    })
    .add('Removable Pill With Title', () => {
        return (
            <Pill
                title="Lorem Ipsum"
                text="Dolor Sit Amet"
                type="success"
                onRemove={() => action('onRemove')('onRemove')}
            />
        );
    });
