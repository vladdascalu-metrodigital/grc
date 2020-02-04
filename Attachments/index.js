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
        const {data, readonly, country, fileTypes, addAttachment} = this.props;
        return <AttachmentsRows data={this.props.data}
                                readonly={this.props.readonly} addAttachment={this.props.addAttachment}
                                fileTypes = {this.props.fileTypes} //collaterals = {this.props.collaterals}
                                country={this.props.country}
        />;
    }

}

Attachments.propTypes = {
    addAttachment: PropTypes.func.isRequired,
    data: PropTypes.array,
    readonly: PropTypes.bool
};
