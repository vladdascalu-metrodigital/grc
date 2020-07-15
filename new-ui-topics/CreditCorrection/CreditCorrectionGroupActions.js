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
        let { groupActions, selectedGroupAction, onChange } = this.props;
        return (
            <div className="mrc-ui-credit-correction-group-action mb-6 mt-4 ">
                <FormSection
                    title="Quick Group Actions"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                >
                    <h4 className="mrc-ui-form-label mb-2">Choose Action</h4>
                    <Grid colMin="10rem">
                        {Object.values(groupActions).map((e, i) => (
                            <CheckCard
                                key={i}
                                title={e.label}
                                checked={selectedGroupAction === e.value}
                                onClick={() => onChange(e.value)}
                            />
                        ))}
                    </Grid>
                </FormSection>
            </div>
        );
    }
}
