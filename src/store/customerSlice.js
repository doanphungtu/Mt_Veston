import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  filter: {
    filterByName: '',
    filterByPhonenumber: '',
    filterStartDate: null,
    filterEndDate: null,
  },
};

const reducers = {
  getCustomerAction(state, {payload}) {
    state.data = payload;
  },
  addCustomerAction(state, {payload}) {
    state.data.push(payload);
  },
  changeCustomerAction(state, {payload}) {
    const index = state.data.findIndex(e => e?.id === payload?.id);
    state.data[index] = payload;
  },
  removeCustomerAction(state, {payload}) {
    const newData = state.data.filter(e => e?.id !== payload?.id);
    state.data = newData;
  },
  setFilterByAction(state, {payload}) {
    state.filter = {...state.filter, ...payload};
  },
};

export const customerSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const {
  getCustomerAction,
  addCustomerAction,
  changeCustomerAction,
  removeCustomerAction,
  setFilterByAction,
} = customerSlice.actions;

export default {
  reducer: customerSlice.reducer,
  initialState,
};
