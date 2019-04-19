import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import Moment from 'react-moment';

const COOKIE_NAME = 'MRC_LOCALE';

export default class LanguageSelectLayout extends Component {

    static createOption(country, selected) {
        return (
            <option key={country} label={country} value={country+''} defaultValue={selected}>
                {country}
            </option>
        );
    }

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
            <div className="m-select">
                <div className="m-input">
                    <div className="m-input-elementWrapper">
                        <select name="language"
                                id="language-select"
                                value={data.currentLocale || ''}
                                onChange={this.props.languageChange}
                                className="m-input-element m-select-input">
                            {languages.map(locale =>
                                LanguageSelectLayout.createOption(locale, locale === data.currentLocale))}
                        </select>

                    </div>
                </div>
            </div>

        );
    }

}

LanguageSelectLayout.propTypes = {
    currentLanguageCode: PropTypes.string,
    config: PropTypes.shape({
        data: PropTypes.shape({
            availableLanguages: PropTypes.array,
            currentLocale: PropTypes.string
        }).isRequired
    }),
    languageChange: PropTypes.func.isRequired
};
