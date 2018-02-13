import React, {Component} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
    }

    updateFile = (event) => {
        this.props.updateFile(event.target.files[0]);
        event.target.files = null;
    }

    sendFile = () => {
        this.props.sendFile();
    }

    render() {
        return (
            <div className='button-wrapper'>
                <label className={classNames('mrc-file-upload', {'disabled': this.props.selectDisabled})}>
                    {this.props.labelSelect}
                    <input type='file' name='file' onChange={this.updateFile} disabled={this.props.selectDisabled}/>
                </label>
                <label className={classNames('mrc-file-upload', {'disabled': this.props.uploadDisabled})}>
                    {this.props.labelUpload}
                    <input type='button' name='upload-button' onClick={this.sendFile}
                           disabled={this.props.uploadDisabled}/>
                </label>
            </div>
        );
    }
}

FileUpload.propTypes = {
    updateFile: PropTypes.func.isRequired,
    sendFile: PropTypes.func.isRequired,
    labelSelect: PropTypes.string.isRequired,
    labelUpload: PropTypes.string.isRequired,
    selectDisabled: PropTypes.bool,
    uploadDisabled: PropTypes.bool
};
