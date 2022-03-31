import {get} from 'lodash';
import {StatusBar} from 'native-base';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import AppNavigation from './AppNavigation';

const RootNavigation = () => {
  const session = useSelector(state => get(state, 'session'));
  const {i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(session?.language);
  }, [session?.language]);

  return (
    <SafeAreaProvider>
      <AppNavigation />
      <StatusBar backgroundColor={'#ffffff'} barStyle="dark-content" />
    </SafeAreaProvider>
  );
};

export default RootNavigation;
