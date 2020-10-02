import React from 'react';
import { storiesOf } from '@storybook/react';
import MainMenu, { MENU_CONTEXT as C } from '../MainMenu';

import navConfig from '../fixtures/config/quickNav';

storiesOf('App Structure/MainMenu', module)
    .add('Sidebar Context', () => (
        <React.Fragment>
            Background, Width, etc. coming from parent component
            <div style={{ background: 'blue' }}>
                <MainMenu
                    activeItem="inbox"
                    updateActiveItem={(v) => action('updateActiveItem')(v)}
                    config={navConfig}
                    context={C.SIDEBAR}
                />
            </div>
        </React.Fragment>
    ))
    .add('Sidescreen Context', () => (
        <MainMenu
            activeItem="inbox"
            updateActiveItem={(v) => action('updateActiveItem')(v)}
            config={navConfig}
            context={C.SIDESCREEN}
        />
    ));
