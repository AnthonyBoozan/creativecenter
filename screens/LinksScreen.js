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
      highlightedClass: {item: {}}
    };
  }

  static navigationOptions = {
    header: null,

  };

  componentDidMount() {
    this.initialSetup();

  }

  async initialSetup(){
    progs = await AsyncStorage.getItem('teachers_classes');
    this.setState({programs: JSON.parse(progs)});
    console.log(this.state.highlightedClass);
  }

  async refreshTeachersClasses() {
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

  async refresh() {
    this.refreshTeachersClasses();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.refresh().then(() => {
      this.setState({refreshing: false});
    });
  }


  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={() => this._handleExitOverlay()}>
          <View style={[styles.container, {opacity: this.state.opacity}]}>
            <FlatList
            data={this.state.programs}
            renderItem={({item}) =>
            <TouchableOpacity key={item.class_id} onPress={() => this._handleProgramPress(item)} activeOpacity={this.state.highlightOpacity}>
              <ProgramDetail program={item} />
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
        </TouchableWithoutFeedback>
        <React.Fragment key={this.state.highlightedClass}>
          <DetailedProgram show={this.state.viewOverlay} _handleProgramPress={this._handleDetailedProgramPress} program={this.state.highlightedClass}/>
        </React.Fragment>
      </React.Fragment>
    );
  }

  _handleProgramPress = (item) => {
    if(this.state.viewOverlay){
      this.setState({
        viewOverlay: false,
        opacity: 1.0,
        highlightOpacity: .2,
        })
    }
    else{
      this.setState({
        viewOverlay: !this.state.viewOverlay,
        opacity: .4,
        highlightOpacity: 1,
        highlightedClass: {item}
      })
    }
  };

  _handleDetailedProgramPress = () => {
    if(this.state.viewOverlay){
      this.setState({
        viewOverlay: false,
        opacity: 1.0,
        highlightOpacity: .2,
        })
    }
    else{
      this.setState({
        viewOverlay: !this.state.viewOverlay,
        opacity: .4,
        highlightOpacity: 1
      })
    }
  };

  _handleExitOverlay = () => {
      if(this.state.viewOverlay){
        this.setState({
          viewOverlay: false,
          opacity: 1.0,
          highlightOpacity: .4
        })
      }
    };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    flex: 1,
    backgroundColor: '#B2B2B2',
  },
  contentContainer: {
  },
});
