import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
  Text
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Base64 } from 'js-base64';
const axios = require('axios');
var CryptoJs = require('crypto-js');


export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: '',
                  password: '',
                  activityIndicationShow: false};
    this._signInAsync = this._signInAsync.bind(this);
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  _userRegistration = async () => {
    this.props.navigation.navigate('UserRegistration');

  }

  componentDidMount(){

  }

  _signInAsync = async () => {
    var signInUsername = this.state.username;
    var signInPassword = this.state.password;
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
      <ImageBackground source={require('../assets/images/CJCC_SignIn.png')} style={styles.container}>
        <View style={{position: 'absolute', top:'32.6%', left: '20%', width: '100%'}}>
          <TextInput
            style={{fontFamily: 'montserrat', height: 40, width: '60.76%', backgroundColor: 'white', borderRadius: 5, paddingLeft: 10}}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput
            secureTextEntry={true}
            style={{fontFamily: 'montserrat', height: 40, width: '60.76%', marginTop: 7, backgroundColor: 'white', borderRadius: 5, paddingLeft: 10}}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
          />
          <View style={{marginTop: 7, width: '60.76%'}}>
            <Button color="red" title="Login" onPress={this._signInAsync} />
          </View>
          <View  style={{marginTop: 7, width: '60.76%'}}>
            <Button color="red" title="Register" onPress={this._userRegistration} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
