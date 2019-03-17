import React from 'react';
import {
  Button,
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: 'red'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {

    return(

      <TouchableOpacity onPress={this._signOutAsync} style={styles.button}>
        <View>
          <Text style={{color: 'white'}}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    padding: 12,
    margin: 16,
    width: '50%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  }
});

/*<ExpoConfigView />*/
