import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';


class DetailedProgram extends Component {
  render() {
    if(!this.props.show){
      return null;
    }
    else{
      return(
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} pointerEvents='box-none'>
            <View style={styles.textbox}>
              <Text>"JIFODIDFIJO"</Text>
              <Button title="Test"/>
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
