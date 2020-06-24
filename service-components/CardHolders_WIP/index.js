import React, { Component } from 'react';

import MainContent from '../../MainContent';
import Search from '../../Search';

import './index.scss';

export default class CardHolders extends Component {
    render() {
        return (
            <MainContent>
                <div className="mrc-ui-cardholders">
                    <Search />
                    {'...'}
                </div>
            </MainContent>
        );
    }
}
