import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MainContent from '../MainContent';
import Grid from '../Grid';
import DatePicker from '../DatePicker';
import Select from '../Select';

storiesOf('Forms/DatePicker', module)
    .add('DatePicker', () => {
        const [selectedDate, setDate] = useState(new Date());
        const changeHandler = (value) => {
            action('date changed')(value);
            setDate(value);
        };
        return (
            <MainContent>
                <Grid cols="3" alignItems="center" justifyContent="center">
                    <DatePicker
                        label="Datepicker"
                        minDate={new Date()}
                        selected={selectedDate}
                        onChange={changeHandler}
                    />
                </Grid>
            </MainContent>
        );
    })
    .add('DatePicker Delayed Change', () => {
        const [selectedDate, setDate] = useState(new Date());
        const changeHandler = (value) => {
            action('date changed')(value);
            setDate(value);
        };
        return (
            <MainContent>
                <Grid cols="3" alignItems="center" justifyContent="center">
                    <DatePicker
                        label="Datepicker"
                        minDate={new Date()}
                        selected={selectedDate}
                        onChange={changeHandler}
                        onChangeDelayed={(v) => action('date changed delayed')(v)}
                    />
                </Grid>
            </MainContent>
        );
    })
    .add('Required DatePicker', () => {
        const [selectedDate, setDate] = useState(null);
        const changeHandler = (value) => {
            action('date changed')(value);
            setDate(value);
        };
        return (
            <MainContent>
                <DatePicker
                    label="Required Date"
                    required
                    minDate={new Date()}
                    selected={selectedDate}
                    onChange={changeHandler}
                />
            </MainContent>
        );
    })
    .add('Invalid DatePicker by Prop', () => {
        const [selectedDate, setDate] = useState(new Date());
        const changeHandler = (value) => {
            action('date changed')(value);
            setDate(value);
        };
        return (
            <MainContent>
                <Grid cols="3" alignItems="center" justifyContent="center">
                    <DatePicker
                        status="invalid"
                        validationMessages={['mrc.custom.some_message']}
                        minDate={new Date()}
                        selected={selectedDate}
                        onChange={changeHandler}
                    />
                </Grid>
            </MainContent>
        );
    })
    .add('disabled DatePicker', () => {
        const [selectedDate, setDate] = useState(new Date());
        const changeHandler = (value) => {
            action('date changed')(value);
            setDate(value);
        };
        return (
            <MainContent>
                <Grid cols="3" alignItems="center" justifyContent="center">
                    <DatePicker onChange={changeHandler} disabled={true} />
                </Grid>
            </MainContent>
        );
    })
    .add('i18n DatePicker', () => {
        const [selectedDate, setDate] = useState(new Date());
        const [locale, setLocale] = useState(null);
        const changeHandler = (value) => {
            action('date changed')(value);
            setDate(value);
        };
        return (
            <MainContent>
                <Grid cols="3" alignItems="center" justifyContent="center">
                    <Select
                        label="Set Locale"
                        onChange={(locale) => setLocale(locale)}
                        options={[[null, 'NULL'], 'DE', 'ES', 'PT', 'RS', 'RU', 'EN', 'HR', 'RO', 'PK', 'PL']}
                    />
                    <DatePicker locale={locale} label="Choose Date" selected={selectedDate} onChange={changeHandler} />
                </Grid>
            </MainContent>
        );
    });
