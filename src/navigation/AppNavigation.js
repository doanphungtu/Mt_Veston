import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {LogBox} from 'react-native';

import * as Routes from '~/constants/Routes';
import FillPhone from '~/screens/FillPhone';
import ForgotPassword from '~/screens/ForgotPassword';
import Home from '~/screens/Home';
import Signin from '~/screens/Signin';
import Signup from '~/screens/Signup';
import Test from '~/screens/Test';
import VerifyPhone from '~/screens/VerifyPhone';
import {navigationRef} from '~/utils/navigationHelpers';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Routes.HOME}>
        <Stack.Screen name={Routes.HOME} component={Home} />
        <Stack.Screen name={Routes.TEST} component={Test} />
        <Stack.Screen name={Routes.SIGNIN} component={Signin} options={{headerShown: false}} />
        <Stack.Screen name={Routes.SIGNUP} component={Signup} options={{headerShown: false}} />
        <Stack.Screen
          name={Routes.FILL_PHONE}
          component={FillPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.VERIFY_PHONE}
          component={VerifyPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.FORGOT_PASSWORD}
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
