import { combineReducers } from 'redux';
import batchRequestReducer from './batchRequest';
import { STATE_KEY_BATCH_REQUEST } from '../../util/Constants';
import { reducer as burgerMenuReducer } from '../../../Navigation';
import { configReduxHelper } from '../reduxHelpers';

export default combineReducers(
    Object.assign({}, configReduxHelper.uiReducer, burgerMenuReducer, {
        [STATE_KEY_BATCH_REQUEST]: batchRequestReducer,
    })
);
