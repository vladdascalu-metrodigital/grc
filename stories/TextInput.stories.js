import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from '../TextInput';

storiesOf('Forms/TextInput', module)
    .add('Text Input', () => {
        let [textValue, setTextValue] = useState('foobar');
        return (
            <div style={{ display: 'grid', gridGap: '1rem' }}>
                <TextInput
                    label="The Most Basic Input"
                    value={textValue}
                    onChange={(value) => {
                        setTextValue(value);
                        action('on changed text')(value);
                    }}
                />
            </div>
        );
    })
    .add('Required & Invalid by Prop', () => {
        let [textValue, setTextValue] = useState('');
        return (
            <div style={{ display: 'grid', gridGap: '1rem' }}>
                <TextInput
                    required
                    status="invalid"
                    validationMessages={['mrc.custom.message']}
                    value={textValue}
                    onChange={(value) => {
                        setTextValue(value);
                        action('on changed text')(value);
                    }}
                    onValidChange={(v) => {
                        action('validation change')(v);
                    }}
                />
            </div>
        );
    })
    .add('Delayed onChange', () => {
        let [textValue, setTextValue] = useState('');
        return (
            <div style={{ display: 'grid', gridGap: '1rem' }}>
                <TextInput
                    label="Text Input With Custom 2s Delay"
                    value={textValue}
                    onChange={(value) => {
                        setTextValue(value);
                        action('on changed text')(value);
                    }}
                    onChangeDelayed={(v) => action('on change delayed')(v)}
                    changeDelay={2000}
                    onValidChange={(v) => {
                        action('validation change')(v);
                    }}
                />
            </div>
        );
    })
    .add('Disabled Text Input', () => {
        return (
            <div style={{ display: 'grid', gridGap: '1rem' }}>
                <TextInput disabled value="Humpty Dumpty" />
            </div>
        );
    });
