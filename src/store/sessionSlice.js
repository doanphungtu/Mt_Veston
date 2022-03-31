import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  userinfo: null,
};

const reducers = {
  changeLanguageAction(state, {payload}) {
    state.language = payload;
  },
  changeUserinfoAction(state, {payload}) {
    state.userinfo = payload;
  },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const {changeLanguageAction, changeUserinfoAction} = sessionSlice.actions;

export default {
  reducer: sessionSlice.reducer,
  initialState,
};
