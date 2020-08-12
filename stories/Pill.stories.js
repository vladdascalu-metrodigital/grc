import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pill from '../Pill';

storiesOf('Fundamentals/Pill', module).add('Pills', () => {
    return (
        <div>
            <Pill text="Dr. Mario Disapproves" type="danger" />
            <Pill text="Dr. Mario Approves" type="success" />
        </div>
    );
});
