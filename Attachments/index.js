import React, {Component} from 'react';
import './index.scss';
import Panel from '../Panel';
import PanelItem from '../Panel/PanelItem';
import FileUpload from '../FileUpload';
import AttachmentsRows from './AttachmentsRows';
import PropTypes from 'prop-types';
import {lookup} from '../Util/translations.js';

export default class Attachments extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null};
    }

    render() {
        const readyToSend = this.state.title.trim().length > 0 && this.state.file !== null;
        return <Panel title={lookup('mrc.attachments.title')} className='mrc-attachments'>
            <PanelItem>
                <AttachmentsRows data={this.props.data}/>
            </PanelItem>
            <PanelItem>
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
            </PanelItem>
        </Panel>;
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

Attachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool
};
