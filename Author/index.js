import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileImageFile from '../icons/profile.svg';
import './index.scss';

export default class Author extends Component {
    render() {
        return (
            <div className="mrc-ui-author-component">
                <img className="mrc-ui-author-icon" src={profileImageFile} alt="Profileimage" />
                <div className="mrc-ui-author-text">
                    <div className="mrc-ui-author-email">peter.parker@metronom.com</div>
                    <div className="mrc-ui-author-title-time">Head of Treasuary, 20.04.2020, 15:34 Uhr</div>
                </div>
                {this.props.additionalContent}
            </div>
        );
    }
}

Author.propTypes = {
    additionalContent: PropTypes.node,
};
