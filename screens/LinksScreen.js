import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  NativeModules,
  TouchableWithoutFeedback,
  Fragment,
  Alert,
  AsyncStorage,
  RefreshControl,
  FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import ProgramDetail from '../components/ProgramDetail';
import DetailedProgram from '../components/DetailedProgram';
const { StatusBarManager } = NativeModules;
const axios = require('axios');
var CryptoJs = require('crypto-js');

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      programs: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  static navigationOptions = {
    header: null,

  };

  async refresh() {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/retrieveusersclasses', {
      username: username,
      password: token,
    }).then(response => {
      if(response.status == 200){
        console.log()
        this.setState({
          programs: response.data[1]
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert(
        'Could not get you classes, please reload the app',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    })
  }

  componentDidMount() {
    this.refresh();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.refresh().then(() => {
      this.setState({refreshing: false});
    });
  }


  render() {
    return (
      <View style={[styles.container, {opacity: this.state.opacity}]}>
        <FlatList
        data={this.state.programs}
        renderItem={({item}) =>
        <TouchableOpacity key={item.name} onPress={this._handleProgramPress} activeOpacity={this.state.highlightOpacity}>
          <ProgramDetail key={item.name} program={item} />
        </TouchableOpacity>}
        refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.contentContainer}
      />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
});
