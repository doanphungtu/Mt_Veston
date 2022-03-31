import {combineReducers} from 'redux';
import session from './sessionSlice';
import customer from './customerSlice';

const rootReducer = combineReducers({
  session: session.reducer,
  customer: customer.reducer,
});

export default (state, action) => {
  return rootReducer(state, action);
};
