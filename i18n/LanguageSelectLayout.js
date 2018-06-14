import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from "moment/moment";

const COOKIE_NAME = 'MRC_LOCALE';

export default class LanguageSelectLayout extends Component {

    static createOption(country, selected) {
        return (
            <option key={country} value={country} defaultValue={selected}>
                {country}
            </option>
        );
    }

    componentDidMount() {
        const expiryDate = new Date(moment().add(5, 'years').calendar());
        const expires = "expires=" + expiryDate.toUTCString();
        document.cookie = `${COOKIE_NAME}=${this.props.config.data.currentLocale.substr(0, 2).toLowerCase()};${expires}`;
    }

    render() {
        if (!this.props.config.data || !this.props.config.data.availableLanguages) return null;
        const languages = this.props.config.data.availableLanguages;
        return (
            <div className="m-select">
                <div className="m-input">
                    <div className="m-input-elementWrapper">
                        <select name="language"
                                value={this.props.config.data.currentLocale}
                                onChange={this.props.languageChange}
                                className="m-input-element m-select-input">
                            {languages.map(locale =>
                                LanguageSelectLayout.createOption(locale, locale === this.props.config.data.currentLocale))}
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
