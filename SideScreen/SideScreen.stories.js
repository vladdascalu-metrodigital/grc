import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SideScreen from '../SideScreen';
import Button from '../Button';

storiesOf('Fundamentals/SideScreen', module)
    .add('SideScreen right', () => {
        let [isShown, setIsShown] = useState(false);
        return (
            <div>
                <Button text="toggle" onClick={() => setIsShown(!isShown)} />
                <SideScreen
                    title="Menu"
                    toggle={() => {
                        setIsShown(!isShown);
                    }}
                    isShown={isShown}
                >
                    content
                </SideScreen>
            </div>
        );
    })
    .add('SideScreen left', () => {
        let [isShown, setIsShown] = useState(false);
        return (
            <div>
                <Button text="toggle" onClick={() => setIsShown(!isShown)} />
                <SideScreen
                    side="left"
                    title="Menu"
                    toggle={() => {
                        setIsShown(!isShown);
                    }}
                    isShown={isShown}
                >
                    content
                </SideScreen>
            </div>
        );
    });
