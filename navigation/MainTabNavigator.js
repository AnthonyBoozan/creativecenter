import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Available Classes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'ios-home'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: '#fefefe',
    style: {
        backgroundColor: 'red',
    }
  }
};

const ProgramsStack = createStackNavigator({
  Programs: LinksScreen,
});

ProgramsStack.navigationOptions = {
  tabBarLabel: 'My Classes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'}
    />
  ),
  tabBarOptions: {
    activeTintColor: '#fefefe',
    style: {
        backgroundColor: 'red',
    }
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
  tabBarOptions: {
    activeTintColor: '#fefefe',
    style: {
        backgroundColor: 'red',
    }
  }
};

export default createBottomTabNavigator({
  HomeStack,
  ProgramsStack,
  SettingsStack,
});
