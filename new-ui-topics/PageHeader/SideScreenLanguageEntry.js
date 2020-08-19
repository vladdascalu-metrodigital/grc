import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SideScreenLanguageEntry.scss';

export default class SideScreenLanguageEntry extends PureComponent {
    render() {
        let { language, languageISO } = this.props;
        return (
            <div className="mrc-ui-side-screen-language-entry">
                <div className="mrc-ui-side-screen-language-label">{language}</div>
                <div className="mrc-ui-side-screen-language-icon">{languageISO}</div>
            </div>
        );
    }
}

SideScreenLanguageEntry.PropTypes = {
    language: PropTypes.string,
    languageISO: PropTypes.string,
};
