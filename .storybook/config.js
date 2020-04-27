import { configure, addDecorator } from '@storybook/react';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers/reducer';
import { HashRouter } from 'react-router-dom';

const store = createStore(reducer);

addDecorator(S => (
    <Provider store={store}>
        <HashRouter>
            <S />
        </HashRouter>
    </Provider>
));

const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
