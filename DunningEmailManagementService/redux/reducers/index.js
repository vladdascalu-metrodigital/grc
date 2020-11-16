import { combineReducers } from 'redux';
import dunningEmailManagementReducer from './dunningEmailMangement';
import customerBasicInfoReducer from './customerBasicInfo';
import { STATE_KEY_CUSTOMER_BASIC_INFO, STATE_KEY_CUSTOMERS_IN_GROUP } from '../../util/Constants';
import { reducer as burgerMenuReducer } from '../../../Navigation';
import { configReduxHelper } from '../reduxHelpers';

export default combineReducers(
    Object.assign({}, configReduxHelper.uiReducer, burgerMenuReducer, {
        [STATE_KEY_CUSTOMERS_IN_GROUP]: dunningEmailManagementReducer,
        [STATE_KEY_CUSTOMER_BASIC_INFO]: customerBasicInfoReducer,
    })
);
