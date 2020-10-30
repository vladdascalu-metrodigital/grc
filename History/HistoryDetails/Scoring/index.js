import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { lookup } from '../../../Util/translations';

import DownloadIcon from '../../../icons/download-file.svg';
import Bullet, { MODE as BM } from '../../../Bullet';
import { Table } from '../../../Table';
import ExcelIcon from '../../../icons/xls.svg';
import PdfIcon from '../../../icons/pdf.svg';
import MrcNumber from '../../../MrcNumber';
import MrcDateTime from '../../../MrcDateTime';

import './index.scss';

export default class Scoring extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    downloadReport = (scoring) => {
        const url = this.props.host + scoring.reportPath;
        window.open(url, '_blank');
    };

    generateInternalScoreReport = (scoring, fileType) => {
        const internalScoreReportPath = '/scoringservice/api/score/report/{scoreId}/{fileType}';
        const url =
            this.props.host +
            internalScoreReportPath.replace('{scoreId}', scoring.scoreId).replace('{fileType}', fileType);

        window.open(url, '_blank');
    };

    getScoreStatus(value) {
        switch (value) {
            case 'POSITIVE':
                return BM.SUCCESS;
            case 'MEDIUM':
                return BM.WARNING;
            case 'NEGATIVE':
                return BM.ERROR;
            case 'positive':
                return BM.SUCCESS;
            case 'medium':
                return BM.WARNING;
            case 'negative':
                return BM.ERROR;
            default:
                return 'unknown';
        }
    }

    scoring = (scorings, isHistoricExtScores) => {
        const makeScore = (score, scoring) => {
            const scoreAvailable = !(score == null || score === '');
            const scoreString = !scoreAvailable
                ? scoring.agency === 'CMA'
                    ? lookup('cma.scores.scoreunavailable')
                    : lookup('mrc.scores.scoreunavailable')
                : score;
            const status = this.getScoreStatus(scoring.original.evaluation);
            return (
                <span className={!scoreAvailable ? 'cell-score span-error' : 'cell-score'}>
                    {scoreAvailable ? <Bullet mode={status} /> : null}
                    {scoreString}
                </span>
            );
        };

        const makeLimit = (limit, scoring) => {
            const limitUnavailable = limit == null || limit === '';
            const limitString = limitUnavailable
                ? scoring.agency === 'CMA'
                    ? lookup('cma.scores.limitunavailable')
                    : lookup('mrc.scores.limitunavailable')
                : limit;
            return (
                <div className={limitUnavailable ? 'span-error' : ''}>
                    {limitUnavailable ? (
                        limitString
                    ) : (
                        <MrcNumber isCurrency country={this.props.country}>
                            {limitString}
                        </MrcNumber>
                    )}
                </div>
            );
        };

        const makeDownload = (scoring, downloadContent, noContent) => {
            const isBlank = (str) => !str || str === null || /^\s*$/.test(str);
            var noReport = true;
            var scoreAvailable = false;
            var hasInternalScoreReport = false;

            if (scoring && scoring.original) {
                const so = scoring.original;
                noReport = isBlank(so.reportPath);
                scoreAvailable = !isBlank(so.score);
                hasInternalScoreReport = !isBlank(so.agency) && so.agency === 'MRC' && scoreAvailable;
            }

            if (noReport && !hasInternalScoreReport) {
                return noContent;
            } else if (hasInternalScoreReport) {
                return (
                    <div>
                        <a onClick={this.generateInternalScoreReport.bind(this, scoring.original, 'excel')}>
                            <img className="mrc-icon-large" src={ExcelIcon} alt="Excel Report" />
                        </a>
                        <a onClick={this.generateInternalScoreReport.bind(this, scoring.original, 'pdf')}>
                            <img className="mrc-icon-large" src={PdfIcon} alt="PDF Report" />
                        </a>
                    </div>
                );
            } else {
                return <a onClick={this.downloadReport.bind(this, scoring.original)}>{downloadContent}</a>;
            }
        };

        const columns = [
            {
                Header: lookup('mrc.scores.table.agency'),
                accessor: 'agency',
                renderFn: (agency, scoring) =>
                    agency === 'MRC' ? (
                        <span>{agency}</span>
                    ) : (
                        makeDownload(scoring, <span>{agency}</span>, <span>{agency}</span>)
                    ),
            },
            { Header: lookup('mrc.scores.table.customerid'), accessor: 'customerId' },
            { Header: lookup('mrc.scores.table.score'), accessor: 'score', renderFn: makeScore },
            { Header: lookup('mrc.scores.table.maxlimit'), accessor: 'limit', renderFn: makeLimit },
            {
                Header: lookup('mrc.scores.table.requestedat'),
                accessor: 'requestedAt',
                renderFn: (value) => <MrcDateTime>{value}</MrcDateTime>,
            },
            { Header: lookup('mrc.scores.table.uploadedby'), accessor: 'uploadedBy' },
            {
                Header: lookup('mrc.scores.table.download'),
                accessor: 'reportPath',
                renderFn: (reportPath, scoring) => (
                    <div className="reportDownloadLink">
                        {makeDownload(
                            scoring,
                            <img className="mrc-icon-small" src={DownloadIcon} alt="Report File" />,
                            null
                        )}
                    </div>
                ),
            },
        ];

        return (
            <div className="mrc-data-table mrc-scoring-table">
                <h3>
                    {isHistoricExtScores ? lookup('mrc.scores.historicExtScoreData') : lookup('mrc.scores.scoreData')}
                </h3>
                <Table className="mrc-data-table mrc-scoring-table" columns={columns} data={scorings} />
            </div>
        );
    };

    createScores(scores, isHistoricExtScores) {
        if (scores) {
            scores = scores.filter((score) => score && score.errorCode !== 'NOT_NEEDED');
            scores.sort(Scoring.scoringItemsSorter);
        }
        if (_.some(scores)) {
            return this.scoring(scores, isHistoricExtScores);
        } else {
            return (
                <div className="mrc-detail">
                    {isHistoricExtScores
                        ? lookup('scoring.data.historicExtScoreUnavailable')
                        : lookup('scoring.data.none-available')}
                </div>
            );
        }
    }

    // Sort by requestedAt
    static scoringItemsSorter(item1, item2) {
        const requestedAt1 =
            item1 !== undefined && item1 !== null && item1.requestedAt !== null ? item1.requestedAt : undefined;
        const requestedAt2 =
            item2 !== undefined && item2 !== null && item2.requestedAt !== null ? item2.requestedAt : undefined;
        if (!requestedAt1) {
            if (!requestedAt2) {
                return 0;
            } else {
                return 1;
            }
        } else if (!requestedAt2) {
            return -1;
        }

        try {
            const requestedAtDate1 = new Date(requestedAt1);
            const requestedAtDate2 = new Date(requestedAt2);

            return (+requestedAtDate1 < +requestedAtDate2) - (+requestedAtDate1 > +requestedAtDate2);
        } catch (e) {
            console.error('error parsing the dates');
        }

        return 0;
    }

    render() {
        const scores = this.props.scores;
        const historicExtScores = this.props.historicExtScores;
        return (
            <div>
                {this.createScores(scores, false)}
                {this.createScores(historicExtScores, true)}
            </div>
        );
    }
}

Scoring.propTypes = {
    data: PropTypes.array,
    ready: PropTypes.bool,
    disabled: PropTypes.bool,
    host: PropTypes.string,
    scores: PropTypes.array,
    country: PropTypes.string,
    historicExtScores: PropTypes.array,
};
