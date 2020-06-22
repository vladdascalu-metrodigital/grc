import React from 'react';
import { storiesOf } from '@storybook/react';
import { COLOR, SIZE } from '../icons/index';
import Grid from '../Grid';

import BusinessIcon from '../icons/BusinessIcon';
import ProfileIcon from '../icons/ProfileIcon';
import WarningSmallFilledIcon from '../icons/WarningSmallFilledIcon';
import SearchIcon from '../icons/SearchIcon';
import SelectIcon from '../icons/SelectIcon';

storiesOf('Fundamentals/Icons', module)
    .add('all icons', () => (
        <Grid>
            <ProfileIcon />
            <BusinessIcon />
            <WarningSmallFilledIcon />
            <SearchIcon />
            <SelectIcon />
        </Grid>
    ))
    .add('colors', () => (
        <div>
            <h2>Change the stroke color:</h2>
            <Grid>
                {Object.values(COLOR).map((clr, i) => (
                    <ProfileIcon key={i} stroke={clr} />
                ))}
            </Grid>
            <h2>Change the fill color:</h2>
            <Grid>
                {Object.values(COLOR).map((clr, i) => (
                    <WarningSmallFilledIcon key={i} fill={clr} />
                ))}
            </Grid>
        </div>
    ))
    .add('sizes', () => (
        <React.Fragment>
            <p>Change the size via the size property:</p>
            <BusinessIcon size={SIZE.XSMALL} />
            <BusinessIcon size={SIZE.SMALL} />
            <BusinessIcon />
        </React.Fragment>
    ));
