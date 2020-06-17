import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { SIZE as ISIZE } from '../../icons/index';
import SearchIcon from '../../icons/SearchIcon';

import './CardHoldersSearch.scss';

export default class CardHoldersSearch extends PureComponent {
    render() {
        let { showBackButton } = this.props;
        return (
            <div className="mrc-ui-cardholders-search">
                {showBackButton && <div className="mrc-ui-cardholders-search-back-button"></div>}
                <input className="mrc-ui-cardholders-search-input" type="text" />
                <button type="button">clear</button>
                <div>
                    <SearchIcon size={ISIZE.XSMALL} />
                </div>
            </div>
        );
    }
}

CardHoldersSearch.propTypes = {
    showBackButton: PropTypes.bool,
    onEnterSearch: PropTypes.func,
};
