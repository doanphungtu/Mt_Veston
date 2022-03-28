import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {get} from 'lodash';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

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
    </SafeAreaProvider>
  );
};

export default RootNavigation;
