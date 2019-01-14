import React, { Component } from 'react';
import { View, Text, StyleSheet, Overlay, TouchableWithoutFeedback, Alert } from 'react-native';

class ProgramDetail extends Component{

_onProgramPress(){
  Alert.alert('ifd');
}

render() {
  return( 
      <View style={styles.viewstyle}>
          <Text>{this.props.program.name}</Text>
          <Text>{this.props.program.start_time}</Text>
          <Text>{this.props.program.end_time}</Text>
      </View>
  );
}
};

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1
  }
});

export default ProgramDetail;
