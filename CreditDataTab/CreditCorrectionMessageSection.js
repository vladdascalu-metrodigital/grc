import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSection from '../FormSection';
import Card from '../Card';

export default class CreditCorrectionMessageSection extends Component {
    render() {
        let { type, title, description, result } = this.props;
        return (
            <FormSection title={title} description={description}>
                <Card type={type}>{result}</Card>
            </FormSection>
        );
    }
}

CreditCorrectionMessageSection.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    result: PropTypes.string,
};
