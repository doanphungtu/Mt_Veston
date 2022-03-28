import {combineReducers} from 'redux';
import session from './sessionSlice';

const rootReducer = combineReducers({
  session: session.reducer,
});

// const initialState = {
//     session: session.initialState
// }

export default (state, action) => {
  // if (action.type === 'CLEAR_DATA') {
  //     return rootReducer(initialState, action)
  // }
  return rootReducer(state, action);
};
