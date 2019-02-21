import React from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Base64 } from 'js-base64';
const axios = require('axios');

export default class UserRegistrationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {firstname: '',
                  lastname: '',
                  username: '',
                  email: '',
                  passwordone: '',
                  passwordtwo: ''};
    this._register = this._register.bind(this);
    this._back = this._back.bind(this);
  }

  static navigationOptions = {
    headerTitle: 'test',

  }

  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  _back = async () => {
    console.log('back to userreg')
    this.props.navigation.navigate('Auth');
  }

  _register = async () => {
    if(this.validateEmail(this.state.email)) {
      if(this.state.passwordone == this.state.passwordtwo && this.state.passwordone != '' && this.firstname != '' && this.lastname != '' && this.username != ''){
        axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/register', {
          username: this.state.username,
          password: this.state.passwordone,
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
        }).then(response => {
          if(response.status == 200){
            Alert.alert(
              'An email has been sent to your email, please confirm your registration',
              '',
              [
                {text: 'OK', onPress: this._back}
              ],
              { cancelable: false }
            )
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
      }
      else{
        Alert.alert(
          'Passwords do not match',
          '',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    }
    else{
      Alert.alert(
        'Invalid email',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 200}}
          placeholder="First name"
          onChangeText={(firstname) => this.setState({firstname})}
        />
        <TextInput
          style={{height: 40, width: 200}}
          placeholder="Last name"
          onChangeText={(lastname) => this.setState({lastname})}
        />
        <TextInput
          style={{height: 40, width: 200}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40, width: 200}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 200}}
          placeholder="Password"
          onChangeText={(passwordone) => this.setState({passwordone})}
        />
        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 200}}
          placeholder="Confirm Password"
          onChangeText={(passwordtwo) => this.setState({passwordtwo})}
        />
        <Button title="Register" onPress={this._register} />
        <Button title="Back" onPress={this._back} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
