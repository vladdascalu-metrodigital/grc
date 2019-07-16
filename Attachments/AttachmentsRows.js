import React, {Component} from 'react';
import './AttachmentsRows.scss';
import './attachments.scss';
import PropTypes from 'prop-types';
import {lookup} from '../Util/translations.js';
import FileUpload from '../FileUpload';
//icons:
import DocIcon from '../icons/doc.svg';
import PdfIcon from '../icons/pdf.svg';
import CsvIcon from '../icons/csv.svg';
import XlsIcon from '../icons/xls.svg';
import TifIcon from '../icons/tif.svg';
import PngIcon from '../icons/png.svg';
import JpgIcon from '../icons/jpg.svg';
import UnknownIcon from '../icons/doc.svg'; //TODO : need to replace this with an general 'unknown' icon. 


export default class AttachmentsRows extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null, fileType: null}
        this.FILE_TYPES_TRANSLATION_KEYS = props.fileTypes;
    }

    render() {
        const noAttachmentsGiven = !(this.props.data && this.props.data.length > 0);
        if (noAttachmentsGiven) {
            return <div className="mrc-attachments">
                    <div className="mrc-detail">{lookup('mrc.attachments.noattachments')}</div>
                    {this.createUploader()}
                </div>;
        } else {
        return <div className="mrc-attachments">
                    <div className="mrc-attachment-group col-2">{this.props.data.map(this.createRow)}</div>
                    {this.createUploader()}
                </div>;
        }
    }

    createUploader() {
        const readyToSend = this.state.title.trim().length > 0 && this.state.file !== null && this.state.fileType !== null && this.state.fileType !== '';
        return <div className="mrc-add-attachment">
            <FileUpload labelSelect={lookup('mrc.file.select')}
                updateFile={this.updateFile}
                selectDisabled={this.props.readonly}
                uploadDisabled={!readyToSend}/>


            <div className='row'>
                <div className='column'>
                    <label name='selected-file' className='selected-file'>{lookup('mrc.attachments.fields.file')}: {this.state.file && this.state.file.name}</label><br/>
                    <input className='m-input-element' name='title' type='text' value={this.state.title} onChange={this.updateTitle} disabled={this.props.readonly} maxLength={255} placeholder="Title" />
                </div>
                <div className='column'>
                    <label name='selected-file-type' className='selected-file'>{lookup('mrc.attachments.fields.fileType')}: {this.state.file && this.state.file.name}</label><br/>
                    <select name='file-type' id='select-file-type'
                                value={(this.state.fileType == null || this.state.fileType == '') ? '' : this.state.fileType}
                                onChange={this.handleFileTypeChange}
                                disabled={this.props.readonly}
                                placeholder="File Type">
                            {[<option key='null'/>].concat(this.props.fileTypes && this.props.fileTypes.map((t) => <option key={t} value={t}>{lookup(t)}</option>))}
                    </select>
                </div>
            </div>
            <button className="mrc-btn mrc-secondary-button" type='button' name='upload-button' onClick={this.sendFile} disabled={!readyToSend}>{lookup('mrc.file.upload')}</button>
        </div>;
    }

    createRow = (item) => {
        if (!item) {
            return null;
        }
        return <div className="mrc-attachment" key={item.id}>
            {this.displayIcon(item)}
            <span onClick={this.downloadFile.bind(this,item)}>
                <h4 className='attachment-title'>{item.title}</h4>
                <h4>
                    <mrc-datetime class="datetime">{item.uploadTimestamp}</mrc-datetime>
                    <span className="author">{' '}{item.uploaderPrincipalName} ({item.uploaderPosition}) {' '}</span>
					<span className="author">{item.fileType}</span> 
                </h4>
            </span>
        </div>;
    };

    displayIcon(item){
        return <img className="mrc-icon-large" src={this.getIcon(item).src} alt={this.getIcon(item).extension + ' File'} />;
    }

    downloadFile(item){
        window.open(
          item.contentUri,
          '_blank'
        );
    }

    getIcon(item) {
        const re = /(?:\.([^.]+))?$/;
        const extension = re.exec(item.filename)[1];
        if(extension == 'doc' || extension == 'docx'){
            return {src:DocIcon, extension : extension};
        }
        else if(extension == 'pdf'){
            return {src:PdfIcon, extension : extension};
        }
        else if(extension == 'csv'){
            return {src:CsvIcon, extension : extension};
        }
        else if(extension == 'xls' || extension == 'xlsx'){
            return {src:XlsIcon, extension : extension};
        }
        else if(extension == 'tif'){
            return {src:TifIcon, extension : extension};
        }
        else if(extension == 'png'){
            return {src:PngIcon, extension : extension};
        }
        else if(extension == 'jpg'){
            return {src:JpgIcon, extension : extension};
        }
        else{ //We need an icon for unknown file types.
            return {src:UnknownIcon, extension: extension};
        }

    }

    createTs(ts) {
        return <div className='registration-date'>
            <mrc-datetime>{ts}</mrc-datetime>
        </div>;
    }

    updateFile = (file) => {
        if (this.state.title.trim().length > 0) {
            this.setState({...this.state, file: file});
        } else {
            this.setState({...this.state, title: file.name, file: file});
        }
    };

    sendFile = () => {
        this.props.addAttachment(this.state.file, this.state.title, this.state.fileType);
        this.setState({title: '', file: null, fileType: null});
    };

    updateTitle = (evt) => {
        evt.preventDefault();
        this.setState({...this.state, title: evt.target.value});
    };

    handleFileTypeChange = (event) => {
        this.setState({...this.state, fileType: event.target.value});
    };

}

AttachmentsRows.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly : PropTypes.bool,
};
