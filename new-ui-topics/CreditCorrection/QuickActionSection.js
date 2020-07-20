import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../../Grid';
import Card from '../../Card';
import { FlexRow } from '../../Flex';
import NumberInput from '../../NumberInputNew';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import FormSection from '../../FormSection';
import CheckCard from '../../CheckCard';
import Select from '../../Select';
import InputLabel from '../../InputLabel';

import { correctionActions, creditProducts, creditPeriodOptions } from './creditCorrectionEntities';

export default class QuickActionSection extends Component {
    render() {
        let { onFormChange } = this.props;
        let { selectedAction, selectedCreditProduct, removeLimit, limitAmount, selectedCreditPeriod } = this.props.data;
        return (
            <FormSection
                title="Quick Action"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <h4 className="mrc-ui-form-label mb-2">Choose Action</h4>
                <Grid cols={4}>
                    {Object.values(correctionActions).map((action, i) => (
                        <CheckCard
                            key={i}
                            title={action.label}
                            onClick={() => onFormChange({ selectedAction: action })}
                            checked={action.id === selectedAction.id}
                        />
                    ))}
                </Grid>
                {selectedAction === correctionActions.limit ? (
                    <div className="mt-5">
                        <InputLabel>Choose Limit Option</InputLabel>
                        <Card dropShadow>
                            <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Limit</h4>
                            <Grid cols={4}>
                                <CheckCard
                                    title="Amount"
                                    checked={removeLimit === false}
                                    onClick={() => onFormChange({ removeLimit: false })}
                                >
                                    <FlexRow alignItems="baseline">
                                        <div className="mr-3">
                                            <NumberInput
                                                value={limitAmount}
                                                onChange={(v) => onFormChange({ removeLimit: false, limitAmount: v })}
                                            />
                                        </div>
                                        <MrcCurrencySymbol type="small" />
                                    </FlexRow>
                                </CheckCard>
                                <CheckCard
                                    title="Remove Limit"
                                    checked={removeLimit === true}
                                    onClick={() => onFormChange({ removeLimit: true })}
                                />
                            </Grid>
                            <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Credit Product</h4>
                            <Grid cols={4}>
                                {Object.values(creditProducts).map((cp, i) => (
                                    <CheckCard
                                        key={i}
                                        title={cp.label}
                                        onClick={() => onFormChange({ selectedCreditProduct: cp })}
                                        checked={cp.id === selectedCreditProduct.id}
                                    />
                                ))}
                            </Grid>

                            <Grid cols={4} className="mt-4">
                                <Select
                                    label="Creditperiod"
                                    options={creditPeriodOptions}
                                    value={selectedCreditPeriod}
                                    onChange={(v) => onFormChange({ selectedCreditPeriod: v })}
                                />
                            </Grid>
                        </Card>
                    </div>
                ) : null}
            </FormSection>
        );
    }
}

QuickActionSection.propTypes = {
    onFormChange: PropTypes.func,
    data: PropTypes.shape({
        selectedAction: PropTypes.object,
        limitAmount: PropTypes.number,
        removeLimit: PropTypes.bool,
        selectedCreditProduct: PropTypes.object,
        selectedCreditPeriod: PropTypes.string,
    }),
};
