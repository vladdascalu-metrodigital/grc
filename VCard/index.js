import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../icons/ProfileIcon';
import MrcDate from '../MrcDate';

import './index.scss';

export default class VCard extends Component {
    render() {
        let { birthday, name, street, houseNumber, zipCode, city, phoneNumber, email } = this.props.person;
        return (
            <div className="mrc-ui-vcard">
                <div className="mrc-ui-vcard-avatar">
                    <ProfileIcon />
                </div>
                <div className="mrc-ui-vcard-personal">
                    <span className="mrc-ui-vcard-name">{name}</span>
                    <br />
                    <span className="mrc-ui-vcard-birthday">
                        <MrcDate>{birthday}</MrcDate>
                    </span>
                </div>
                <address className="mrc-ui-vcard-address">
                    {street} {houseNumber}
                    <br />
                    {zipCode} {city}
                </address>
                <div className="mrc-ui-vcard-contact">
                    Tel. <a href={'tel:' + phoneNumber}>{phoneNumber}</a>
                    <br />
                    {email}
                </div>
            </div>
        );
    }
}

VCard.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string,
        birthday: PropTypes.string,
        street: PropTypes.string,
        houseNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        zipCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        city: PropTypes.string,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
    }),
};
