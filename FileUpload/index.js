import React, {Component} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FileUploadIcon from '../icons/file-upload.svg';

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
 /*           <div className='button-wrapper'>
                <label className={classNames('mrc-file-upload', {'disabled': this.props.selectDisabled})}>
                    {this.props.labelSelect}
                    <input type='file' name='file' onChange={this.updateFile} disabled={this.props.selectDisabled}/>
                </label>
                <label className={classNames('mrc-file-upload', {'disabled': this.props.uploadDisabled})}>
                    {this.props.labelUpload}
                    <input type='button' name='upload-button' onClick={this.sendFile}
                           disabled={this.props.uploadDisabled}/>
                </label>
            </div> */
    render() {
        return (
            <div className="mrc-file-upload">
                <div className="m-fileDropzone">
                    <img src={FileUploadIcon} alt="File Upload" />
                    <br />
                      <span>
                        <button className="m-fileDropzone-button">Choose files<input type="file" name='file' onChange={this.updateFile} disabled={this.props.selectDisabled}/></button> to upload or drop them here.
                      </span>
                </div>
            </div>
        );
    }
}

FileUpload.propTypes = {
    updateFile: PropTypes.func.isRequired,
    labelUpload: PropTypes.string.isRequired,
    selectDisabled: PropTypes.bool,
};
