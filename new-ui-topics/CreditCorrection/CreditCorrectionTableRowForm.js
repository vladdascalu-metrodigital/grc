import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Grid from '../../Grid';
import Card from '../../Card';
import { FlexRow } from '../../Flex';
import NumberInput from '../../NumberInputNew';
import MrcCurrencySymbol from '../../MrcCurrencySymbol';
import FormSection from '../FormSection';
import CheckCard from '../../CheckCard';
import Select from '../../Select';
import InputLabel from '../../InputLabel';

const correctionActions = {
    noChanges: {
        id: 'action-no-changes',
        label: 'No Changes',
    },
    limit: {
        id: 'action-limit',
        label: 'Limit',
    },
    blocking: {
        id: 'action-blocking',
        label: 'Blocking',
    },
    removeBlock: {
        id: 'action-remove-block',
        label: 'RemoveBlock',
    },
};

const creditProducts = {
    metroTop: {
        id: 'product-metro-top',
        label: 'Metro Top',
    },
    bankTransfer: {
        id: 'product-bank-transfer',
        label: 'Bank Transfer',
    },
    directDebit: {
        id: 'product-direct-debit',
        label: 'Direct Debit',
    },
};

const creditPeriodOptions = [
    ['NULL', 'Please Choose'],
    ['1', 'Option 1'],
    ['2', 'Option 2'],
    ['3', 'Option 3'],
    ['4', 'Option 4'],
];

export default class CreditCorrectionTableRowForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAction: correctionActions.limit,
            limitAmount: 999,
            removeLimit: false,
            selectedCreditProduct: creditProducts.metroTop,
            selectedCreditPeriod: creditPeriodOptions[0],
        };
    }

    render() {
        let { selectedAction, selectedCreditProduct, removeLimit, limitAmount, selectedCreditPeriod } = this.state;
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
                            onClick={() => this.setState({ selectedAction: action })}
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
                                    onClick={() => this.setState({ removeLimit: false })}
                                >
                                    <FlexRow alignItems="baseline">
                                        <div className="mr-3">
                                            <NumberInput
                                                value={limitAmount}
                                                onChange={(v) => this.setState({ removeLimit: false, limitAmount: v })}
                                            />
                                        </div>
                                        <MrcCurrencySymbol type="small" />
                                    </FlexRow>
                                </CheckCard>
                                <CheckCard
                                    title="Remove Limit"
                                    checked={removeLimit === true}
                                    onClick={() => this.setState({ removeLimit: true })}
                                />
                            </Grid>
                            <h4 className="mrc-ui-form-label mt-4 mb-1">Choose Credit Product</h4>
                            <Grid cols={4}>
                                {Object.values(creditProducts).map((cp, i) => (
                                    <CheckCard
                                        key={i}
                                        title={cp.label}
                                        onClick={() => this.setState({ selectedCreditProduct: cp })}
                                        checked={cp.id === selectedCreditProduct.id}
                                    />
                                ))}
                            </Grid>

                            <Grid cols={4} className="mt-4">
                                <Select
                                    label="Creditperiod"
                                    options={creditPeriodOptions}
                                    value={selectedCreditPeriod}
                                    onChange={(v) => this.setState({ selectedCreditPeriod: v })}
                                />
                            </Grid>
                        </Card>
                    </div>
                ) : null}
            </FormSection>
        );
    }
}

CreditCorrectionTableRowForm.propTypes = {};
