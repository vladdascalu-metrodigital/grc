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
    customerLevel: {
        id: 'group-customer-level',
        label: 'Set on customer Level',
    },
    blockPurchase: {
        id: 'group-block-purchase',
        label: 'Block group for any purchase',
    },
    blockCredit: {
        id: 'group-block-credit',
        label: 'Temp block group to buy on any credit',
    },
    removeLimit: {
        id: 'group-remove-limit',
        label: 'Remove limit from group',
    },
    removeBlock: {
        id: 'group-remove-block',
        label: 'Remove block from group',
    },
};

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
                <div style={{ position: 'relative' }}>
                    <Table.Root style={{ tableLayout: 'fixed' }}>
                        <Table.Body>
                            <CreditCorrectionTableHead />

                            {/* {[...Array(10).keys()].map((e, i) => (
                                <React.Fragment>
                                    <CreditCorrectionTableRow
                                        key={i}
                                        id={'credit-table-sticky-row-' + i}
                                        isZebra={!!(i % 2)}
                                    />
                                </React.Fragment>
                            ))} */}
                            <CreditCorrectionTableRow
                                quickGroupAction={
                                    selectedGroupAction.id !== groupActions.customerLevel.id
                                        ? selectedGroupAction
                                        : null
                                }
                            />

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
