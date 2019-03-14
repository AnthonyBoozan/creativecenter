import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Picker
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import sty from "../constants/Button.js";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {filteredName: '',
                  filteredStartTime: 0,
                  filteredEndTime: 0,
                  filteredLevel: 0,
                  isDateTimePickerStartVisible:false,
                  isDateTimePickerEndVisible:false,
                  textStartTime: 'None',
                  textEndTime: 'None',
                  levelName: ''};
  }

  _showDateTimeStartPicker = () => this.setState({ isDateTimePickerStartVisible: true });

  _hideDateTimeStartPicker = () => this.setState({ isDateTimePickerStartVisible: false });

  _showDateTimeEndPicker = () => this.setState({ isDateTimePickerEndVisible: true });

  _hideDateTimeEndPicker = () => this.setState({ isDateTimePickerEndVisible: false });

  _handleStartDatePicked = date => {
    timestamp = date.getTime()/1000;
    this.setState({ filteredStartTime: date.getTime()/1000, textStartTime: this.timeConverter(timestamp)});
    this._hideDateTimeStartPicker();
  };

  _handleEndDatePicked = date => {
    timestamp = date.getTime()/1000;
    this.setState({ filteredEndTime: date.getTime()/1000, textEndTime: this.timeConverter(timestamp)});
    this._hideDateTimeEndPicker();
  };

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

  applyFilter(){
    filterOptions = {
      name: this.state.filteredName,
      time_start: this.state.filteredStartTime,
      time_end: this.state.filteredEndTime,
      level: this.state.filteredLevel,
    };
    this.props.onItemSelected(filterOptions)
  }

  render(){
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text>Filter</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'red'}}
          onChangeText={(text) => this.setState({filteredName: text})}
          value={this.state.filteredName}
        />
        <TouchableOpacity onPress={this._showDateTimeStartPicker}>
          <View style={sty.button}>
            <Text>Earliest Time</Text>
          </View>
        </TouchableOpacity>
        <Text>{this.state.textStartTime}</Text>
        <TouchableOpacity onPress={this._showDateTimeEndPicker}>
          <View style={sty.button}>
            <Text>Lateset Time</Text>
          </View>
        </TouchableOpacity>
        <Text>{this.state.textEndTime}</Text>
        <Picker
          selectedValue={this.state.filteredLevel}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({filteredLevel: itemValue})
          }>
          <Picker.Item label="None" value="0" />
          <Picker.Item label="Available to me" value ="1" />
          <Picker.Item label="Lead" value="90" />
          <Picker.Item label="Lead Assistant" value="80" />
          <Picker.Item label="Volunteer Ambassador" value="109" />
          <Picker.Item label="Volunteer Admin" value="110" />
          <Picker.Item label="Volunteer 3" value="70" />
          <Picker.Item label="Volunteer 2" value="60" />
          <Picker.Item label="Volunteer 1" value="50" />
        </Picker>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerStartVisible}
          onConfirm={this._handleStartDatePicked}
          onCancel={this._hideDateTimeStartPicker}
          mode='datetime'
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerEndVisible}
          onConfirm={this._handleEndDatePicked}
          onCancel={this._hideDateTimeEndPicker}
          mode='datetime'
        />
        <Button
          onPress={() => this.applyFilter()}
          title="Filter"
        />
        <Button
          onPress={() => this.setState({filteredName: '', filteredStartTime: 0, filteredEndTime: 0, filteredLevel: 0, textStartTime: 'None', textEndTime: 'None'})}
          title="Reset"
        />
      </ScrollView>
    );
  }

}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
