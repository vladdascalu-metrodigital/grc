import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadBatchRequest } from './service';
import FileUpload from '../../FileUpload';
import { lookup } from '../../Util/translations';
import { MAX_UPLOAD_FILE_SIZE, BATCH_REQUEST_AVAILABLE_TYPES } from '../util/Constants';

class BatchRequestAddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            batchTypes: BATCH_REQUEST_AVAILABLE_TYPES,
            batchType: BATCH_REQUEST_AVAILABLE_TYPES[0],
            country:
                props.allowedCountries && props.allowedCountries.length > 0 ? props.allowedCountries[0] : undefined,
            fileTooBig: false,
        };
    }

    save = () => {
        this.setState({ loading: true });
        return this.props.upload(this.state.country, this.state.file, this.state.title, this.state.batchType).then(
            () => this.finish(true),
            () => this.finish()
        );
    };

    finish = (withRefresh) => {
        this.setState(() => ({
            title: undefined,
            file: undefined,
            loading: false,
        }));
        this.props.finish(withRefresh);
    };

    validForm = () => {
        if (!this.state.country || !this.state.file || !this.state.title || !this.state.batchType) {
            return false;
        }

        return !this.state.fileTooBig;
    };

    shortenFileName = (name, maxLength) => {
        if (name === undefined || name === null) {
            return '';
        }

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

    updateFile = (file) => {
        if (file.size > MAX_UPLOAD_FILE_SIZE) {
            this.setState({ fileTooBig: true });
            return false;
        }
        if (this.state.title && this.state.title.trim().length > 0) {
            this.setState({ ...this.state, fileTooBig: false, file: file });
        } else {
            this.setState({ ...this.state, fileTooBig: false, title: file.name, file: file });
        }
    };

    showErrorFileTooBig() {
        if (this.state.fileTooBig) {
            return (
                <div className="row">
                    <h2 className="red-warning">{lookup('mrc.batchupdate.fileTooBig.20mb')}</h2>
                </div>
            );
        }
        return null;
    }

    showTitle() {
        return (
            <div className="row">
                <div className="column">
                    <label>
                        {lookup('mrc.batchupdate.selectedFilename')}: {this.state.file && this.state.file.name}
                    </label>
                    <input
                        maxLength={254}
                        className="m-input-element"
                        name="title"
                        type="text"
                        value={this.shortenFileName(this.state.title, 254)}
                        onChange={(evt) => this.setState({ title: evt.target.value })}
                        placeholder={lookup('mrc.batchupdate.file.title')}
                    />
                </div>
            </div>
        );
    }

    showSelectCountryAndBatchType() {
        return (
            <div className="row">
                <div className="column">
                    <label>{lookup('mrc.batchRequest.upload.country')}: </label>
                    <select
                        className="m-select-input"
                        value={!this.state.country || this.state.country === null ? undefined : this.state.country}
                        onChange={(evt) => this.setState({ ...this.state, country: evt.target.value })}
                        placeholder={lookup('mrc.batchRequest.upload.country')}
                    >
                        {this.props.allowedCountries
                            ? this.props.allowedCountries.map((t) => (
                                  <option className="m-select-option" key={t} value={t.toUpperCase()}>
                                      {t}
                                  </option>
                              ))
                            : null}
                    </select>
                </div>
                <div className="column">
                    <label>{lookup('mrc.batchRequest.upload.batchType')}: </label>
                    <select
                        className="m-select-input"
                        value={
                            !this.state.batchType || this.state.batchType === null ? undefined : this.state.batchType
                        }
                        onChange={(evt) => this.setState({ ...this.state, batchType: evt.target.value })}
                        placeholder={lookup('mrc.batchRequest.upload.batchType')}
                    >
                        {this.state.batchTypes.map((t) => (
                            <option className="m-select-option" key={t} value={t.toUpperCase()}>
                                {lookup('mrc.batchType.' + t.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    modalButtons() {
        return (
            <div className="mrc-btn-group">
                <button
                    type="button"
                    className="mrc-btn mrc-primary-button mrc-ui-button-small"
                    onClick={() => {
                        this.save();
                    }}
                    disabled={!this.validForm() || this.state.loading}
                >
                    {lookup('mrc.save')}
                </button>
                <button
                    type="button"
                    className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary"
                    onClick={this.finish}
                    disabled={this.state.loading}
                >
                    {lookup('mrc.cancel')}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <FileUpload labelSelect={lookup('mrc.file.select')} updateFile={this.updateFile} />
                    {this.showErrorFileTooBig()}
                    {this.showTitle()}
                    {this.showSelectCountryAndBatchType()}
                </div>

                {this.modalButtons()}
            </div>
        );
    }
}

BatchRequestAddModal.propTypes = {
    upload: PropTypes.func,
    allowedCountries: PropTypes.arrayOf(PropTypes.string),
    finish: PropTypes.func,
};

export default connect(null, function (dispatch) {
    return {
        upload: (country, fileContent, titleEntered, batchType) =>
            uploadBatchRequest(dispatch, country, fileContent, titleEntered, batchType),
    };
})(BatchRequestAddModal);
