import React, { PureComponent } from 'react';

import './CreditTableExpandableContent.scss';

export default class CreditTableExpandableContent extends PureComponent {
    render() {
        let { title, description } = this.props;
        return (
            <div className="mrc-ui-credit-tab-table-expandable-content mrc-ui-two-column-form">
                <div className="mrc-ui-form-side-column">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="mrc-ui-form-main-column">form</div>
            </div>
        );
    }
}
