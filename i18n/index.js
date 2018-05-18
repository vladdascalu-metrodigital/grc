import { connect } from "react-redux";
import LanguageSelectLayout from "./LanguageSelectLayout";

const LanguageSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelectLayout);

export default LanguageSelect;

const COOKIE_NAME = 'MRC_LOCALE';

function mapStateToProps(state) {
    return {
        config: state.ui.config,
        tablet: state.ui.tablet,
        desktop: state.ui.desktop,
    };
}

function mapDispatchToProps() {
    return {
        languageChange: (event) => {
            const value = event.target.value;
            if(typeof value !== 'string') {
                console.error('Wrong language code:', value);
            }
            document.cookie = `${COOKIE_NAME}=${value}`;
            window.location.reload();
        }
    };
}
