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

import './index.scss';

// TODO additional fields

export default class CreditCorrection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainContent>
                <CreditCorrectionGroupActions />
                <div style={{ position: 'relative' }}>
                    <Table.Root style={{ tableLayout: 'fixed' }}>
                        <Table.Body>
                            <CreditCorrectionTableHead />

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
