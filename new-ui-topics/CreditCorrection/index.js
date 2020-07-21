import React, { Component } from 'react';
import MainContent from '../../MainContent';
import Table from '../../MrcTable';

import CreditCorrectionTableHead from './CreditCorrectionTableHead';
import CreditCorrectionTableRow from './CreditCorrectionTableRow';
import CreditCorrectionGroupActions from './CreditCorrectionGroupActions';
import { SimpleActionDock } from '../../ActionDock';

import { quickGroupActions as groupActions } from './creditCorrectionEntities';

import './index.scss';

// TODO additional fields

export default class CreditCorrection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGroupAction: groupActions.customerLevel,
        };
    }

    handleChangeGroupAction(value) {
        this.setState({ selectedGroupAction: value });
    }

    render() {
        let { selectedGroupAction } = this.state;
        return (
            <MainContent>
                <SimpleActionDock />
                <CreditCorrectionGroupActions
                    groupActions={groupActions}
                    selectedGroupAction={this.state.selectedGroupAction}
                    onChange={this.handleChangeGroupAction.bind(this)}
                />
                <Table.Root fixedLayout>
                    <Table.Body>
                        <CreditCorrectionTableHead />

                        <CreditCorrectionTableRow
                            isZebra
                            quickGroupAction={selectedGroupAction}
                            errorMessage="Transfering the credit limit to the master dat system has finally failed, because it is not possible to assing credit to a non-credit customer. The customer’s limit could not be updated, the system gave up after {0} retries. Please verify the customer in the master dat system and then click on „Retry” in the activation section of the Audit Trail."
                        />
                        {[...Array(10).keys()].map((e, i) => (
                            <CreditCorrectionTableRow
                                key={i}
                                id={'credit-table-sticky-row-' + i}
                                isZebra={!!(i % 2)}
                                quickGroupAction={selectedGroupAction}
                            />
                        ))}
                    </Table.Body>
                </Table.Root>
            </MainContent>
        );
    }
}
