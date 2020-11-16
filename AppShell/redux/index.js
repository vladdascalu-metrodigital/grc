import { connect } from 'react-redux';
import AppShell from '../index';

function mapStateToProps(state) {
    // Please create customerBasicInfo redux in different project which is neccessary e.g. in dunningEmail customerBasicInfo.js
    const customerName = state.customerBasicInfo ? state.customerBasicInfo.customerName : null;
    const customerId = state.customerBasicInfo ? state.customerBasicInfo.customerId : null;
    return {
        config: state.ui.config,
        customerName: customerName,
        customerId: customerId,
    };
}

const ConnectedAppShell = connect(mapStateToProps)(AppShell);

export default ConnectedAppShell;
