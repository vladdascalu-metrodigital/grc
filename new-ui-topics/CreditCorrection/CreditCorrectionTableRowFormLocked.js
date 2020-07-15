import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSection from '../FormSection';

export default class CreditCorrectionTableRowFormLocked extends Component {
    render() {
        let { quickGroupAction } = this.props;
        return (
            <FormSection
                title="No Action Possible"
                description='Group Action is set. For manual editing, please select "Set on Customer Level"  Quick Group Action.'
            >
                Really no action here. Because of Reason {quickGroupAction.label}
            </FormSection>
        );
    }
}

CreditCorrectionTableRowFormLocked.propTypes = {
    quickGroupAction: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
    }),
};
