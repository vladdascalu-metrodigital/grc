import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LanguageSelectLayout extends Component {

    static createOption(country, selected) {
        return (
            <option key={country} value={country} selected={selected}>
                {country}
            </option>
        );
    }

    render() {
        if (!this.props.config.data) return null;

        return (
            <div className="m-select">
                <div className="m-input">
                    <div className="m-input-elementWrapper">
                        <select name="language"
                                value={this.props.config.data.currentLocale}
                                onChange={this.props.languageChange}
                                className="m-input-element m-select-input">
                            {this.props.config.data.availableLocales.map(locale =>
                                LanguageSelectLayout.createOption(locale, locale === this.props.config.data.currentLocale))}
                        </select>

                    </div>
                </div>
            </div>

        );
    }

}

LanguageSelectLayout.propTypes = {
    config: PropTypes.object,
    languageChange: PropTypes.func.isRequired
};
