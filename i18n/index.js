import { connect } from "react-redux";
import LanguageSelectLayout from "./LanguageSelectLayout";

const LanguageSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelectLayout);

export default LanguageSelect;

const COOKIE_NAME = 'MRC_LOCALE';

function getCountryCode() {
    const myCookies = document.cookie.split(';').filter(c => c.indexOf(COOKIE_NAME + '=') === 0);
    if(myCookies.length) {
        return myCookies[0].substr(COOKIE_NAME.length + 1);
    } else if(window.navigator.language) {
        return window.navigator.language;
    } else {
        return 'en';
    }
}

function mapStateToProps(state) {
    return {
        config: state.ui.config,
        tablet: state.ui.tablet,
        desktop: state.ui.desktop,
        currentLanguageCode: getCountryCode()
    };
}

function mapDispatchToProps() {
    return {
        languageChange: (event) => {
            const value = event.target.value;
            if(typeof value !== 'string' || value.length !== 2) {
                console.error('Wrong language code:', value);
            }
            document.cookie = `${COOKIE_NAME}=${value}`;
            window.location.reload();
        }
    };
}
