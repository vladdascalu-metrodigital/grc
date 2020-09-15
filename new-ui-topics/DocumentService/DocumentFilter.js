import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../../Util/translations';

import {
    timePeriodFilters,
    fileTypeFilters,
    docTypeFilters,
    validFilter,
    filterArrayPropType,
    _filterName,
    _filterContext,
} from './documentFilterObjects';

import { formatDate } from '../../MrcDate';
import Pill from '../../Pill';
import { FlexRow } from '../../Flex';
import DocumentFilterTimePeriod from './DocumentFilterTimePeriod';
import DocumentFilterSelection from './DocumentFilterSelection';
import DocumentFilterBoolean from './DocumentFilterBoolean';

import './DocumentFilter.scss';

export default class DocumentFilter extends Component {
    constructor(props) {
        super(props);
        this.setFilters = this.setFilters.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.state = {};
        this.initialState = {
            [_filterContext.FILETYPE_FILTER]: [],
            [_filterContext.DOCTYPE_FILTER]: [],
            [_filterContext.TIMEPERIOD_FILTER]: [],
            [_filterContext.VALID_FILTER]: [],
        };
        this.state = {
            ...this.initialState,
        };
    }

    setFilters(filters, filterContext) {
        filters = filters || [];
        this.setState(
            {
                [filterContext]: filters,
            },
            this.changedFiltersCallback
        );
    }

    removeFilter(removeFilterName, filterContext) {
        let newFilters = this.state[filterContext].filter((f) => f.name !== removeFilterName);
        this.setState(
            {
                [filterContext]: newFilters,
            },
            this.changedFiltersCallback
        );
    }

    clearFilters() {
        this.setState(
            {
                ...this.initialState,
            },
            this.changedFiltersCallback
        );
    }

    changedFiltersCallback() {
        if (this.props.onChange) {
            this.props.onChange(this.mergedFilters);
        }
    }

    get mergedFilters() {
        return [
            ...this.state[_filterContext.TIMEPERIOD_FILTER],
            ...this.state[_filterContext.FILETYPE_FILTER],
            ...this.state[_filterContext.DOCTYPE_FILTER],
            ...this.state[_filterContext.VALID_FILTER],
        ];
    }

    render() {
        return (
            <div className="mrc-ui-documentfilter">
                <h2>Filter</h2>
                <div className="mrc-ui-documentfilter-filterarea">
                    <FlexRow flexWrap="wrap" leading="small" gap="small" alignItems="center">
                        <DocumentFilterTimePeriod
                            fromDateFilter={
                                timePeriodFilters.filter((f) => f.name === _filterName.TIMEPERIOD_FILTER_FROM)[0]
                            }
                            toDateFilter={
                                timePeriodFilters.filter((f) => f.name === _filterName.TIMEPERIOD_FILTER_TO)[0]
                            }
                            activeFilters={this.state[_filterContext.TIMEPERIOD_FILTER]}
                            onConfirm={(filters) => this.setFilters(filters, _filterContext.TIMEPERIOD_FILTER)}
                            buttonText={lookup('mrc.timePeriod')}
                            modalTitle={lookup('mrc.documents.addTimePeriodFilter')}
                        />
                        <DocumentFilterSelection
                            options={fileTypeFilters}
                            selectedFilters={this.state[_filterContext.FILETYPE_FILTER]}
                            onConfirm={(filterSelection) =>
                                this.setFilters(filterSelection, _filterContext.FILETYPE_FILTER)
                            }
                            buttonText={lookup('mrc.fileType')}
                            modalTitle={lookup('mrc.documents.addFileTypeFilter')}
                        />
                        <DocumentFilterSelection
                            options={docTypeFilters}
                            selectedFilters={this.state[_filterContext.DOCTYPE_FILTER]}
                            onConfirm={(filterSelection) =>
                                this.setFilters(filterSelection, _filterContext.DOCTYPE_FILTER)
                            }
                            buttonText={lookup('mrc.docType')}
                            modalTitle={lookup('mrc.documents.addDocTypeFilter')}
                        />
                        <DocumentFilterBoolean
                            option={validFilter}
                            selectedFilter={this.state[_filterContext.VALID_FILTER]}
                            onConfirm={(filter) => this.setFilters(filter, _filterContext.VALID_FILTER)}
                            buttonText={lookup('mrc.validDocuments')}
                        />
                        <a className="mrc-ui-documentfilter-clear" onClick={this.clearFilters}>
                            clear filter
                        </a>
                    </FlexRow>
                    <hr />
                    <FlexRow flexWrap="wrap" gap="small" leading="small">
                        {this.mergedFilters.map((f, k) => {
                            switch (f.context) {
                                case _filterContext.TIMEPERIOD_FILTER:
                                    return (
                                        <Pill
                                            key={k}
                                            type="success"
                                            title={f.label}
                                            text={formatDate(f.value)}
                                            onRemove={() => this.removeFilter(f.name, f.context)}
                                        />
                                    );
                                default:
                                    return (
                                        <Pill
                                            key={k}
                                            type="success"
                                            text={f.displayName}
                                            onRemove={() => this.removeFilter(f.name, f.context)}
                                        />
                                    );
                            }
                        })}
                    </FlexRow>
                </div>
            </div>
        );
    }
}

DocumentFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    allFilters: PropTypes.shape({
        timePeriodFilters: filterArrayPropType.isRequired,
        fileTypeFilters: filterArrayPropType.isRequired,
        docTypeFilters: filterArrayPropType.isRequired,
    }),
};
