import React, { Component } from 'react';
import { View, Text, StyleSheet, Overlay, TouchableWithoutFeedback, Alert } from 'react-native';
var moment = require('moment');

class ProgramDetail extends Component{
  constructor(props){
    super(props);
    this.state = {date_start: '',
                  date_end: '',
                  description: ''};

  }

  componentDidMount() {
    start_date = this.timeConverter(this.props.program.time_start);
    end_date = this.timeConverter(this.props.program.time_end);
    this.setState({date_start: start_date,
                  date_end: end_date})
    this.descriptionMinifier();
  }

  descriptionMinifier(){
    if(this.props.program.description.length > 200){
      temp_scription = this.props.program.description.substring(0, 200) + '...';
      this.setState({description: temp_scription});
    }
    else{
      this.setState({description: this.props.program.description});
    }
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
            <Text style={styles.name}>{this.props.program.name}</Text>
            <Text style={styles.start_date}>{this.state.date_start}</Text>
            <Text style={styles.end_date}>{this.state.date_end}</Text>
            <Text style={styles.description}>foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar ...</Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    height: 85,
    width: '100%',
    backgroundColor: '#2E8FB6',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  name: {
    position: 'absolute',
    fontSize: 16,
    fontFamily: 'open-sans',
    left: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  start_date: {
    position: 'absolute',
    right: 5,
    fontSize: 14,
    fontFamily: 'open-sans',
    color: 'white',
  },
  end_date: {
    position: 'absolute',
    right: 5,
    top: 16,
    fontSize: 14,
    color: 'white',
    fontFamily: 'open-sans'
  },
  description: {
    position: 'absolute',
    left: 5,
    top: 35,
    fontSize: 12,
    color: 'white',
    fontFamily: 'open-sans',
    width: '95%'
  },
});

export default ProgramDetail;
