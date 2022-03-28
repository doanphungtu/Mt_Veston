import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

import reducer from './reducer';
import rootSaga from '~/sagas';

const devMode = process.env.NODE_ENV === 'development';

const persistConfig = {
  key: '@Base_NTB',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['session'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    let middleware = getDefaultMiddleware({thunk: false, serializableCheck: false}).concat(
      sagaMiddleware,
    );
    if (devMode) {
      middleware.push(logger);
    }
    return middleware;
  },
  devTools: devMode,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
