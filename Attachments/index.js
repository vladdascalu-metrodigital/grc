import React, {Component} from 'react';
import './index.scss';
import Panel from '../Panel';
import PanelItem from '../Panel/PanelItem';
import FileUpload from '../FileUpload';
import AttachmentsRows from './AttachmentsRows';
import PropTypes from 'prop-types';

export default class Attachments extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null};
    }

    render() {
        const readyToSend = this.state.title.trim().length > 0 && this.state.file !== null;
        return <Panel title='Attachments' className='mrc-attachments'>
            <PanelItem>
                <AttachmentsRows data={this.props.data}/>
            </PanelItem>
            <PanelItem>
                <label>Title</label>
                <div className='mrc-input'>
                    <input name='Title' type='text' value={this.state.title} onChange={this.updateTitle}
                           disabled={this.props.readonly}/>
                </div>
                <label name='selected-file' className='selected-file'>Selected file: {this.state.file && this.state.file.name}</label>
                <FileUpload labelSelect='SELECT FILE'
                            labelUpload='UPLOAD FILE'
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
    }

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
