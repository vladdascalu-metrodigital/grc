import React, { Component } from 'react';
import { ModalDialogSimple } from '../../ModalDialog';
import '../EmailService/MrcUiBasicGridTable.scss';

export default class ActivationResultsModalDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { onCancel, onOk, activationResults } = this.props;
        return (
            <ModalDialogSimple title="Activation Results" onCancel={onCancel} onOk={onOk}>
                <table
                    className="mrc-ui-basic-grid-table"
                    style={{ '--mrc-ui-grid-template-columns': '1fr 1fr 1fr 4fr' }}
                >
                    <thead>
                        <tr className="mrc-ui-basic-grid-table-header">
                            <th>
                                <span>Store</span>
                            </th>
                            <th>
                                <span>Customer</span>
                            </th>
                            <th>
                                <span>Result</span>
                            </th>
                            <th>
                                <span>Message</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activationResults.map((result, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <span>{result.store}</span>
                                    </td>
                                    <td>
                                        <span>{result.customer}</span>
                                    </td>
                                    <td>
                                        <span>{result.result}</span>
                                    </td>
                                    <td className="mrc-ui-basic-grid-table-cell-longtext">
                                        <span>{result.message}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ModalDialogSimple>
        );
    }
}
