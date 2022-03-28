import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};

const reducers = {
  changeLanguageAction(state, {payload}) {
    state.language = payload;
  },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const {changeLanguageAction} = sessionSlice.actions;

export default {
  reducer: sessionSlice.reducer,
  initialState,
};
