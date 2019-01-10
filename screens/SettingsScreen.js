import React from 'react';
import {
  Button,
  AsyncStorage,
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {

    return(
      <Button title="Sign Out" onPress={this._signOutAsync} />
    ) ;
  }
}

/*<ExpoConfigView />*/
