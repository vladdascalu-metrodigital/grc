import React, { PureComponent } from 'react';

import './CreditTableRowShadow.scss';

export default class CreditTableRowShadow extends PureComponent {
    render() {
        return (
            <td className="mrc-ui-credit-table-row-shadow" colSpan="8">
                <div></div>
            </td>
        );
    }
}
