import React, { Component } from 'react';

import './index.scss';

export default class FormSection extends Component {
    render() {
        let { title, children, description } = this.props;
        return (
            <div className="mrc-ui-form-section">
                <div className="mrc-ui-form-side-column">
                    <h3 className="mrc-ui-form-section-heading">{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="mrc-ui-form-main-column">{children}</div>
            </div>
        );
    }
}
