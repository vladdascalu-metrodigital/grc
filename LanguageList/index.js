import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import Moment from 'react-moment';
import { lookup } from '../Util/translations';

import './index.scss';

const COOKIE_NAME = 'MRC_LOCALE';

export default class LanguageList extends Component {
    componentDidMount() {
        // TODO Remove dependency from LanguageSelector to moment.js:
        const expiryDate = new Date(moment().add(5, 'years').calendar());
        const expires = 'expires=' + expiryDate.toUTCString();
        const currentLocale = this.props.config.data.currentLocale;
        if (currentLocale) {
            const locale = currentLocale.substr(0, 2).toLowerCase();
            document.cookie = `${COOKIE_NAME}=${locale};${expires}`;
            Moment.globalLocale = locale;
        }
    }

    render() {
        if (!this.props.config.data || !this.props.config.data.availableLanguages) return null;
        const data = this.props.config.data;
        const languages = data.availableLanguages;
        return (
            <React.Fragment>
                {languages.map((langLocale) => {
                    return (
                        <div
                            key={langLocale}
                            className="mrc-ui-language-list-entry"
                            onClick={() => this.props.languageChange(langLocale)}
                        >
                            <div className="mrc-ui-language-list-label">{lookup(`mrc.language.${langLocale}`)}</div>
                            <div className="mrc-ui-language-list-icon">{langLocale}</div>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }
}

LanguageList.propTypes = {
    // currentLanguageCode: PropTypes.string,
    config: PropTypes.shape({
        data: PropTypes.shape({
            availableLanguages: PropTypes.array,
            currentLocale: PropTypes.string,
        }).isRequired,
    }),
    languageChange: PropTypes.func.isRequired,
};
