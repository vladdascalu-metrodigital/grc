import React, { Component } from 'react';
import FormSection from '../FormSection';
import PropTypes from 'prop-types';
import AdditionalFieldsSection from '../AdditionalFields/AdditionalFieldsSection';

export default class CustomerAdditionalFieldsSection extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { translations } = this.props;
        const ts = translations;

        return this.props.additionalFields && this.props.additionalFields.hasCustomerAdditionalFields ? (
            <FormSection title={ts.customerAdditionalFields} description={ts.customerAdditionalFieldsDescription}>
                <React.Fragment>
                    <AdditionalFieldsSection
                        onChange={this.props.additionalFields.onChange}
                        requestFields={this.props.additionalFields.customerAdditionalFieldsList}
                        editable={this.props.additionalFields.editable}
                        disabled={this.props.additionalFields.disabled}
                    />
                </React.Fragment>
            </FormSection>
        ) : null;
    }
}
CustomerAdditionalFieldsSection.propTypes = {
    additionalFields: PropTypes.object,
    translations: PropTypes.object.isRequired,
};
