import React, {Component} from 'react';
import './CommentsRows.scss';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default class CommentsRows extends Component {

    constructor(props) {
        super(props);
        // this.createRow = this.createRow.bind(this);
    }

    render() {
        if (!(this.props.data && this.props.data.length > 0)) {
            return <span>No Comments</span>;
        }
        return <ul className='mrc-comments-rows'>{this.props.data.map(this.createRow)}</ul>;
    }

    createRow = (item) => {

        if (!item)
            return null;

        return <li key={item.id}>
            <div className='mrc-comments-rows-info'>
                <div className='mrc-comments-rows-container'>
                    {item.uploadTimestamp ? this.createTs(item.uploadTimestamp) : null}
                    <span>{item.uploaderPosition}</span>
                </div>
                <div className='mrc-comments-rows-user'>
                    {item.uploaderPrincipalName}
                </div>
            </div>
            <pre>{item.comment}</pre>
        </li>;
    }

    createTs(ts) {
        return <div className='registration-date'>
            <Moment className='absolute' format='LL HH:mm'>{ts}</Moment>
        </div>;
    }
}
CommentsRows.propTypes = {
    data: PropTypes.array
};
