import React, { Component } from 'react';

import './CreditTableFormSection.scss';

export default class CreditTableFormSection extends Component {
    render() {
        let { title, children, description } = this.props;
        return (
            <div className="mrc-ui-credit-tab-table-form-section mrc-ui-two-column-form">
                <div className="mrc-ui-form-side-column">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="mrc-ui-form-main-column">{children}</div>
            </div>
        );
    }
}
