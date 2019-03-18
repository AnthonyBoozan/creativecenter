import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Picker, AsyncStorage, TouchableOpacity, Animated, Image, Easing } from 'react-native';
var equal = require('fast-deep-equal');
const axios = require('axios');
import sty from "../constants/Button.js";
import { WebBrowser, Notifications } from 'expo';


class DetailedProgramMyPrograms extends Component {
  constructor(props){
    super(props);
    this.state = {chosenlevel: '',
                  program: {},
                  valid_levels: [],
                  showCheckIn: false,
                  level: ''};
    this.springValue = new Animated.Value(0.3);
    this.checkIn = this.checkIn.bind(this);
  }

  buttonPressAction = async () => {
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    notification_key = 'notification_at_'+this.state.program['time_start'].toString();
    notification_id = await AsyncStorage.getItem(notification_key)
    levels = JSON.parse(await AsyncStorage.getItem('levels'));
    class_id = this.state.program.class_id;
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/dropclass', {
      username: username,
      password: token,
      class_id: class_id,
    }).then(response => {
      if(response.status == 200){
        Notifications.cancelScheduledNotificationAsync(parseInt(notification_id))
        AsyncStorage.removeItem(notification_key);
        this.props.handler();
      }

    }).catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    this.spring();
    this.getValidLevels();
    this.checkInStatus();

  }

  componentDidUpdate(prevProps){
    /*if(this.props.program.item != undefined)
    if(this.props.program.item !== prevProps.program.item && this.props.progra){
      this.getValidLevels();
    }*/

    this.spring();
    if(prevProps.program.item !== this.props.program.item){
      this.getValidLevels();
    }
    if(prevProps.show != this.props.show){
      this.checkInStatus();
      if(prevProps.show == false || prevProps.show == undefined){
        this.getLevelName();
      }
    }
  }

  cleanseLabelString(level) {
    level = level.replace(/[_-]/g, " ");
    level = level.charAt(0).toUpperCase() + level.slice(1);
    return level
  }

  async getLevelName() {
    levels = JSON.parse(await AsyncStorage.getItem('levels'));
    temp_level = this.cleanseLabelString(levels[this.props.program.item.teacher_level]);
    this.setState({level: temp_level});
  }

  async checkInStatus(){
    checkInClassId = await AsyncStorage.getItem('checkInClassId');
    if(this.props.program.item.class_id == parseInt(checkInClassId)){
      this.setState({showCheckIn: true});
    }
    else{
      this.setState({showCheckIn: false});
    }
  }

  spring() {
    this.springValue.setValue(0.3)
    Animated.loop(
      Animated.spring(
        this.springValue,
        {
          toValue: 1,
          friction: 1
        }
      )
    ).start()
  }

  async getValidLevels(){
    temp_levels = {}
    levels = JSON.parse(await AsyncStorage.getItem('levels'));
    eligibleclasses = JSON.parse(await AsyncStorage.getItem('eligible_classes'));
    if(this.props.program.item.class_id !== undefined && eligibleclasses[this.props.program.item.class_id] != undefined){
      eligibleclasses[this.props.program.item.class_id].map(function(x){
        if(x < 100){

          for (var level in levels){
            if(level <= x && !temp_levels.hasOwnProperty(levels[level])){
              temp_levels[levels[level]] = level;
            }
          }

        }
        else{
          if(!temp_levels.hasOwnProperty(levels[level])){
            temp_levels[levels[level]] = x;
          }

        }
      });

    }
    keysSorted = Object.keys(temp_levels).sort(function(a,b){return temp_levels[b]-temp_levels[a]})
    this.setState({program: this.props.program.item,
                    valid_levels: keysSorted});


  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + (hour % 12) + ':' + min;
    if(hour > 12){
      time = time + ' PM';
    }
    else{
      time = time + ' AM'
    }

    return time;
  }

  cleanseLabelString(level) {
    level = level.replace(/[_-]/g, " ");
    level = level.charAt(0).toUpperCase() + level.slice(1);
    return level
  }

  async checkIn(){
    username = await AsyncStorage.getItem('username');
    token = await AsyncStorage.getItem('token');
    class_id = this.state.program.class_id;
    axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/checkin', {
      username: username,
      password: token,
      class_id: class_id
    }).then(response => {
      if(response.status == 200){
        this.setState({showCheckIn: false});
        AsyncStorage.setItem('checkInClassId', '0');

      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    if(!this.props.show){
      return null;
    }
    else if(this.state.showCheckIn){
      return(
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} pointerEvents='box-none'>
          <View style={styles.textbox}>
            <View style={styles.classnameview}>
              <Text style={styles.classname}>{this.props.program.item.name}</Text>
            </View>
            <View style={styles.classnameview}>
              <Text style={styles.rolename}>{this.state.level}</Text>
            </View>
            <View style={styles.timebox}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}> Time Start:<Text style={{fontWeight: 'normal', fontSize: 14}}> {this.timeConverter(this.props.program.item.time_start)} </Text></Text>
            </View>
            <View style={styles.timebox}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}> Time End:<Text style={{fontWeight: 'normal', fontSize: 14}}> {this.timeConverter(this.props.program.item.time_end)} </Text> </Text>
            </View>

            <Text style={styles.description}>{this.props.program.item.description}</Text>
            <TouchableOpacity onPress={this.checkIn} style={styles.drop}>
                <Animated.View style={{
                  backgroundColor: "red",
                  padding: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  transform: [{scale: this.springValue}],
                  fontFamily: 'open-sans'
                }}>
                  <Text style={{color: 'white'}}>Check in!</Text>
                </Animated.View>
              </TouchableOpacity>
          </View>
        </View>
        );
    }
    else if((this.props.program.item.time_start - 1800) < (new Date()).getTime() / 1000){
      return(
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} pointerEvents='box-none'>
          <View style={styles.textbox}>
            <View style={styles.classnameview}>
              <Text style={styles.classname}>{this.props.program.item.name}</Text>
            </View>
            <View style={styles.classnameview}>
              <Text style={styles.rolename}>{this.state.level}</Text>
            </View>
            <View style={styles.timebox}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}> Time Start:<Text style={{fontWeight: 'normal', fontSize: 14}}> {this.timeConverter(this.props.program.item.time_start)} </Text></Text>
            </View>
            <View style={styles.timebox}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}> Time End:<Text style={{fontWeight: 'normal', fontSize: 14}}> {this.timeConverter(this.props.program.item.time_end)} </Text> </Text>
            </View>
            <Text style={styles.description}>{this.props.program.item.description}</Text>
          </View>
        </View>
        );
    }
    else{
      return(
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} pointerEvents='box-none'>
            <View style={styles.textbox}>
              <View style={styles.classnameview}>
                <Text style={styles.classname}>{this.props.program.item.name}</Text>
              </View>
              <View style={styles.classnameview}>
                <Text style={styles.rolename}>{this.state.level}</Text>
              </View>
              <View style={styles.timebox}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}> Time Start:<Text style={{fontWeight: 'normal', fontSize: 14}}> {this.timeConverter(this.props.program.item.time_start)} </Text></Text>
              </View>
              <View style={styles.timebox}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}> Time End:<Text style={{fontWeight: 'normal', fontSize: 14}}> {this.timeConverter(this.props.program.item.time_end)} </Text> </Text>
              </View>

              <Text style={styles.description}>{this.props.program.item.description}</Text>
              <TouchableOpacity onPress={this.buttonPressAction} style={styles.drop}>
                <View style={styles.button}>
                  <Text style={{color: 'white'}}>Drop Class</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
};

const styles = StyleSheet.create({
  textbox: {
    position: 'absolute',
    opacity: 1,
    backgroundColor: '#F0FFFF',
    height: '60%',
    width: '75%',
    zIndex: 6,
    fontFamily: 'open-sans',
    borderRadius: 8

  },
  classnameview: {
    left: 5,
    alignItems: 'center'
  },
  classname: {
    fontSize: 18,
    fontFamily: 'open-sans',
    fontWeight: 'bold',
  },
  rolename: {
    fontSize: 16,
    fontFamily: 'open-sans',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    left: 5,
    borderRadius: 1,
    borderColor: 'black'
  },
  button: {
    backgroundColor: "red",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    fontFamily: 'open-sans',
  },
  drop: {
    position: 'absolute',
    width: '90%',
    height: '11%',
    right: 0,
    bottom: 0,
    margin: 16,
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    margin: 16,
    height: '11%',
    width: 150,
    backgroundColor: "lightblue",
  },
  timebox: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default DetailedProgramMyPrograms;
