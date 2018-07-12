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
import UnknownIcon from '../icons/doc.svg'; //TODO : need to replace this with an 'unknown' icon.


export default class AttachmentsRows extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null};
        
    }

    render() {
        if (!(this.props.data && this.props.data.length > 0)) {
            {return this.createNoAttachmentsView();}
        }
        return <div className="mrc-attachments">
                <div className="tiles-mobile">{this.props.data.map(this.createRow)}
                 {this.createUploader()}
                 </div>
                </div>;
    }


    createNoAttachmentsView(){
        return <div className="mrc-attachments">
                <div className="tiles-mobile"><li><span>{lookup('mrc.attachments.noattachments')}</span></li>
                 {this.createUploader()}
                 </div>
                </div>;
    }

    createUploader() {
        const readyToSend = this.state.title.trim().length > 0 && this.state.file !== null;
        return <li>
                        <label>{lookup('mrc.attachments.fields.title')}</label>
                        <div className='mrc-input'>
                            <input name='title' type='text' value={this.state.title} onChange={this.updateTitle}
                            disabled={this.props.readonly} maxLength={255}/>
                        </div>
                        <label name='selected-file' className='selected-file'>{lookup('mrc.attachments.fields.file')}: {this.state.file && this.state.file.name}</label>
                        <FileUpload labelSelect={lookup('mrc.file.select')}
                                labelUpload={lookup('mrc.file.upload')}
                                updateFile={this.updateFile}
                                sendFile={this.sendFile}
                                selectDisabled={this.props.readonly}
                                uploadDisabled={!readyToSend}/>
                    </li>;
    }

    createRow = (item) => {
        if (!item) {
            return null;
        }
        return <li key={item.id}>
            <div className="mrc-square">
            <div className="square-content" onClick={this.downloadFile.bind(this,item)}>
                <h3 className="span-metro-blue">{item.title}</h3>
                <mrc-datetime class="datetime"><b>{item.uploadTimestamp}</b></mrc-datetime>
                <span className="author"> <b>{item.uploaderPrincipalName} ({item.uploaderPosition})</b></span>
            </div>
            <div className="edge-line"></div>
            {this.displayIcon(item)}
        </div>
        </li>;
    };

    displayIcon(item){
        return <div className="icon-wrapper">
                    <img className="m-icon-large" src={this.getIcon(item).src} alt={this.getIcon(item).extension + ' File'}></img>
                </div>;   
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
