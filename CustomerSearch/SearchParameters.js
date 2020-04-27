import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MrcSpinner from '../Util/MrcSpinner';
import SearchIcon from '../icons/search-white.svg';

export default class SearchParameters extends Component {
    handleTextChange = event => {
        this.props.updateSearchTerm(event.target.value);
        this.props.doSearch(event.target.value);
    };

    handleSubmit = event => {
        event.preventDefault();
        let searchTerm = document.querySelectorAll('.mrc-search input')[0].value;
        this.props.doSearch(searchTerm, 0);
    };

    createSpinnerIfLoading() {
        return this.props.isLoading ? (
            <div className="spinner-wrapper">
                <MrcSpinner />
            </div>
        ) : null;
    }

    render() {
        const { searchTerm, textPlaceholder } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset className="mrc-searchbar">
                    <div className="mrc-search mrc-input">
                        <div className="mrc-input">
                            <div className="m-input m-input-name">
                                <div className="m-input-elementWrapper">
                                    <input
                                        id="search-input"
                                        value={searchTerm}
                                        className="m-input-element extra-class-on-input-tag"
                                        type="search"
                                        autoFocus
                                        placeholder={textPlaceholder}
                                        onChange={this.handleTextChange}
                                    />
                                    <div className="mrc-icon-label">
                                        <label htmlFor="search-input">
                                            <img
                                                className="mrc-icon-base search-icon"
                                                src={SearchIcon}
                                                alt="Search Icon"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {this.createSpinnerIfLoading()}
                    </div>
                </fieldset>
            </form>
        );
    }
}

SearchParameters.propTypes = {
    doSearch: PropTypes.func.isRequired,
    updateSearchTerm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    textPlaceholder: PropTypes.string,
    searchTerm: PropTypes.string,
    error: PropTypes.string,
};
