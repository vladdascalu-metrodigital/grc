import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers/reducer';
import { HashRouter } from 'react-router-dom';

const store = createStore(reducer);

export const parameters = {
    options: {
        storySort: {
            method: 'alphabetical',
            order: [
                'Intro',
                'Services',
                'Service Components',
                'Fundamentals',
                'Fundamentals/Icons/*',
                'Forms',
                // 'Layouts',
                'App Structure',
                'New UI Topics',
                'Etc',
            ],
        },
    },
    layout: 'fullscreen',
};

export const decorators = [
    (Story) => (
        <Provider store={store}>
            <HashRouter>
                <Story />
            </HashRouter>
        </Provider>
    ),
];
