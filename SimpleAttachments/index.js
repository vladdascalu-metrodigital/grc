import React, { Component } from 'react';
import './index.scss';
import './simpleAttachments.scss';
import SimpleAttachmentsRows from './SimpleAttachmentsRows';
import PropTypes from 'prop-types';

export default class SimpleAttachments extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', file: null };
    }

    render() {
        return (
            <SimpleAttachmentsRows
                data={this.props.data}
                readonly={this.props.readonly}
                addAttachment={this.props.addAttachment}
                fileTypes={this.props.fileTypes}
            />
        );
    }
}

SimpleAttachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool,
    fileTypes: PropTypes.array,
};
