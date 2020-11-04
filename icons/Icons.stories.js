import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { COLOR, SIZE } from '../icons/index';
import MainContent from '../MainContent';
import Grid, { GridItem } from '../Grid';
import Select from '../Select';

import AlertWarningSmall from '../icons/AlertWarningSmall';
import ArrowDownOutlinedIcon from '../icons/ArrowDownOutlinedIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightOutlinedIcon from '../icons/ArrowUpOutlinedIcon';
import ArrowUpOutlinedIcon from '../icons/ArrowRightOutlinedIcon';
import BatchUpdateIcon from '../icons/BatchUpdateIcon';
import BusinessIcon from '../icons/BusinessIcon';
import CalendarIcon from '../icons/CalendarIcon';
import CancelIcon from '../icons/CancelIcon';
import CheckIcon from '../icons/CheckIcon';
import CheckmarkFilledIcon from '../icons/CheckmarkFilledIcon';
import CheckSmallFilledIcon from '../icons/CheckSmallFilledIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import ChevronRightSmallIcon from '../icons/ChevronRightSmallIcon';
import CreditCorrectionIcon from '../icons/CreditCorrectionIcon';
import HistoryIcon from '../icons/HistoryIcon';
import InboxIcon from '../icons/InboxIcon';
import LaunchPadIcon from '../icons/LaunchPadIcon';
import LimitCheckIcon from '../icons/LimitCheckIcon';
import MenuIcon from '../icons/MenuIcon';
import MetroIcon from '../icons/MetroIcon';
import MoreIcon from '../icons/MoreIcon';
import PlusIcon from '../icons/PlusIcon';
import PlusIconStroke from '../icons/PlusIconStroke';
import PrepaymentIcon from '../icons/PrepaymentIcon';
import ProfileIcon from '../icons/ProfileIcon';
import QuickCheckIcon from '../icons/QuickCheckIcon';
import ReportingIcon from '../icons/ReportingIcon';
import RocketIcon from '../icons/RocketIcon';
import SearchCircledIcon from '../icons/SearchCircledIcon';
import SearchIcon from '../icons/SearchIcon';
import SelectIcon from '../icons/SelectIcon';
import WarningSmallFilledIcon from '../icons/WarningSmallFilledIcon';
import EmailServiceIcon from '../icons/EmailServiceIcon';

storiesOf('Fundamentals/Icons', module)
    .add('all icons', () => {
        let [color, setColor] = useState(null);
        let [size, setSize] = useState(null);
        return (
            <MainContent>
                <Grid>
                    <GridItem colSpan="all">
                        Color:
                        <br />
                        <Select options={['default', ...Object.values(COLOR)]} onChange={(c) => setColor(c)} />
                    </GridItem>
                    <GridItem colSpan="all">
                        Size:
                        <br />
                        <Select options={['default', ...Object.values(SIZE)]} onChange={(s) => setSize(s)} />
                    </GridItem>

                    <AlertWarningSmall color={color} size={size} />
                    <ArrowDownOutlinedIcon color={color} size={size} />
                    <ArrowLeftIcon color={color} size={size} />
                    <ArrowRightOutlinedIcon color={color} size={size} />
                    <ArrowUpOutlinedIcon color={color} size={size} />
                    <BatchUpdateIcon color={color} size={size} />
                    <BusinessIcon color={color} size={size} />
                    <CalendarIcon color={color} size={size} />
                    <CancelIcon color={color} size={size} />
                    <CheckIcon color={color} size={size} />
                    <CheckmarkFilledIcon color={color} size={size} />
                    <CheckSmallFilledIcon color={color} size={size} />
                    <ChevronRightIcon color={color} size={size} />
                    <ChevronRightSmallIcon color={color} size={size} />
                    <CreditCorrectionIcon color={color} size={size} />
                    <HistoryIcon color={color} size={size} />
                    <InboxIcon color={color} size={size} />
                    <LaunchPadIcon color={color} size={size} />
                    <LimitCheckIcon color={color} size={size} />
                    <MenuIcon color={color} size={size} />
                    <MetroIcon color={color} size={size} />
                    <MoreIcon color={color} size={size} />
                    <PlusIcon color={color} size={size} />
                    <PlusIconStroke color={color} size={size} />
                    <PrepaymentIcon color={color} size={size} />
                    <ProfileIcon color={color} size={size} />
                    <QuickCheckIcon color={color} size={size} />
                    <ReportingIcon color={color} size={size} />
                    <RocketIcon color={color} size={size} />
                    <SearchCircledIcon color={color} size={size} />
                    <SearchIcon color={color} size={size} />
                    <SelectIcon color={color} size={size} />
                    <WarningSmallFilledIcon color={color} size={size} />
                    <EmailServiceIcon color={color} size={size} />
                </Grid>
            </MainContent>
        );
    })
    .add('Sizes', () => (
        <React.Fragment>
            <p>Change the size via the size property:</p>
            <BusinessIcon size={SIZE.XSMALL} />
            <BusinessIcon size={SIZE.SMALL} />
            <BusinessIcon />
        </React.Fragment>
    ))
    .add('Inline Size with current-color', () => (
        <React.Fragment>
            <h1>
                This is an inline <CancelIcon size={SIZE.INLINE} color={COLOR.CURRENT_COLOR} /> Icon adapted to text
                color
            </h1>
            <h2>
                This is an inline <CancelIcon size={SIZE.INLINE} color={COLOR.CURRENT_COLOR} /> Icon adapted to text
                color
            </h2>
            <p>
                This is an inline <CancelIcon size={SIZE.INLINE} color={COLOR.CURRENT_COLOR} /> Icon adapted to text
                color
            </p>
        </React.Fragment>
    ));
