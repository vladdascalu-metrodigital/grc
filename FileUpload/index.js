import React, {Component} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        // this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile = (event) => {
        this.props.sendFile(event.target.files[0]);
    }

    render() {
        return (
            <label className={classNames('mrc-file-upload', {'disabled': this.props.disabled})}>
                {this.props.label}
                <input type='file' name="file" onChange={this.uploadFile} disabled={this.props.disabled}/>
            </label>
        );
    }
}

FileUpload.propTypes = {
    sendFile: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};