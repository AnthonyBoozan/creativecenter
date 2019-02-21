import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import UserRegistrationScreen from '../screens/UserRegistrationScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: SignInScreen,
  Main: MainTabNavigator,
  AuthLoading: AuthLoadingScreen,
  UserRegistration: UserRegistrationScreen,
}, {
  initialRouteName: 'AuthLoading',
});
