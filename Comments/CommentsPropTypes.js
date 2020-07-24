import { PropTypes } from 'prop-types';

export const CommentPropTypes = PropTypes.shape({
    id: PropTypes.string,
    comment: PropTypes.string.isRequired,
    uploadTimestamp: PropTypes.string.isRequired,
    uploaderPosition: PropTypes.string,
    uploaderPrincipalName: PropTypes.string.isRequired,
});

export const PreviousRequestCommentsMetaPropTypes = {
    country: PropTypes.string,
    startDate: PropTypes.string,
    finalState: PropTypes.string,
    groupLimit: PropTypes.number,
    appliedLimit: PropTypes.number,
};
