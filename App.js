/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RootNavigation from '~/navigation/RootNavigation';
import {BaseTheme} from '~/themes';
import {store, persistor} from '~/store';
import '~/translations';

const App = () => {
  return (
    <NativeBaseProvider theme={BaseTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
