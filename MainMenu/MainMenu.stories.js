import React from 'react';
import { storiesOf } from '@storybook/react';
import MainMenu, { MENU_CONTEXT as C } from '../MainMenu';

import navConfig from '../fixtures/config/quickNav';

storiesOf('MainMenu', module)
    .add('Sidebar Context', () => (
        <React.Fragment>
            Background, Width, etc. coming from Context
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
