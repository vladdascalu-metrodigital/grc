import React, {Component} from 'react';
import './index.scss';
import './attachments.scss';
import AttachmentsRows from './AttachmentsRows';
import PropTypes from 'prop-types';
import {lookup} from '../Util/translations.js';

export default class Attachments extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null};
    }

    render() {
        const {data, readonly, fileTypes, addAttachment} = this.props;  
        return <AttachmentsRows data={this.props.data}
                    readonly = {this.props.readonly} addAttachment = {this.props.addAttachment}
                    fileTypes = {this.props.fileTypes} />;
    }

}

Attachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool
};
