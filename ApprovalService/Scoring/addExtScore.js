import React, { Component } from 'react';
import { lookup } from '../../Util/translations';
import PropTypes from 'prop-types';
import { validateLimit, validateReportFile, validateScore } from './validation';
import { Agencies } from './agencies.json';

export default class AddExtScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agency: null,
            customerId: null,
            score: null,
            limit: null,
            report: null,
            reportName: null,
            readyToSave: null,
        };
    }

    agencyList(country) {
        return Agencies[country.toLowerCase()];
    }

    render() {
        return (
            <div>
                <div className="tab-actions">
                    <div className="mrc-btn-group">
                        <button
                            type="button"
                            id="saveScore"
                            className="mrc-secondary-button edit"
                            onClick={this.addExtScore}
                            disabled={!this.state.readyToSave || this.props.disabled}
                        >
                            {lookup('mrc.scores.button.save')}
                        </button>
                        <button
                            type="button"
                            id="cancelScore"
                            className="mrc-secondary-button edit"
                            onClick={this.props.hideAddExtScorePanel}
                        >
                            {lookup('mrc.scores.button.cancel')}
                        </button>
                    </div>
                </div>
                <div id="addScoreDataTable" className="mrc-data-table">
                    <table className="edit">
                        <caption></caption>
                        <thead>
                            <tr>
                                <th scope="col">{lookup('mrc.scores.table.agency')}</th>
                                <th scope="col">{lookup('mrc.scores.table.customerid')}</th>
                                <th scope="col">{lookup('mrc.scores.table.score')}</th>
                                <th scope="col">{lookup('mrc.scores.table.maxlimit')}</th>
                            </tr>
                        </thead>
                        <tbody className="edit mrc-add-score">
                            <tr>
                                <td data-label="Agency*">
                                    <div className="m-input m-input-name">
                                        <div className="m-input-elementWrapper">{this.createAgenciesSelect()}</div>
                                    </div>
                                </td>
                                <td data-label="Customer ID*">
                                    <div className="m-input m-input-name">
                                        <div className="m-input-elementWrapper">
                                            <input
                                                type="text"
                                                id="inputcustomerid"
                                                name="name"
                                                className="m-input-element extra-class-on-input-tag"
                                                aria-readonly="false"
                                                aria-required="false"
                                                onChange={this.handleCustomerIdChange}
                                                value={this.state.customerId ? this.state.customerId : ''}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="Score*">
                                    <div className="m-input m-input-name">
                                        <div className="m-input-elementWrapper">
                                            <input
                                                type="text"
                                                id="inputscore"
                                                name="name"
                                                className="m-input-element extra-class-on-input-tag"
                                                aria-readonly="false"
                                                aria-required="false"
                                                onChange={this.handleScoreChange}
                                                value={this.state.score ? this.state.score : ''}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="Max Limit*">
                                    <div className="m-input m-input-name">
                                        <div className="m-input-elementWrapper">
                                            <input
                                                type="text"
                                                id="inputmaxlimit"
                                                name="name"
                                                className="m-input-element extra-class-on-input-tag"
                                                aria-readonly="false"
                                                aria-required="false"
                                                onChange={this.handleLimitChange}
                                                value={this.state.limit ? this.state.limit : ''}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="">
                                    <input
                                        type="file"
                                        ref={(input) => {
                                            this.reportInput = input;
                                        }}
                                        accept=".pdf"
                                        className="reportFileInput"
                                        onChange={this.handleReportUpload}
                                    />
                                    <button
                                        type="button"
                                        ref={(input) => {
                                            this.reportButton = input;
                                        }}
                                        className="mrc-ghost-button uploadReportButton"
                                        onClick={this.handleUploadButtonClick}
                                    >
                                        {lookup('mrc.scores.button.upload')}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="m-selected-file">
                        <p className="scoringFileName">
                            {lookup('mrc.scores.label.selectedFileName')}: {this.state.reportName}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    createAgenciesSelect = () => {
        return (
            <select
                id="selectagency"
                className="mrc-selectagency"
                name="name"
                aria-readonly="false"
                aria-required="false"
                onChange={this.handleAgencyChange}
                value={this.state.agency ? this.state.agency : ''}
            >
                {this.createAgencyOptions()}
            </select>
        );
    };

    createAgencyOptions = () => {
        return [
            <option key="" value="">
                Please Choose...
            </option>,
        ].concat(
            this.agencyList(this.props.country).map((agency) => {
                return (
                    <option key={agency.key} value={agency.value}>
                        {agency.label}
                    </option>
                );
            })
        );
    };

    resetValues = () => {
        this.setState({
            agency: null,
            customerId: null,
            score: null,
            limit: null,
            report: null,
            reportName: null,
            readyToSave: null,
        });
    };

    handleReportUpload = (e) => {
        const maxFilNameLength = 50;
        const reportFile = e.target.files[0];
        const reportFileName = this.shortenFileName(e.target.files[0].name, maxFilNameLength);
        if (reportFile) {
            if (validateReportFile(reportFile, this.props.country)) {
                this.setState({ report: reportFile });
                this.setState({ reportName: reportFileName });
                this.reportButton.classList.add('reportUploaded');
                this.props.hideScoringError();
            } else {
                this.setState({ report: null });
                this.setState({ reportName: null });
                this.props.showScoringError('approval.error.scores.maxReportSize');
                this.reportButton.classList.remove('reportUploaded');
            }
        }
    };

    shortenFileName = (name, maxLength) => {
        let array = name.split('.');
        let result = '';
        let ext = '';

        if (array.length >= 2) {
            ext = array[array.length - 1];
            result = name.substring(0, name.length - ext.length - 1);
        } else {
            result = name;
        }

        result = result.substring(0, maxLength);

        if (ext.length > 0) {
            result += '.' + ext;
        }

        return result;
    };

    handleUploadButtonClick = () => {
        this.reportInput.click();
    };

    handleScoreChange = (e) => {
        const value = e.target.value;
        const selectedAgency = this.state.agency;
        this.setState({ score: value });
        if (
            validateLimit(this.state.limit, this.props.country) &&
            validateScore(selectedAgency, value, this.props.country)
        ) {
            this.setState({ readyToSave: true });
        } else {
            this.setState({ readyToSave: false });
        }
    };

    handleAgencyChange = (e) => {
        const value = e.target.value;
        if (this.state.agency != null && this.state.agency !== '' && value !== this.state.agency) {
            this.setState({
                agency: value,
                customerId: null,
                limit: null,
                score: null,
                report: null,
                reportName: null,
                readyToSave: false,
            });
            return;
        }

        this.setState({ agency: value, readyToSave: false });
    };

    handleLimitChange = (e) => {
        const value = e.target.value;
        this.setState({ limit: value });
        if (
            validateLimit(value, this.props.country) &&
            validateScore(this.state.agency, this.state.score, this.props.country)
        ) {
            this.setState({ readyToSave: true });
        } else {
            this.setState({ readyToSave: false });
        }
    };

    handleCustomerIdChange = (e) => {
        const value = e.target.value;
        this.setState({ customerId: value });
    };

    addExtScore = () => {
        let newExtScore = {
            agency: this.state.agency,
            customerId: this.state.customerId,
            score: this.state.score,
            limit: this.state.limit,
            report: this.state.report,
            reportName: this.state.reportName,
        };
        this.props.addExtScore(newExtScore).then((result) => {
            if (result !== undefined) {
                this.setState({
                    agency: null,
                    customerId: null,
                    score: null,
                    limit: null,
                    report: null,
                    reportName: null,
                    readyToSave: null,
                });
                this.reportButton.classList.remove('reportUploaded');
            }
        });
    };
}

AddExtScore.propTypes = {
    country: PropTypes.string,
    addExtScore: PropTypes.func,
    disabled: PropTypes.bool,
    hideAddExtScorePanel: PropTypes.func,
    showScoringError: PropTypes.func,
    hideScoringError: PropTypes.func,
};
