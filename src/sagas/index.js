import {all, takeLatest} from 'redux-saga/effects';
import {changeLanguageAction} from '~/store/sessionSlice';
import {changeLanguage} from './sessionSagas';

export default function* rootSaga() {
  yield all([takeLatest(changeLanguageAction.type, changeLanguage)]);
}
