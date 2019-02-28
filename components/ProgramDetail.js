import React, { Component } from 'react';
import { View, Text, StyleSheet, Overlay, TouchableWithoutFeedback, Alert } from 'react-native';
var moment = require('moment');

class ProgramDetail extends Component{
  constructor(props){
    super(props);
    this.state = {date_start: '',
                  date_end: ''};

  }

  componentDidMount() {
    start_date = this.timeConverter(this.props.program.time_start);
    end_date = this.timeConverter(this.props.program.time_end);
    this.setState({date_start: start_date,
                  date_end: end_date})
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

  _onProgramPress(){
    Alert.alert('ifd');
  }

  render() {
    return(
        <View style={styles.viewstyle}>
            <Text>{this.props.program.name}</Text>
            <Text>{this.state.date_start}</Text>
            <Text>{this.state.date_end}</Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 20
  }
});

export default ProgramDetail;
