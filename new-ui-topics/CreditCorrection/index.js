import React, { Component } from 'react';
import MainContent from '../../MainContent';
import Table from '../../MrcTable';

import CreditCorrectionTableHead from './CreditCorrectionTableHead';
import CreditCorrectionTableRow from './CreditCorrectionTableRow';

import CreditCorrectionTableRowA from './CreditCorrectionTableRowA';
import CreditCorrectionTableRowB from './CreditCorrectionTableRowB';
import CreditCorrectionTableRowC from './CreditCorrectionTableRowC';
import CreditCorrectionTableRowD from './CreditCorrectionTableRowD';

import CreditCorrectionGroupActions from './CreditCorrectionGroupActions';
import { SimpleActionDock } from '../../ActionDock';

import './index.scss';

// TODO additional fields

const groupActions = {
    customerLevel: { label: 'Set on customer Level', value: 'group-customer-level' },
    blockPurchase: { label: 'Block group for any purchase', value: 'group-block-purchase' },
    blockCredit: { label: 'Temp block group to buy on any credit', value: 'group-block-credit' },
    removeLimit: { label: 'Remove limit from group', value: 'group-remove-limit' },
    removeBlock: { label: 'Remove block from group', value: 'group-remove-block' },
};

export default class CreditCorrection extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedGroupAction: groupActions.customerLevel.value };
    }

    handleChangeGroupAction(value) {
        this.setState({ selectedGroupAction: value });
    }

    render() {
        return (
            <MainContent>
                <SimpleActionDock />
                <CreditCorrectionGroupActions
                    groupActions={groupActions}
                    selectedGroupAction={this.state.selectedGroupAction}
                    onChange={this.handleChangeGroupAction.bind(this)}
                />
                <div style={{ position: 'relative' }}>
                    <Table.Root style={{ tableLayout: 'fixed' }}>
                        <Table.Body>
                            <CreditCorrectionTableHead />

                            {[...Array(10).keys()].map((e, i) => (
                                <React.Fragment>
                                    <CreditCorrectionTableRow
                                        key={i}
                                        id={'credit-table-sticky-row-' + i}
                                        isZebra={!!(i % 2)}
                                    />
                                </React.Fragment>
                            ))}
                            <CreditCorrectionTableRow />
                            <CreditCorrectionTableRowA />
                            <CreditCorrectionTableRowB />
                            <CreditCorrectionTableRowC />
                            <CreditCorrectionTableRowD />
                        </Table.Body>
                    </Table.Root>
                </div>
            </MainContent>
        );
    }
}
