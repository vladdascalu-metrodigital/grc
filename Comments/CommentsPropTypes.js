import { PropTypes } from 'prop-types';

export const CommentPropTypes = PropTypes.shape({
    id: PropTypes.string,
    comment: PropTypes.string.isRequired,
    uploadTimestamp: PropTypes.string.isRequired,
    uploaderPosition: PropTypes.string,
    uploaderPrincipalName: PropTypes.string.isRequired,
});
