import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COLOR, SIZE } from '../icons/index';
import SearchIcon from '../icons/SearchIcon';

import './index.scss';

export default class Search extends Component {
    handleChange(e) {
        let { onChange } = this.props;
        if (onChange) onChange(e.target.value);
    }

    handleEnterSearch(e) {
        let { onEnterSearch } = this.props;
        if (e.keyCode == 13) onEnterSearch(e.target.value);
    }

    render() {
        let { placeholder } = this.props;
        return (
            <div className="mrc-ui-search">
                <input
                    onKeyUp={this.handleEnterSearch.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    className="mrc-ui-search-input"
                    type="text"
                    placeholder={placeholder}
                />
                <div className="mrc-ui-search-icon">
                    <SearchIcon size={SIZE.XSMALL} fill={COLOR.NEUTRAL} />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onChange: PropTypes.func,
    onEnterSearch: PropTypes.func,
    placeholder: PropTypes.string,
};
