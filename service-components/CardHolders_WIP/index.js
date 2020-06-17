import React, { Component } from 'react';

import MainContent from '../../MainContent';
import SearchPage from './SearchPage';
import CardHoldersSearch from './CardHoldersSearch';

import './index.scss';

export default class CardHolders extends Component {
    render() {
        return (
            <MainContent>
                <div className="mrc-ui-cardholders">
                    <CardHoldersSearch />
                    <SearchPage />
                </div>
            </MainContent>
        );
    }
}
