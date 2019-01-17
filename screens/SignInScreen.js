import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Alert
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: '',
                  password: ''};
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  _signInAsync = async () => {
    if(this.state.username == "tony" && this.state.password == "a"){
      await AsyncStorage.setItem('userToken', this.state.password);
      this.props.navigation.navigate('Main');
    }
    else{
      Alert.alert(
        'Incorrect Information',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 200, color: 'black', backgroundColor: 'white'}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 200, color: 'black'}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ed1c24',
  },
});
