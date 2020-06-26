import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extract, extractJoinedProps } from '../Util/util.js';
import { lookup } from '../Util/translations';
import { Link } from 'react-router-dom';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.cleanSearchResult();
    }

    extractCustomerName(items) {
        return extractJoinedProps(items, ['names', 'customer', 'firstName'], ['names', 'customer', 'lastName']);
    }

    extractCompanyOwnerName(items) {
        return extractJoinedProps(items, ['names', 'companyOwner', 'firstName'], ['names', 'companyOwner', 'lastName']);
    }

    buildDisplayName(items) {
        if (!items || items.length === 0) return '';
        const customerName = this.extractCustomerName(items);
        const companyOwnerName = this.extractCompanyOwnerName(items);

        if (!customerName) {
            if (!companyOwnerName) {
                return null;
            } else {
                return companyOwnerName;
            }
        } else if (!companyOwnerName) {
            return customerName;
        } else {
            return customerName + ', ' + companyOwnerName;
        }
    }

    buildDisplayCountry(item) {
        if (!item || item.length === 0) return '';
        let result = extract(item, ['customerId', 'country']) || '';
        return result.toUpperCase();
    }

    buildDisplayCustomerNr(item) {
        if (!item || item.length === 0) return '';
        return extract(item, ['customerId', 'customerNumber']) || '';
    }

    buildDisplayStoreNr(item) {
        if (!item || item.length === 0) return '';
        return extract(item, ['customerId', 'storeNumber']) || null;
    }

    buildDisplayVatNumber(item, key, label) {
        if (!item || item.length === 0) return '';

        let vatNumber = extract(item, [key]);

        if (vatNumber && vatNumber.length > 0) {
            return (
                <h2>
                    <span className="vat-number">
                        {label}: {vatNumber}
                    </span>
                </h2>
            );
        }
        return null;
    }

    buildDisplayVatSpecNumber(item) {
        return this.buildDisplayVatNumber(item, 'vatSpecNumber', 'VAT');
    }

    buildDisplayVatEuNumber(item) {
        return this.buildDisplayVatNumber(item, 'vatEuNumber', 'VAT EU');
    }

    buildSummary(result) {
        let showingText;
        if (!result) {
            return;
        }
        if (result.length === 0) {
            showingText = lookup('search.result.notfound');
            return (
                <li key="summary" className="result-summary">
                    <span>{showingText}</span>
                </li>
            );
        } else if (result.length > 0) {
            showingText =
                result.length +
                ' ' +
                (result.length < 2 ? lookup('creditlimit.search.result') : lookup('creditlimit.search.results'));
            return (
                <li key="summary" className="result-summary">
                    <span>{showingText}</span>
                </li>
            );
        }
        return null;
    }

    createResultItem = (result) => {
        const name = this.buildDisplayName(result);
        const country = this.buildDisplayCountry(result);
        const customerNumber = this.buildDisplayCustomerNr(result);
        const storeNumber = this.buildDisplayStoreNr(result);
        const vatSpecNumber = this.buildDisplayVatSpecNumber(result);
        const vatEuNumber = this.buildDisplayVatEuNumber(result);

        const unknownName = 'Unknown name';
        const displayName = name || <i className="hint">{unknownName}</i>;

        const resultHref = decodeURIComponent(this.props.template)
            .replace('{country}', country)
            .replace('{storeNumber}', storeNumber)
            .replace('{customerNumber}', customerNumber);
        const isAbsolute = resultHref.startsWith('http');
        const linkContent = (
            <div>
                <h1>
                    {displayName}, {country}
                </h1>
                <h2>
                    {storeNumber}/{customerNumber}
                </h2>
                {vatSpecNumber}
                {vatEuNumber}
            </div>
        );
        return (
            <li key={result.id}>
                {isAbsolute ? (
                    <a className="no-underline" href={resultHref}>
                        {linkContent}
                    </a>
                ) : (
                    <Link className="no-underline" to={resultHref}>
                        {linkContent}
                    </Link>
                )}
            </li>
        );
    };

    render() {
        const searchResult = this.props.results;

        return (
            <section className="mrc-search-result">
                <ul>
                    {this.buildSummary(searchResult)}
                    {}
                    {searchResult ? searchResult.map(this.createResultItem) : null}
                </ul>
            </section>
        );
    }
}

SearchResult.propTypes = {
    results: PropTypes.array,
    cleanSearchResult: PropTypes.func.isRequired,
    template: PropTypes.string.isRequired,
};
