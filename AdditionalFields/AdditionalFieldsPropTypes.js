import { PropTypes } from 'prop-types';

export const FieldPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
});

export const CountryFieldPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    field: FieldPropTypes,
    mandatory: PropTypes.bool.isRequired,
    validation: PropTypes.string,
    level: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    section: PropTypes.string,
    reusable: PropTypes.bool,
    endTimestamp: PropTypes.string,
    country: PropTypes.string,
    options: PropTypes.string,
});

export const RequestFieldPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    countryField: CountryFieldPropTypes.isRequired,
    requestId: PropTypes.string,
    country: PropTypes.string,
    storeNumber: PropTypes.string,
    customerNumber: PropTypes.string,
    groupId: PropTypes.string,
    creationTimestamp: PropTypes.string,
    value: PropTypes.any,
    textValue: PropTypes.string,
});
