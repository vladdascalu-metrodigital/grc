import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Table } from '../../Table';
import { lookup } from '../../Util/translations';
import {
    BATCH_REQUEST_TYPE_CREDIT_CORRECTION,
    BATCH_REQUEST_STATUS_IN_PROGRESS,
    BATCH_REQUEST_STATUS_NEW,
    BACKEND_BATCH_REQUEST_CONTEXT,
    BATCH_REQUEST_STATUS_WITH_ERROR,
} from '../util/Constants';
import CreditcorrectionIcon from '../../icons/credit-correction-blue.svg';
import DownloadIcon from 'mrc-component-library/public/icons/download-file.svg';
import { connect } from 'react-redux';
import { cancelProcess, deleteProcess, fetchBatchRequests, startProcess } from './service';

class BatchRequestList extends Component {
    constructor(props) {
        super(props);
    }

    getTypeIcon(type) {
        switch (type) {
            case BATCH_REQUEST_TYPE_CREDIT_CORRECTION:
                return <img className="type-icon" src={CreditcorrectionIcon} alt={type} />;
            default:
                return <img src={CreditcorrectionIcon} alt={type} />;
        }
    }

    getCountryCanStart(data) {
        const countryCanStart = {};
        data.forEach((batchRequest) => {
            if (countryCanStart[batchRequest.country] === undefined) {
                countryCanStart[batchRequest.country] = true;
            }
            if (batchRequest.status === BATCH_REQUEST_STATUS_IN_PROGRESS) {
                countryCanStart[batchRequest.country] = false;
            }
        });
        return countryCanStart;
    }

    generateTextAndDownloadLink(text, url) {
        const fullUrl = window.location.origin + BACKEND_BATCH_REQUEST_CONTEXT + '/' + url;

        return (
            <span onClick={() => window.open(fullUrl, '_blank')}>
                {text}
                <a className="downloadLink">
                    <img className="mrc-icon-small" src={DownloadIcon} alt="Download file" />
                </a>
            </span>
        );
    }

    generateActions(id, originalBatchRequest, countryCanStartMap) {
        let startButton = null;
        let cancelButton = null;
        let deleteButton = null;
        if (
            countryCanStartMap[originalBatchRequest.country] &&
            originalBatchRequest.status === BATCH_REQUEST_STATUS_NEW
        ) {
            startButton = (
                <button
                    type="button"
                    className="mrc-btn mrc-primary-button mrc-ui-button-small"
                    onClick={() => {
                        this.props.startProcess(id).then(() => {
                            this.props.fetchBatchRequests();
                        });
                    }}
                >
                    {lookup('mrc.start')}
                </button>
            );
        }
        if (originalBatchRequest.status === BATCH_REQUEST_STATUS_IN_PROGRESS) {
            cancelButton = (
                <button
                    type="button"
                    className="mrc-btn mrc-primary-button mrc-ui-button-small"
                    onClick={() => {
                        this.props.cancelProcess(id).then(() => {
                            this.props.fetchBatchRequests();
                        });
                    }}
                >
                    {lookup('mrc.cancel')}
                </button>
            );
        }
        if (
            originalBatchRequest &&
            originalBatchRequest.status &&
            (originalBatchRequest.status === BATCH_REQUEST_STATUS_NEW ||
                (originalBatchRequest.status === BATCH_REQUEST_STATUS_WITH_ERROR &&
                    (!originalBatchRequest.processEndDate || originalBatchRequest.processEndDate === null)))
        ) {
            deleteButton = (
                <button
                    type="button"
                    className="mrc-btn mrc-primary-button mrc-ui-button-small"
                    onClick={() => {
                        this.props.deleteProcess(id).then(() => {
                            this.props.fetchBatchRequests();
                        });
                    }}
                >
                    {lookup('mrc.delete')}
                </button>
            );
        }

        return (
            <div className="action-buttons">
                {startButton}
                {cancelButton}
                {deleteButton}
            </div>
        );
    }

    render() {
        const data = this.props.data || [];
        const countryCanStartMap = this.getCountryCanStart(data);

        const columns = [
            { Header: '', accessor: 'type', renderFn: (type) => this.getTypeIcon(type), customWidth: '50px' },
            { Header: lookup('mrc.batchupdate.country'), accessor: 'country', customWidth: '100px' },
            {
                Header: lookup('mrc.batchupdate.fileName'),
                accessor: 'uploadFileName',
                renderFn: (uploadFileName, batchRequest) =>
                    this.generateTextAndDownloadLink(uploadFileName, batchRequest.original.id + '/downloadOriginal'),
            },
            { Header: lookup('mrc.batchupdate.uploadUser'), accessor: 'uploadUser' },
            {
                Header: lookup('mrc.batchupdate.uploadDate'),
                accessor: 'uploadDate',
                renderFn: (date) => (date !== null && date !== undefined ? new Date(date).toLocaleString() : null),
                customWidth: '150px',
            },
            {
                Header: lookup('mrc.batchupdate.processStartDate'),
                accessor: 'processStartDate',
                renderFn: (date) => (date !== null && date !== undefined ? new Date(date).toLocaleString() : null),
                customWidth: '150px',
            },
            {
                Header: lookup('mrc.batchupdate.processEndDate'),
                accessor: 'processEndDate',
                renderFn: (date) => (date !== null && date !== undefined ? new Date(date).toLocaleString() : null),
                customWidth: '150px',
            },
            {
                Header: lookup('mrc.batchupdate.status'),
                accessor: 'status',
                renderFn: (status, batchRequest) =>
                    this.generateTextAndDownloadLink(
                        lookup('mrc.batchupdate.status.' + status),
                        batchRequest.original.id + '/downloadProcessed'
                    ),
                customWidth: '100px',
            },
            {
                Header: lookup('mrc.batchupdate.actions'),
                accessor: 'id',
                renderFn: (id, batchRequest) => this.generateActions(id, batchRequest.original, countryCanStartMap),
            },
        ];

        return (
            <div className="batch-request-list mrc-detail">
                <div>
                    <Table columns={columns} data={data} className="mrc-data-table" />
                </div>
            </div>
        );
    }
}

BatchRequestList.propTypes = {
    data: PropTypes.any,
    startProcess: PropTypes.func,
    cancelProcess: PropTypes.func,
    deleteProcess: PropTypes.func,
    fetchBatchRequests: PropTypes.func,
};

export default connect(null, function (dispatch) {
    return {
        startProcess: (id) => startProcess(dispatch, id),
        cancelProcess: (id) => cancelProcess(dispatch, id),
        deleteProcess: (id) => deleteProcess(dispatch, id),
        fetchBatchRequests: () => fetchBatchRequests(dispatch),
    };
})(BatchRequestList);
