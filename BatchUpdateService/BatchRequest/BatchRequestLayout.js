import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { lookup } from '../../Util/translations';
import MrcSpinner from '../../Util/MrcSpinner';
import InfoRow from '../../InfoRow';
import BatchRequestAdd from './BatchRequestAdd';
import BatchRequestList from './BatchRequestList';
import ErrorHandler from '../../ErrorHandler';
import BatchRequestTemplateFiles from './BatchRequestTemplateFiles';

export default class BatchRequestLayout extends Component {
    constructor(props) {
        super(props);
        this.props.currentUiPageTitleEvent(lookup('mrc.apps.batchupdate'));
    }

    render() {
        if (!this.props.config) {
            return <MrcSpinner />;
        }
        return (
            <div className="batch-request">
                <InfoRow primary={lookup('mrc.apps.batchupdate')} />
                <ErrorHandler>
                    <BatchRequestAdd allowedCountries={this.props.config.batchUpdateAllowedCountries} />
                </ErrorHandler>
                <ErrorHandler>
                    <BatchRequestList data={this.props.data.data || []} />
                </ErrorHandler>
                <ErrorHandler>
                    <BatchRequestTemplateFiles allowedCountries={this.props.config.batchUpdateAllowedCountries} />
                </ErrorHandler>
            </div>
        );
    }
}

BatchRequestLayout.propTypes = {
    data: PropTypes.any,
    config: PropTypes.any,
    currentUiPageTitleEvent: PropTypes.func,
};
