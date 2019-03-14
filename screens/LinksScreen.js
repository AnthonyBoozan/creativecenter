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
import ProgramDetailMyPrograms from '../components/ProgramDetailMyPrograms';
import DetailedProgramMyPrograms from '../components/DetailedProgramMyPrograms';
import HomeScreen from '../screens/HomeScreen';
const { StatusBarManager } = NativeModules;
import { withNavigationFocus } from 'react-navigation';
const axios = require('axios');
var CryptoJs = require('crypto-js');

class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      programs: [],
      highlightedClass: {item: {}},
      checkInClassId: 0,
    };
    this.viewHandlerLink = this.viewHandlerLink.bind(this);
  }

  static navigationOptions = {
    header: null,

  };

  componentDidMount() {
    this.initialSetup();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isFocused !== this.props.isFocused){
      this.refreshTeachersClasses();
      this.checkForCheckIn()
    }
  }

  viewHandlerLink() {
    this.setState({
      viewOverlay: false,
      opacity: 1.0,
      highlightOpacity: .2,
    })
    this.refreshTeachersClasses();
    return this.state.viewOverlay;
  }

  async initialSetup(){
    progs = JSON.parse(await AsyncStorage.getItem('teachers_classes'));
    checkInClassId = await AsyncStorage.getItem('checkInClassId');
    this.setState({programs: progs});
    if(checkInClassId != '0'){
        for(i in progs){
          if(progs[i]['class_id'] == checkInClassId){
            this._handleProgramPress(progs[i]);
          }
        }
    }
  }

  async checkForCheckIn(){
    progs = JSON.parse(await AsyncStorage.getItem('teachers_classes'));
    now = (new Date()).getTime() / 1000;
    for(i in progs){
      if(now > progs[i]['time_start'] - 1800000){
        if((progs[i]['time_start'] > now) && progs[i]['checked_in'] != true){
          AsyncStorage.setItem('checkInClassId', progs[i]['class_id'].toString());
        }
      }
    }
  }

  async refreshTeachersClasses() {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/retrieveusersclasses', {
      username: username,
      password: token,
    }).then(response => {
      if(response.status == 200){
        this.setState({
          programs: response.data[1]
        })
        AsyncStorage.setItem('teachers_classes', JSON.stringify(response.data[1]));
      }
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert(
        'Could not get your classes, please reload the app',
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
              <ProgramDetailMyPrograms program={item} />
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
          <DetailedProgramMyPrograms show={this.state.viewOverlay} _handleProgramPress={this._handleDetailedProgramPress} program={this.state.highlightedClass} handler = {this.viewHandlerLink}/>
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

export default withNavigationFocus(LinksScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    flex: 1,
    backgroundColor: '#89F5FF',
  },
  contentContainer: {
  },
});
