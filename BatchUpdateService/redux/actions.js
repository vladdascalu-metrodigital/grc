import { configReduxHelper } from './reduxHelpers';

////////////////////////// REDUX ACTIONS /////////////////////
// example of redux action
// import { ADD_TODO } from "./actionTypes";

// export const addTodo = content => ({
//   type: ADD_TODO,
//   payload: {
//     content
//   }
// });

///////////////// FETCH ACTIONS - calling backend ///////////

export function fetchConfig(dispatch) {
    return configReduxHelper.configLoadingHelpers.createLoader(dispatch)();
}
