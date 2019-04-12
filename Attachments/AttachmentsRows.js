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
        this.state = {title: '', file: null}
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
        const readyToSend = this.state.title.trim().length > 0 && this.state.file !== null;
        return <div className="mrc-add-attachment">
            <FileUpload labelSelect={lookup('mrc.file.select')}
                updateFile={this.updateFile}
                selectDisabled={this.props.readonly}
                uploadDisabled={!readyToSend}/>
            <label name='selected-file' className='selected-file'>{lookup('mrc.attachments.fields.file')}: {this.state.file && this.state.file.name}</label><br/>
            <input className='m-input-element' name='title' type='text' value={this.state.title} onChange={this.updateTitle} disabled={this.props.readonly} maxLength={255} placeholder="Title" />
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
                <h4>{item.title}</h4>
                <h4>
                    <mrc-datetime className="datetime">{item.uploadTimestamp}</mrc-datetime>
                    <span className="author">{item.uploaderPrincipalName} ({item.uploaderPosition})</span>
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
            this.setState({file: file});
        } else {
            this.setState({title: file.name, file: file});
        }
    };

    sendFile = () => {
        this.props.addAttachment(this.state.file, this.state.title);
        this.setState({title: '', file: null});
    };

    updateTitle = (evt) => {
        evt.preventDefault();
        this.setState({title: evt.target.value});
    };
    

}

AttachmentsRows.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly : PropTypes.bool,
};
