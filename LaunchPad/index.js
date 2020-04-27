import { connect } from 'react-redux';
import { auxControlEvent, currentUiPageTitleEvent } from '../Util/events';
import { navigationItemActivated } from '../Navigation';
import LaunchPadLayout from './LaunchPadLayout';
import './index.scss';

export { LaunchPadLayout };

const LaunchPad = connect(mapStateToProps, mapDispatchToProps)(LaunchPadLayout);

export default LaunchPad;

function mapStateToProps(state) {
    if (state.ui === undefined || state.ui === null) {
        return {};
    }
    return {
        config: state.ui.config,
        tablet: state.ui.tablet,
        desktop: state.ui.desktop,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateActiveItem: value => dispatch(navigationItemActivated(value)),
        updateUiPageTitle: value => dispatch(currentUiPageTitleEvent(value)),
        showAuxControl: value => dispatch(auxControlEvent(value)),
    };
}
