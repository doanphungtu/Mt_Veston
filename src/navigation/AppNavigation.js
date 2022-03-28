import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import * as Routes from '~/constants/Routes';
import Home from '~/screens/Home';
import Test from '~/screens/Test';
import {navigationRef} from '~/utils/navigationHelpers';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Routes.HOME}>
        <Stack.Screen name={Routes.HOME} component={Home} />
        <Stack.Screen name={Routes.TEST} component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
