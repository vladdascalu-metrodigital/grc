import React, {Component} from 'react';
import './index.scss';
import './attachments.scss';
import AttachmentsRows from './AttachmentsRows';
import PropTypes from 'prop-types';

export default class Attachments extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null};
    }

    render() {
        const hideUploader = this.props.hideUploader !== undefined && this.props.hideUploader !== null && this.props.hideUploader === true;
        return <AttachmentsRows data={this.props.data}
                                readonly={this.props.readonly} addAttachment={this.props.addAttachment}
                                fileTypes = {this.props.fileTypes} country={this.props.country}
                                hideUploader={hideUploader}
        />;
    }

}

Attachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool,
    hideUploader: PropTypes.bool,
};
