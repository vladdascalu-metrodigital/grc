import React, { Component } from 'react';

import Grid from '../../Grid';
import FormSection from './FormSection';
import CheckCard from '../../CheckCard';

import './CreditCorrectionGroupActions.scss';

export default class CreditCorrectionGroupActions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mrc-ui-credit-correction-group-action mb-6 mt-4 ">
                <FormSection
                    title="Quick Group Actions"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                >
                    <h4 className="mrc-ui-form-label mb-2">Choose Action</h4>
                    <Grid cols={4}>
                        <CheckCard title="Set on customer level" checked />
                        <CheckCard title="Block group for any purchase" />
                        <CheckCard title="Block group to buy on credit" />
                        <CheckCard title="Remove limit for group" />
                        <CheckCard title="Remove block for group" />
                    </Grid>
                </FormSection>
            </div>
        );
    }
}

CreditCorrectionGroupActions.propTypes = {};
