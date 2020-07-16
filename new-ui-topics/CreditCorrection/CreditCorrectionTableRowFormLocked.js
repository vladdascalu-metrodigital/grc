import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSection from '../FormSection';
import Card, { TYPE as CT } from '../../Card';

export default class CreditCorrectionTableRowFormLocked extends Component {
    render() {
        let { quickGroupAction } = this.props;
        return (
            <FormSection
                title="No Action Possible"
                description='Group Action is set. For manual editing, please select "Set on Customer Level"  Quick Group Action.'
            >
                <Card type={CT.PRIMARY_WHITE}>Really no action here. Because of Reason {quickGroupAction.label}</Card>
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
