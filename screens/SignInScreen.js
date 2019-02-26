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
import { Base64 } from 'js-base64';
const axios = require('axios');
var CryptoJs = require('crypto-js');


export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: '',
                  password: ''};
    this._signInAsync = this._signInAsync.bind(this);
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  _userRegistration = async () => {
    this.props.navigation.navigate('UserRegistration');
  }
  _signInAsync = async () => {
    var signInUsername = this.state.username;
    var signInPassword = this.state.password;
    console.log(CryptoJs.HmacSHA1(signInPassword, 'hop390n372oi').toString())
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/authenticate', {
      username: signInUsername,
      password: CryptoJs.HmacSHA1(signInPassword, 'hop390n372oi').toString(),
    }).then(response => {
      if(response.status == 200){
        AsyncStorage.setItem('username', signInUsername);
        AsyncStorage.setItem('token', CryptoJs.HmacSHA1(signInPassword, 'hop390n372oi').toString())
        this.props.navigation.navigate('Main');
      }

    })
    .catch(function (error) {
      console.log(error);
      Alert.alert(
        'Incorrect Information',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    })


  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 200}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 200}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Login" onPress={this._signInAsync} />
        <Button title="Register" onPress={this._userRegistration} />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
