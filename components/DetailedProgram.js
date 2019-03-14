import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Picker, AsyncStorage, Alert } from 'react-native';
var equal = require('fast-deep-equal');
const axios = require('axios');
import withPreventDoubleClick from '../constants/withPreventDoubleClick';
import { WebBrowser, Notifications } from 'expo';

const ButtonEx = withPreventDoubleClick(Button);


class DetailedProgram extends Component {
  constructor(props){
    super(props);
    this.state = {chosenlevel: '',
                  program: {},
                  valid_levels: [],
                  valid_class: false};
  }

  buttonPressAction = async () => {
    if(await this.checkClassTimeslot()){
      username = await AsyncStorage.getItem('username');
      token = await AsyncStorage.getItem('token');
      levels = JSON.parse(await AsyncStorage.getItem('levels'));
      chosenlevel = 0;
      class_id = this.state.program.class_id;
      for(i in levels){
        if(levels[i] == this.state.chosenlevel){
          chosenlevel = i;
        }
      }
      axios.post('http://ec2-54-218-225-131.us-west-2.compute.amazonaws.com:3000/api/signup', {
        username: username,
        password: token,
        level: chosenlevel,
        class_id: class_id
      }).then(response => {
        if(response.status == 200){
          this.setNotification();
          this.props.handler();
        }

      }).catch(function (error) {
        console.log(error);
      })
    }
    else{
      Alert.alert(
        'You already have a class for this timeslot',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  componentDidMount(){
    this.getValidLevels();
  }

  setNotification(){
    var dateObj = new Date((this.state.program['time_start'] * 1000) - 1800000);
    localNotification = {title: 'Time for a check in!', body: 'You have a class in 30 minutes! Please check in.'};
    schedulingOptions = {time: dateObj};

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }

  async checkClassTimeslot(){
    teachers_classes = JSON.parse(await AsyncStorage.getItem('teachers_classes'));
    time_start = this.state.program['time_start'];
    time_end = this.state.program['time_end'];
    for(i in teachers_classes){

      if((time_start <= teachers_classes[i]['time_start'] && time_end <= teachers_classes[i]['time_end'] && time_end >= teachers_classes[i]['time_start']) ||
       (time_start >= teachers_classes[i]['time_start'] && time_end <= teachers_classes[i]['time_end']) ||
        (time_start <= teachers_classes[i]['time_start'] && time_end >= teachers_classes[i]['time_end']) ||
      (time_start >= teachers_classes[i]['time_start'] && time_end >= teachers_classes[i]['time_end'] && time_start <= teachers_classes[i]['time_end'])){
        return false
      }
    }
    return true;
  }

  componentDidUpdate(prevProps){
    if(prevProps.show == true && this.props.show == false){
      this.setState({valid_class: false});
    }
    else if(prevProps.show == false && this.props.show == true){
      this.getValidLevels();
    }
  }

  async getValidLevels(){
    temp_levels = {}
    levels = JSON.parse(await AsyncStorage.getItem('levels'));
    eligibleclasses = JSON.parse(await AsyncStorage.getItem('eligible_classes'));
    if(this.props.program.item.class_id !== undefined && eligibleclasses[this.props.program.item.class_id] !== undefined){
      if(!this.state.valid_class && this.props.show == true){
        this.setState({valid_class: true});
      }
      eligibleclasses[this.props.program.item.class_id].map(function(x){
        for (var level in levels){
          if(level == x && !temp_levels.hasOwnProperty(levels[level])){
            temp_levels[levels[level]] = level;
          }
        }
      });
    }
    else{
      if(this.state.valid_class && this.props.show == true){
        this.setState({valid_class: false});
      }

    }
    keysSorted = Object.keys(temp_levels).sort(function(a,b){return temp_levels[b]-temp_levels[a]})
    this.setState({program: this.props.program.item,
                    valid_levels: keysSorted,
                    chosenlevel: keysSorted[0]});
  }

  cleanseLabelString(level) {
    level = level.replace(/[_-]/g, " ");
    level = level.charAt(0).toUpperCase() + level.slice(1);
    return level
  }

  pickerItemRender(){
    return this.state.valid_levels.map(level =>
      <Picker.Item key={level} label={this.cleanseLabelString(level)} value={level} />

    )
  }

  renderSignupOptions(){
    if(this.state.valid_class == true){
      return(
        <React.Fragment>
        <ButtonEx onPress={this.buttonPressAction} title="Test"/>
        <Picker
          selectedValue={this.state.chosenlevel}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({chosenlevel: itemValue,}
            )}>
          {this.pickerItemRender()}
        </Picker>
        </React.Fragment>
      )
    }
    else{
      return null;
    }
  }

  render() {
    if(!this.props.show){
      return null;
    }
    else{
      return(
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} pointerEvents='box-none'>
            <View style={styles.textbox}>
              <Text>{this.props.program.item.name}</Text>
              <Text>{this.props.program.item.description}</Text>
              {this.renderSignupOptions()}
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
    backgroundColor: 'white',
    height: '60%',
    width: '75%',
    zIndex: 6
  }
});

export default DetailedProgram;
