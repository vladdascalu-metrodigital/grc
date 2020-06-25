import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { COLOR, SIZE } from '../icons/index';
import MainContent from '../MainContent';
import Grid, { GridItem } from '../Grid';
import Select from '../Select';

import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import BusinessIcon from '../icons/BusinessIcon';
import CheckmarkFilledIcon from '../icons/CheckmarkFilledIcon';
import CheckSmallFilledIcon from '../icons/CheckSmallFilledIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import ChevronRightSmallIcon from '../icons/ChevronRightSmallIcon';
import ProfileIcon from '../icons/ProfileIcon';
import WarningSmallFilledIcon from '../icons/WarningSmallFilledIcon';
import SearchIcon from '../icons/SearchIcon';
import SearchCircledIcon from '../icons/SearchCircledIcon';
import SelectIcon from '../icons/SelectIcon';

storiesOf('Fundamentals/Icons', module)
    .add('all icons', () => {
        let [color, setColor] = useState(null);
        return (
            <MainContent>
                <Grid>
                    <GridItem colSpan="all">
                        Color:
                        <br />
                        <Select options={['default', ...Object.values(COLOR)]} onChange={c => setColor(c)} />
                    </GridItem>

                    <ArrowLeftIcon color={color} />
                    <BusinessIcon color={color} />
                    <CheckmarkFilledIcon color={color} />
                    <CheckSmallFilledIcon color={color} />
                    <ChevronRightIcon color={color} />
                    <ChevronRightSmallIcon color={color} />
                    <ProfileIcon color={color} />
                    <SearchCircledIcon color={color} />
                    <SearchIcon color={color} />
                    <SelectIcon color={color} />
                    <WarningSmallFilledIcon color={color} />
                </Grid>
            </MainContent>
        );
    })
    .add('sizes', () => (
        <React.Fragment>
            <p>Change the size via the size property:</p>
            <BusinessIcon size={SIZE.XSMALL} />
            <BusinessIcon size={SIZE.SMALL} />
            <BusinessIcon />
        </React.Fragment>
    ));
