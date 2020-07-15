import React, { PureComponent } from 'react';
import './CRTableHeaderCellCustomerGroup.scss';

export default class CRTableHeaderCellCustomerGroup extends PureComponent {
    render() {
        let { title } = this.props;
        return <div className="mrc-ui-crtable-header-cell-customer-group">{title}</div>;
    }
}
