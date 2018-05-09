import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LanguageSelectLayout extends Component {

    static createOption(country) {
        // const languageclass = 'flag-icon flag-icon-'+country.code;
        return (
            <option key={country} value={country}>
                {/*<span className={languageclass}>{country}</span>*/}
                {country}
            </option>
        );
    }

    render() {
        if (!this.props.config.data) return null;
        console.log('Current language: ' + this.props.currentLanguageCode);
        return (
            <div className="m-select">
                <div className="m-input">
                    <div className="m-input-elementWrapper">
                        <select name="language"
                                value={this.props.currentLanguageCode}
                                onChange={this.props.languageChange}
                                className="m-input-element m-select-input">
                            {this.props.config.data.availableLanguages.map(LanguageSelectLayout.createOption)}
                        </select>

                    </div>
                </div>
            </div>

        );
    }

}

LanguageSelectLayout.propTypes = {
    currentLanguageCode: PropTypes.string,
    config: PropTypes.object,
    languageChange: PropTypes.func.isRequired
};
