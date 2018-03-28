import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {displayName} from '../Util/index';
import Moment from 'react-moment';

export class AbstractCustomerDetails extends Component {

    describeTerm(term, description) {
        return (term && description)
            ? [<dt key='dt'>{term}</dt>, <dd key='dd'>{description}</dd>]
            : null;
    }

    printAndBr() {
        const nonNullArgs = Array.prototype.slice.call(arguments).filter(a => a !== null && a !== undefined);
        return nonNullArgs.length > 0
            ? [nonNullArgs.join(' '), <br key='br'/>]
            : null;
    }

    printDate(date, withRelative = true) {
        if (!date) {
            return null;
        }
        return (
            <div className='registration-date'>
                <Moment className='absolute' format='LL'>{date}</Moment>
                &nbsp;
                {withRelative && <Moment className='relative' fromNow={true}>{date}</Moment>}
            </div>
        );
    }

    displayName() {
        return displayName(this.props.customer);
    }

    render() {
        if (!this.props.customer) {
            console.warn('No customer given!');
            return null;
        }
        return this.renderDetails();
    }

    renderDetails() {
        throw new Error('This method is abstract!');
    }

}

AbstractCustomerDetails.propTypes = {
    customer: PropTypes.shape({
        vatSpecNumber: PropTypes.string,
        legalForm: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        mobilePhoneNumber: PropTypes.string,
        street: PropTypes.string,
        houseNumber: PropTypes.string,
        zipCode: PropTypes.string,
        city: PropTypes.string,
        registrationDate: PropTypes.string
    })
};
