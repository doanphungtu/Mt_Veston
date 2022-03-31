import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {LogBox} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import * as Routes from '~/constants/Routes';
import Account from '~/screens/Account';
import AddCustomer from '~/screens/AddCustomer';
import ChangePassword from '~/screens/ChangePassword';
import DetailCustomer from '~/screens/DetailCustomer';
import FillPhone from '~/screens/FillPhone';
import Filter from '~/screens/Filter';
import ForgotPassword from '~/screens/ForgotPassword';
import Home from '~/screens/Home';
import Setting from '~/screens/Setting';
import Signin from '~/screens/Signin';
import Signup from '~/screens/Signup';
import Test from '~/screens/Test';
import VerifyPhone from '~/screens/VerifyPhone';
import {navigationRef} from '~/utils/navigationHelpers';

const BottomTabNavigation = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['NativeBase:']);

const BottomTabs = () => {
  return (
    <BottomTabNavigation.Navigator>
      <BottomTabNavigation.Screen
        name={Routes.HOME}
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name={'home'}
                size={30}
                color={focused ? '#0A52A8' : 'grey'}
              />
            );
          },
        }}
      />
      <BottomTabNavigation.Screen
        name={Routes.SETTING}
        component={Setting}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons name={'cog'} size={30} color={focused ? '#0A52A8' : 'grey'} />
            );
          },
        }}
      />
    </BottomTabNavigation.Navigator>
  );
};

const AppNavigation = () => {
  const session = useSelector(state => state.session);

  const initialRouteName = session?.userinfo ? Routes.HOME_TAB : Routes.SIGNIN;
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name={Routes.TEST} component={Test} />
        <Stack.Screen
          name={Routes.HOME_TAB}
          component={BottomTabs}
          options={{headerShown: false}}
        />
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
        <Stack.Screen name={Routes.FILTER} component={Filter} options={{headerShown: false}} />
        <Stack.Screen
          name={Routes.DETAIL_CUSTOMER}
          component={DetailCustomer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.ADD_CUSTOMER}
          component={AddCustomer}
          options={{headerShown: false}}
        />
        <Stack.Screen name={Routes.ACCOUNT} component={Account} options={{headerShown: false}} />
        <Stack.Screen
          name={Routes.CHANGE_PASSWORD}
          component={ChangePassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
