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
  FlatList,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import ProgramDetail from '../components/ProgramDetail';
import DetailedProgram from '../components/DetailedProgram';
import { withNavigationFocus } from 'react-navigation';
const { StatusBarManager } = NativeModules;
const axios = require('axios');



class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      viewOverlay: false,
      programs: [],
      eligibleclasses: [],
      opacity: 1.0,
      highlightOpacity: .2,
      highlightedClass: {item: {},
      filterOptions: {
        name: '',
        time_start: 0,
        time_end: 0,
        level: 0,
      }}
    };
    this.viewHandlerHome = this.viewHandlerHome.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.refreshEligibleClasses();
    this.refreshAllClasses();
    this.getClassLevels();
    this.getTeachersClasses();
  }



  componentDidUpdate(prevProps) {
    if(prevProps.isFocused !== this.props.isFocused){
      this.refreshAllClasses();

    }
  }

  viewHandlerHome() {
    this.setState({
      viewOverlay: false,
      opacity: 1.0,
      highlightOpacity: .2,
    })
    this.refreshEligibleClasses();
    this.refreshAllClasses();
    this.getTeachersClasses();
    return this.state.viewOverlay;
  }

  async refreshAllClasses() {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/getallclasses', {
      username: username,
      password: token,
    }).then(response => {
      if(response.status == 200 && response.data[1] !== undefined){
        this.setState({
          programs: response.data[1]
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  async refreshEligibleClasses() {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/eligibleclasses', {
      username: username,
      password: token,
    }).then(response => {
      if(response.status == 200){
        temp_eligible_classes = {};
        (response.data[1]).map(function(x) {
          if(temp_eligible_classes[x.class_id] == null){
            temp_eligible_classes[x.class_id]=[x.level_id];
          }
          else{
            (temp_eligible_classes[x.class_id]).push(x.level_id);
          }
        });
        this.setState({eligibleclasses: temp_eligible_classes});
        AsyncStorage.setItem('eligible_classes', JSON.stringify(temp_eligible_classes));
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  async getClassLevels() {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/classlevels', {
      username: username,
      password: token,
    }).then(response => {
      if(response.status == 200){
        levels = {};
        (response.data[1]).map(function(x) {
          levels[x.id]=x.name;
        });
        AsyncStorage.setItem('levels', JSON.stringify(levels));
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  async getTeachersClasses() {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/retrieveusersclasses', {
      username: username,
      password: token,
    }).then(response => {
      if(response.status == 200){
        AsyncStorage.setItem('teachers_classes', JSON.stringify(response.data[1]));
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
    this.refreshEligibleClasses();
    this.refreshAllClasses();
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
      <DetailedProgram show={this.state.viewOverlay} _handleProgramPress={this._handleDetailedProgramPress} program={this.state.highlightedClass} handler = {this.viewHandlerHome}/>

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
export default withNavigationFocus(HomeScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    flex: 1,
    backgroundColor: '#2E8FB6',
  },
  contentContainer: {


  },
});
