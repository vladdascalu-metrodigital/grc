import { connect } from 'react-redux';
import { debounce } from '../Util/index';
import { auxControlEvent, currentUiPageTitleEvent, hideNotification, showError } from '../Util/events';
import './index.scss';
import Search from './Search';
import { lookup } from '../Util/translations';

const CustomerSearch = connect(mapStateToProps, mapDispatchToProps)(Search);

export default CustomerSearch;

function reducerFn(state = {}, action) {
    switch (action.type) {
        case 'CUSTOMERSEARCH_IS_SEARCHING':
            return Object.assign({}, state, { isLoading: action.isLoading });
        case 'SEARCH_RESULT_RECEIVED':
            return Object.assign({}, state, { results: action.results });
        case 'UPDATE_SEARCH_TERM':
            return Object.assign({}, state, { searchTerm: action.term });
        default:
            return state;
    }
}

export const reducer = {
    customerSearch: reducerFn,
};

function mapStateToProps(state) {
    if (state.customerSearch) {
        return {
            isLoading: state.customerSearch.isLoading || false,
            results: state.customerSearch.results || null,
            searchTerm: state.customerSearch.searchTerm || '',
        };
    }
    return {};
}

function mapDispatchToProps(dispatch, props) {
    console.log(props);
    return {
        doSearch: (text, delay = 350) => {
            dispatch(hideNotification());
            if (!text || text.length === 0 || delay < 0) {
                dispatch(resultsReceived(null));
                return;
            }
            return debounce(() => {
                dispatch(isLoading(true));
                let searchUri = `/creditlimit/api/customers?search=${text}&roleKey=${props.match.params.roleKey}`;
                return fetch(encodeURI(searchUri), { credentials: 'include', redirect: 'manual' })
                    .then(resp => {
                        if (resp.redirected || resp.type === 'opaqueredirect') {
                            throw new Error(`${lookup('creditlimit.errors.relogin')} (${resp.status})`);
                        }
                        if (!resp.ok) throw new Error(`${lookup('creditlimit.errors.search')} (${resp.status})`);
                        dispatch(isLoading(false));
                        return resp;
                    })
                    .then(resp => resp.json())
                    .then(results => {
                        dispatch(resultsReceived(results.entries));
                    })
                    .catch(err => {
                        dispatch(isLoading(false));
                        dispatch(showError(err.message || lookup('creditlimit.errors.searchresults')));
                    });
            }, delay);
        },
        updateSearchTerm: value => dispatch(updateSearchTerm(value)),
        updateUiPageTitle: value => dispatch(currentUiPageTitleEvent(value)),
        showAuxControl: value => dispatch(auxControlEvent(value)),
        cleanSearchResult: () => dispatch(resultsReceived(null)),
        hideNotification: () => dispatch(hideNotification()),
    };
}

export function isLoading(bool) {
    return {
        type: 'CUSTOMERSEARCH_IS_SEARCHING',
        isLoading: bool,
    };
}

export function resultsReceived(results) {
    return {
        type: 'SEARCH_RESULT_RECEIVED',
        results,
    };
}

export function updateSearchTerm(value) {
    return {
        type: 'UPDATE_SEARCH_TERM',
        term: value,
    };
}
