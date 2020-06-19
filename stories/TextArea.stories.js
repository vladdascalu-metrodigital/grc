import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextArea from '../TextArea';
import MainContent from '../MainContent';

storiesOf('Forms/TextArea', module)
    .add('Textarea', () => {
        let [textValue, setTextValue] = useState('foobar');
        const handleChange = (value) => {
            action('textarea change')(value);
            setTextValue(value);
        };
        return (
            <MainContent>
                <TextArea label="Write Your Story" value={textValue} onChange={handleChange} />
            </MainContent>
        );
    })
    .add('Textarea Delayed', () => {
        let [textValue, setTextValue] = useState('foobar');
        const handleChange = (value) => {
            action('textarea change')(value);
            setTextValue(value);
        };
        return (
            <MainContent>
                <TextArea
                    label="Write Your Story"
                    value={textValue}
                    onChange={handleChange}
                    onChangeDelayed={(v) => action('textarea change delayed')(v)}
                />
            </MainContent>
        );
    })
    .add('Invalid By Prop & Required', () => {
        let [textValue, setTextValue] = useState('');
        const handleChange = (value) => {
            action('textarea change')(value);
            setTextValue(value);
        };
        return (
            <MainContent>
                <TextArea
                    required
                    value={textValue}
                    onChange={handleChange}
                    onValidChange={(v) => {
                        action('valid change')(v);
                    }}
                    status={'invalid'}
                    validationMessages={['mrc.forms.some_custom_message']}
                />
            </MainContent>
        );
    })
    .add('Disabled Textarea', () => {
        return (
            <MainContent>
                <TextArea disabled value="Lorem Ipsum" />
            </MainContent>
        );
    });
