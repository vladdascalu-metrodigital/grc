import React, { Component } from 'react';
import { lookup } from '../../Util/translations';
import { BACKEND_BATCH_REQUEST_CONTEXT, BATCH_REQUEST_TYPE_CREDIT_CORRECTION } from '../util/Constants';
import PropTypes from 'prop-types';

export default class BatchRequestTemplateFiles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.allowedCountries || this.props.allowedCountries.length < 1) {
            return null;
        }
        const ccTemplateUrl =
            window.location.origin +
            BACKEND_BATCH_REQUEST_CONTEXT +
            '/template/' +
            BATCH_REQUEST_TYPE_CREDIT_CORRECTION;
        const buttons = this.props.allowedCountries.map((country) => {
            return (
                <button
                    key={country}
                    type="button"
                    className="mrc-primary-large-add-button batch-request-add-button"
                    onClick={() => window.open(ccTemplateUrl + '/' + country, '_blank')}
                >
                    {lookup('mrc.batchupdate.template.' + BATCH_REQUEST_TYPE_CREDIT_CORRECTION)} {' ' + country}
                </button>
            );
        });

        return <div className="template-buttons">{buttons}</div>;
    }
}

BatchRequestTemplateFiles.propTypes = {
    allowedCountries: PropTypes.arrayOf(PropTypes.string),
};
