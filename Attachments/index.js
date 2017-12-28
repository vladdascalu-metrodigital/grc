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
        this.state = {title: ''};
        // this.updateTitle = this.updateTitle.bind(this);
        // this.sendFile = this.sendFile.bind(this);
    }

    render() {
        const readyToSend = this.state.title.trim().length > 0;
        return <Panel title="Attachments" className="mrc-attachments">
            <PanelItem>
                <AttachmentsRows data={this.props.data}/>
            </PanelItem>
            <PanelItem>
                <label>Title</label>
                <div className="mrc-input">
                    <input name="Title" type="text" value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <FileUpload label="SELECT FILE" sendFile={this.sendFile} disabled={!readyToSend}/>
            </PanelItem>
        </Panel>;
    }

    sendFile = (file) => {
        this.props.addAttachment(file, this.state.title);
        this.setState({title: ''});
    }

    updateTitle = (evt) => {
        evt.preventDefault();
        this.setState({title: evt.target.value});
    }
}

Attachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array
};
