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
          <Text>{this.props.program.time_start}</Text>
          <Text>{this.props.program.time_end}</Text>
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
