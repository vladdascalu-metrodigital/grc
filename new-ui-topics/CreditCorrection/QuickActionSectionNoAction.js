import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSection from '../../FormSection';
import Card from '../../Card';

export default class QuickActionSectionNoAction extends Component {
    render() {
        let { quickGroupAction, type } = this.props;
        return (
            <FormSection
                title="No Action Possible"
                description='Group Action is set. For manual editing, please select "Set on Customer Level"  Quick Group Action.'
            >
                <Card type={type}>
                    Lorem ipsum. Really no action here. Dolor sit amet Reason {quickGroupAction.label}
                </Card>
            </FormSection>
        );
    }
}

QuickActionSectionNoAction.propTypes = {
    quickGroupAction: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
    }),
    type: PropTypes.string,
};
