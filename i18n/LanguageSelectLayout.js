import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LanguageSelectLayout extends Component {

    countries = [
        {code: 'de', label: 'De'},
        {code: 'en', label: 'En'},
        {code: 'es', label: 'Es'},
        {code: 'ro', label: 'Ro'}
    ];

    static createOption(country) {
        return (
            <option key={country.code} value={country.code}>
                <span className="flag-icon flag-icon-{country.code}">&nbsp;</span> {country.label}
            </option>
        );
    }

    render() {
        return (
            <div className="m-select">
                <div className="m-input">
                    <div className="m-input-elementWrapper">
                        <select name="language"
                                value={this.props.currentLanguageCode}
                                onChange={this.props.languageChange}
                                className="m-input-element m-select-input">
                            {this.countries.map(LanguageSelectLayout.createOption)}
                        </select>

                    </div>
                </div>
            </div>

        );
    }

}

LanguageSelectLayout.propTypes = {
    currentLanguageCode: PropTypes.string,
    languageChange: PropTypes.func.isRequired
};
