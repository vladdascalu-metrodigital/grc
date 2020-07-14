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

export default class CreditCorrection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainContent>
                <SimpleActionDock />
                <CreditCorrectionGroupActions />
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
