import React, {Component} from 'react';
import './index.scss';
import './attachments.scss';
import Panel from '../Panel';
import AttachmentsRows from './AttachmentsRows';
import PropTypes from 'prop-types';
import {lookup} from '../Util/translations.js';

export default class Attachments extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', file: null};
    }

    render() {
        return <Panel title={lookup('mrc.attachments.title')}>
                    <AttachmentsRows data={this.props.data}
                    readonly = {this.props.readonly} addAttachment = {this.props.addAttachment} />
               </Panel>;

    }

}

Attachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool
};
