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
    if(this.props.hide != false){
      return null;
    }
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.filterDiv}>
          <Text style={styles.filter}>Filter</Text>
        </View>
        <TextInput
          style={styles.filterBar}
          onChangeText={(text) => this.setState({filteredName: text})}
          value={this.state.filteredName}
        />
        <View style={styles.buttonDiv}>
          <TouchableOpacity onPress={this._showDateTimeStartPicker}>
            <View style={styles.button}>
              <Text style={{fontFamily: 'open-sans'}}>Earliest Time</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonDiv}>
          <Text style={styles.timetext}>{this.state.textStartTime}</Text>
        </View>
        <View style={styles.filterDiv}>
          <TouchableOpacity onPress={this._showDateTimeEndPicker}>
            <View style={styles.button}>
              <Text style={{fontFamily: 'open-sans'}}>Lateset Time</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.filterDiv}>
          <Text style={styles.timetext}>{this.state.textEndTime}</Text>
        </View>
        <Picker
          selectedValue={this.state.filteredLevel}
          style={{height: 50, width: '65%'}}
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
        <View style={styles.filterbuttonDiv}>
          <TouchableOpacity onPress={() => this.applyFilter()}>
            <View style={styles.filterbutton}>
              <Text style={{fontFamily: 'open-sans'}}>Filter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({filteredName: '', filteredStartTime: 0, filteredEndTime: 0, filteredLevel: 0, textStartTime: 'None', textEndTime: 'None'})}>
            <View style={styles.filterbutton}>
              <Text style={{fontFamily: 'open-sans'}}>Reset</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  filterDiv:{
    alignItems: 'center',
    width: '65%',
  },
  filterbuttonDiv:{
    alignItems: 'center',
    width: '65%',
    flexDirection: 'row'
  },
  buttonDiv:{
    alignItems: 'center',
    width: '65%',
    borderRadius: 2,
    borderColor: 'black'
  },
  filter: {
    fontWeight: 'bold',
    fontFamily: 'open-sans',
    fontSize: 20
  },
  filterBar:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '65%',
    padding: 5
  },
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 10,
    paddingTop: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  filterbutton: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 14,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  timetext:{
    fontFamily: 'open-sans',
    fontSize: 18
  }
});

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
