import React from 'react';
import { storiesOf } from '@storybook/react';
import { COLOR, SIZE } from '../icons/index';
import Grid from '../Grid';

import BusinessIcon from '../icons/BusinessIcon';
import ProfileIcon from '../icons/ProfileIcon';

storiesOf('Fundamentals/Icons', module)
    .add('all icons', () => (
        <Grid>
            <ProfileIcon />
            <BusinessIcon />
        </Grid>
    ))
    .add('colors', () => (
        <Grid>
            <p>Change the stroke color via the stroke property:</p>
            <ProfileIcon />
            <ProfileIcon stroke={COLOR.CONTRAST_BLACK} />
            <ProfileIcon stroke={COLOR.CONTRAST_WHITE} />
            <ProfileIcon stroke={COLOR.INTERACTION} />
            <ProfileIcon stroke={COLOR.NEUTRAL} />
            <ProfileIcon stroke={COLOR.SUCCESS} />
        </Grid>
    ))
    .add('sizes', () => (
        <Grid>
            <p>Change the size via the size property:</p>
            <ProfileIcon size={SIZE.SMALL} />
            <ProfileIcon />
        </Grid>
    ));
