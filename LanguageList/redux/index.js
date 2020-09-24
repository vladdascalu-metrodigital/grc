import { connect } from 'react-redux';
import LanguageList from '../index';

const COOKIE_NAME = 'MRC_LOCALE';

function mapStateToProps(state) {
    return {
        config: state.ui.config,
    };
}

function mapDispatchToProps() {
    return {
        languageChange: (locale) => {
            if (typeof locale !== 'string') {
                console.error('Wrong language code:', locale);
            }
            if (!locale.match(/^[a-zA-Z]{2}/)) {
                console.warn(`Expected Language with 2 chars but was '${locale}'`);
            }
            document.cookie = `${COOKIE_NAME}=${locale.substr(0, 2).toLowerCase()};`;
            window.location.reload();
        },
    };
}

const ConnectedLanguageList = connect(mapStateToProps, mapDispatchToProps)(LanguageList);

export default ConnectedLanguageList;
