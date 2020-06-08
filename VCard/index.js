import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../icons/ProfileIcon';
import MrcDate from '../MrcDate';
import { lookup } from '../Util/translations';
import * as _ from 'lodash';

import './index.scss';

export default class VCard extends Component {
    render() {
        let {
            birthday,
            name,
            street,
            houseNumber,
            zipCode,
            city,
            phoneNumber,
            mobilePhoneNumber,
            email,
        } = this.props.person;
        const validPhoneNumber = !_.isEmpty(phoneNumber);
        const validMobile = !_.isEmpty(mobilePhoneNumber);
        const validMail = !_.isEmpty(email);
        const validBirthDay = !_.isEmpty(birthday);
        return (
            <div className="mrc-ui-vcard">
                <div className="mrc-ui-vcard-avatar">
                    <ProfileIcon />
                </div>
                <div className="mrc-ui-vcard-personal">
                    <span className="mrc-ui-vcard-name">{name}</span>
                    <br />
                    {validBirthDay ? (
                        <span className="mrc-ui-vcard-birthday">
                            <MrcDate>{birthday}</MrcDate>
                        </span>
                    ) : (
                        <br />
                    )}
                </div>
                <address className="mrc-ui-vcard-address">
                    {street} {houseNumber}
                    <br />
                    {zipCode} {city}
                </address>
                <div className="mrc-ui-vcard-contact">
                    {lookup('mrc.customerdetails.fields.phone')}
                    {': '}
                    {validPhoneNumber ? <a href={'tel:' + phoneNumber}>{phoneNumber}</a> : '-'}
                    <br />
                    {lookup('mrc.customerdetails.fields.mobile')}
                    {': '}
                    {validMobile ? <a href={'tel:' + mobilePhoneNumber}>{mobilePhoneNumber}</a> : '-'}
                    <br />
                    {lookup('mrc.customerdetails.fields.email')}
                    {': '}
                    {validMail ? <a href={'mailto:' + email}>{email}</a> : '-'}
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
        mobilePhoneNumber: PropTypes.string,
        email: PropTypes.string,
    }),
};
