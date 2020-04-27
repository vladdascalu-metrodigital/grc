import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import SearchParameters from './SearchParameters';
import InfoRow from '../InfoRow';
import Modernizr from 'modernizr';
import { lookup } from '../Util/translations';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.props.showAuxControl({ back: false });
        this.state = {};
    }

    componentDidMount() {
        const appName = this.getServiceTitle();
        const isTabletOrLarger = Modernizr.mq('(min-width: 768px)');
        this.setState({ isTabletOrLarger: isTabletOrLarger });
        this.setState(() => {
            this.props.updateUiPageTitle(lookup(appName));
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const appName = this.getServiceTitle();
        const isTabletOrLarger = Modernizr.mq('(min-width: 768px)');

        const previousServiceToSearchIn = prevProps.match.params.roleKey;
        const serviceToSearchIn = this.props.match.params.roleKey;

        if (serviceToSearchIn !== previousServiceToSearchIn) {
            this.props.cleanSearchResult();
            this.props.updateSearchTerm('');
        }

        this.setState(() => {
            this.props.updateUiPageTitle(lookup(appName));
        });
        if (prevState.isTabletOrLarger != isTabletOrLarger) {
            this.setState({ isTabletOrLarger: isTabletOrLarger });
        }
    }

    componentWillUnmount() {
        this.props.hideNotification();
        this.props.cleanSearchResult();
        this.props.updateSearchTerm('');
    }

    getServiceTitle() {
        const roleKey = this.props.match.params.roleKey;
        return lookup('mrc.apps.' + roleKey.toLowerCase());
    }

    render() {
        const { cleanSearchResult, doSearch, isLoading, match, results, searchTerm, updateSearchTerm } = this.props;
        const appName = this.getServiceTitle();
        const infoRow = this.state.isTabletOrLarger ? <InfoRow primary={appName} /> : null;

        return (
            <div className="search">
                {infoRow}
                <SearchParameters
                    doSearch={doSearch}
                    updateSearchTerm={updateSearchTerm}
                    searchTerm={searchTerm}
                    isLoading={isLoading}
                    textPlaceholder={lookup('creditlimit.search.placeholder')}
                />
                <SearchResult
                    results={results}
                    cleanSearchResult={cleanSearchResult}
                    template={match.params.template}
                />
            </div>
        );
    }
}

Search.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    doSearch: PropTypes.func.isRequired,
    updateSearchTerm: PropTypes.func.isRequired,
    updateUiPageTitle: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    hideNotification: PropTypes.func.isRequired,
    results: PropTypes.array,
    searchTerm: PropTypes.string,
    cleanSearchResult: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};
