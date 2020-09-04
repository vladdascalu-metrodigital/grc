import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileImageFile from '../icons/profile.svg';
import './index.scss';
import moment from 'moment';
import Moment from 'react-moment';

export default class Author extends Component {
    render() {
        return (
            <div className="mrc-ui-author-component">
                <img className="mrc-ui-author-icon" src={profileImageFile} alt="Profileimage" />
                <div className="mrc-ui-author-text">
                    <div className="mrc-ui-author-email">{this.props.name}</div>
                    <div className="mrc-ui-author-title-time">
                        {this.props.position}, {moment(this.props.writeTime).locale(Moment.globalLocale).format('LLL')}
                    </div>
                </div>
                {this.props.additionalContent}
            </div>
        );
    }
}

Author.propTypes = {
    additionalContent: PropTypes.node,
    name: PropTypes.string,
    position: PropTypes.string,
    writeTime: PropTypes.string,
};
