import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { lookup } from '../../Util/translations';
import { isBlank } from './validation.js';
import DownloadIcon from '../../icons/download-file.svg';
import PdfIcon from '../../icons/pdf.svg';
import ExcelIcon from '../../icons/xls.svg';
import AddExtScore from './addExtScore';
import Bullet, { MODE as BM } from '../../Bullet/index.js';
import MrcNumber from '../../MrcNumber';

export default class Scoring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            historicScores: [],
            showAddExtScorePanel: null,
        };

        props.getScoringData().then((result) => {
            this.setState({ data: result });
        });

        if (!this.props.historicExternalScoreFailed) {
            props.getHistoricScoringData(this.props.requestId).then((result) => {
                this.setState({ historicScores: result });
            });
        }
    }

    render() {
        if (this.state.data && this.state.data.length !== 0) {
            const scoring = this.state.data; // -here will be all the scores
            return (
                <div>
                    <div>
                        {this.createHistoricScoringRetry()}
                        {this.createAddEntryPanel()}
                        {this.createAddExtScorePanel()}
                        {this.createScoringForCustomer(scoring, false)}
                        {this.createHistoricScoring()}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {this.createHistoricScoringRetry()}
                    <h4 className="not-found">{lookup('scoring.data.none-available')}</h4>
                    {this.createHistoricScoring()}
                </div>
            );
        }
    }

    createHistoricScoringRetry() {
        if (this.props.historicExternalScoreFailed) {
            return (
                <div className="mrc-extscore-retry-buttons mrc-btn-group">
                    <p>{lookup('scoring.data.historicExtScoreFailed')}: </p>
                    <button
                        id="mrc-extscore-retry-button"
                        type="button"
                        className="mrc-secondary-button edit"
                        disabled={this.props.disabled}
                        onClick={this.historicExternalScoreRetry}
                    >
                        {lookup('scoring.data.historicExtScoreRetry')}
                    </button>
                </div>
            );
        }
        return null;
    }

    createHistoricScoring() {
        if (this.props.historicExternalScoreFailed) {
            return null;
        }

        return (
            <div>
                {this.state.historicScores && this.state.historicScores.length !== 0 ? (
                    this.createScoringForCustomer(this.state.historicScores, true)
                ) : (
                    <h4 className="not-found">{lookup('scoring.data.historicExtScoreUnavailable')}</h4>
                )}
            </div>
        );
    }

    historicExternalScoreRetry = () => {
        this.props.historicExternalScoreRetry(this.props.approvalId).then((result) => {
            if (result !== undefined && result !== null && !result.historicExternalScoreFailed) {
                this.props.getHistoricScoringData(this.props.requestId).then((scores) => {
                    this.setState({ historicScores: scores });
                });
            }
        });
    };

    addExtScore = (newExtScore) => {
        const scoreData = {
            country: this.props.country,
            storeNumber: this.props.storeNumber,
            customerNumber: this.props.customerNumber,
            requestId: this.props.requestId,
            subject: newExtScore.reportName,
            extScore: {
                score: newExtScore.score,
                customerId: newExtScore.customerId,
                agency: newExtScore.agency,
                limit: newExtScore.limit,
            },
        };

        return this.props.addExtScore(scoreData, newExtScore.report).then((result) => {
            if (result !== undefined) {
                this.setState({
                    data: result,
                });
                this.props.hideScoringError();
                if (scoreData.extScore.agency === 'MCC_SCORE') {
                    this.props.updateValidMccScoreChangedFlag(true);
                }
            }
            return result;
        });
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
                return BM.SUCCES;
            case 'medium':
                return BM.WARNING;
            case 'negative':
                return BM.ERROR;
        }
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

    showRequestedAtInLocaleTime = (requestedAt) => {
        return new Date(requestedAt.toString()).toLocaleString();
    };

    getScoreType = (agency) => {
        if (agency === 'MRC') {
            return 'internal';
        }
        return 'external';
    };

    showAddExtScorePanel = () => {
        this.setState({ showAddExtScorePanel: true });
    };

    hideAddExtScorePanel = () => {
        this.props.hideScoringError();
        this.setState({ showAddExtScorePanel: null });
    };

    createAddEntryPanel = () => {
        if (this.state.showAddExtScorePanel) {
            return null;
        }
        return (
            <div className="tab-actions mrc-scoring-actions">
                <div className="mrc-btn-group">
                    <button
                        type="button"
                        id="addScore"
                        className="mrc-secondary-button edit"
                        disabled={this.props.disabled}
                        onClick={this.showAddExtScorePanel}
                    >
                        {lookup('mrc.scores.button.add')}
                    </button>
                </div>
            </div>
        );
    };

    createAddExtScorePanel = () => {
        if (!this.state.showAddExtScorePanel) {
            return null;
        }
        return (
            <AddExtScore
                country={this.props.country}
                addExtScore={this.addExtScore}
                disabled={this.props.disabled}
                hideAddExtScorePanel={this.hideAddExtScorePanel}
                showScoringError={this.props.showScoringError}
                hideScoringError={this.props.hideScoringError}
            />
        );
    };

    createScoringForCustomer = (scorings, isHistory) => {
        // TODO: check duplicated
        scorings.sort(Scoring.scoringItemsSorter);

        const rows = scorings.map((scoring, index) => {
            if (scoring != null) {
                if (scoring && scoring.errorCode && scoring.errorCode === 'NOT_NEEDED') {
                    return null;
                }
                const scoreAvailable = !(scoring.score == null || scoring.score === '');
                const limitUnavailable = scoring.limit == null || scoring.limit === '';
                const scoreString = !scoreAvailable ? lookup('mrc.scores.scoreunavailable') : scoring.score;
                const limitString = limitUnavailable ? lookup('mrc.scores.limitunavailable') : scoring.limit;
                const status = this.getScoreStatus(scoring.evaluation);
                const noReport = isBlank(scoring.reportPath);
                const requestedAt = scoring.requestedAt;
                const hasInternalScoreReport = scoring.agency === 'MRC' && scoreAvailable;
                return (
                    <tr className={this.getScoreType(scoring.agency)} key={'scoring-' + index}>
                        {noReport ? (
                            <td data-label="Agency">{scoring.agency}</td>
                        ) : (
                            <td data-label="Agency">
                                <a onClick={this.downloadReport.bind(this, scoring)}>{scoring.agency}</a>
                            </td>
                        )}
                        <td data-label="Customer ID">{scoring.customerId}</td>
                        <td data-label="Score">
                            <span className={!scoreAvailable ? 'cell-score span-error' : 'cell-score'}>
                                {scoreAvailable ? <Bullet mode={status} /> : null}
                                {scoreString}
                            </span>
                        </td>
                        <td data-label="Max Limit" className={limitUnavailable ? 'span-error' : ''}>
                            {limitUnavailable ? (
                                limitString
                            ) : (
                                <MrcNumber isCurrency country={this.props.country}>
                                    {limitString}
                                </MrcNumber>
                            )}
                        </td>
                        <td data-label="Requested at">{this.showRequestedAtInLocaleTime(requestedAt)}</td>
                        <td data-label="Uploaded By">{scoring.uploadedBy}</td>
                        {noReport && !hasInternalScoreReport ? (
                            <td data-label="Download" />
                        ) : hasInternalScoreReport ? (
                            <td data-label="Download">
                                <a onClick={this.generateInternalScoreReport.bind(this, scoring, 'excel')}>
                                    <img className="mrc-icon-large" src={ExcelIcon} alt="Excel Report" />
                                </a>
                                <a onClick={this.generateInternalScoreReport.bind(this, scoring, 'pdf')}>
                                    <img className="mrc-icon-large" src={PdfIcon} alt="PDF Report" />
                                </a>
                            </td>
                        ) : (
                            <td data-label="Download">
                                <a className="reportDownloadLink" onClick={this.downloadReport.bind(this, scoring)}>
                                    <img className="mrc-icon-small" src={DownloadIcon} alt="Report File" />
                                </a>
                            </td>
                        )}
                    </tr>
                );
            }
        });

        return (
            <div className="mrc-data-table mrc-scoring-table">
                <table>
                    <caption>{lookup(isHistory ? 'mrc.scores.historicExtScoreData' : 'mrc.scores.scoreData')}</caption>
                    <thead>
                        <tr>
                            <th>{lookup('mrc.scores.table.agency')}</th>
                            <th>{lookup('mrc.scores.table.customerid')}</th>
                            <th>{lookup('mrc.scores.table.score')}</th>
                            <th>{lookup('mrc.scores.table.maxlimit')}</th>
                            <th>{lookup('mrc.scores.table.requestedat')}</th>
                            <th>{lookup('mrc.scores.table.uploadedby')}</th>
                            <th>{lookup('mrc.scores.table.download')}</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    };

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
                return -1;
            }
        } else if (!requestedAt2) {
            return 1;
        }

        try {
            const requestedAtDate1 = new Date(requestedAt1);
            const requestedAtDate2 = new Date(requestedAt2);

            return (+requestedAtDate1 < +requestedAtDate2) - (+requestedAtDate1 > +requestedAtDate2);
        } catch (e) {
            console.error('Error parsing the dates');
        }

        return 0;
    }
}

Scoring.propTypes = {
    data: PropTypes.array,
    ready: PropTypes.bool,
    getScoringData: PropTypes.func,
    approvalId: PropTypes.string,
    getHistoricScoringData: PropTypes.func,
    historicExternalScoreRetry: PropTypes.func,
    addExtScore: PropTypes.func,
    customerNumber: PropTypes.string,
    storeNumber: PropTypes.string,
    requestId: PropTypes.string,
    country: PropTypes.string,
    disabled: PropTypes.bool,
    host: PropTypes.string,
    showScoringError: PropTypes.func,
    hideScoringError: PropTypes.func,
    historicExternalScoreFailed: PropTypes.bool,
    updateValidMccScoreChangedFlag: PropTypes.func,
};
