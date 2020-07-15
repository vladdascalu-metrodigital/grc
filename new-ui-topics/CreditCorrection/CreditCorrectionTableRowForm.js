import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Grid from '../../Grid';
import Card from '../../Card';
import { FlexRow } from '../../Flex';
import NumberInput from '../../NumberInput';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import FormSection from '../FormSection';
import CheckCard from '../../CheckCard';
import Select from '../../Select';

export default class CreditCorrectionTableRowForm extends Component {
    render() {
        return (
            <FormSection
                title="Quick Action"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <h4 className="mrc-ui-form-label mb-2">Choose Action</h4>
                <Grid cols={4}>
                    <CheckCard title="No Changes" />
                    <CheckCard title="Limit" checked />
                    <CheckCard title="Blocking" />
                    <CheckCard title="Remove Block" />
                </Grid>
                <h4 className="mrc-ui-form-label mt-5 mb-2">Choose Limit Option</h4>
                <Card dropShadow>
                    <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Limit</h4>
                    <Grid cols={4}>
                        <CheckCard title="Amount" checked>
                            <FlexRow alignItems="baseline">
                                <div className="mr-3">
                                    <NumberInput />
                                </div>
                                <MrcCurrencySymbol type="small" />
                            </FlexRow>
                        </CheckCard>
                        <CheckCard title="Remove Limit" />
                    </Grid>
                    <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Credit Product</h4>
                    <Grid cols={4}>
                        <CheckCard title="Metro Top" checked />
                        <CheckCard title="Bank Transfer" />
                        <CheckCard title="Direct Debit" />
                    </Grid>

                    <Grid cols={4} className="mt-4">
                        <Select
                            label="Creditperiod"
                            options={[
                                ['NULL', 'Please Choose'],
                                ['1', 'Option 1'],
                                ['2', 'Option 2'],
                                ['3', 'Option 3'],
                                ['4', 'Option 4'],
                            ]}
                            value={null}
                            onChange={null}
                        />
                    </Grid>
                </Card>
            </FormSection>
        );
    }
}

CreditCorrectionTableRowForm.propTypes = {};
