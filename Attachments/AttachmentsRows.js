import React, {Component} from 'react';
import './AttachmentsRows.scss';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default class AttachmentsRows extends Component {

    constructor(props) {
        super(props);
        // this.createRow = this.createRow.bind(this);
    }

    render() {
        if (!(this.props.data && this.props.data.length > 0)) {
            return <span>No Attachments</span>;
        }
        return <ul className='mrc-attachments-rows'>{this.props.data.map(this.createRow)}</ul>;
    }

    createRow = (item) => {

        if (!item)
            return null;

        return <li key={item.id}>
            <div className='mrc-attachments-rows-info'>
                <div className='mrc-attachments-rows-container'>
                    {item.uploadTimestamp ? this.createTs(item.uploadTimestamp) : null}
                    <span>{item.uploaderPosition}</span>
                </div>
                <div className='mrc-attachments-rows-user'>
                    {item.uploaderPrincipalName}
                </div>
            </div>
            <a href={item.contentUri}>{item.title}</a>
        </li>;
    }

    createTs(ts) {
        return <div className='registration-date'>
            <Moment className='absolute' format='LL HH:mm'>{ts}</Moment>
        </div>;
    }
}

AttachmentsRows.propTypes = {
    data: PropTypes.array
};
