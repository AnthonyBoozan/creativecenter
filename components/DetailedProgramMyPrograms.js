import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Picker, AsyncStorage } from 'react-native';
var equal = require('fast-deep-equal');


class DetailedProgramMyPrograms extends Component {
  constructor(props){
    super(props);
    this.state = {language: '',
                  program: {},
                  valid_levels: []};
  }
  buttonPressAction = async () => {
    this.props.handler();
  }
  componentDidMount(){
    this.getValidLevels();
  }
  componentDidUpdate(prevProps){
    /*if(this.props.program.item != undefined)
    if(this.props.program.item !== prevProps.program.item && this.props.progra){
      this.getValidLevels();
    }*/
    if(prevProps.program.item !== this.props.program.item){
      this.getValidLevels();
    }

  }
  async getValidLevels(){
    temp_levels = {}
    levels = JSON.parse(await AsyncStorage.getItem('levels'));
    eligibleclasses = JSON.parse(await AsyncStorage.getItem('eligible_classes'));
    if(this.props.program.item.class_id !== undefined){
      eligibleclasses[this.props.program.item.class_id].map(function(x){
        if(x < 100){

          for (var level in levels){
            console.log(level);
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
    console.log(keysSorted);
    this.setState({program: this.props.program.item,
                    valid_levels: keysSorted});


  }

  cleanseLabelString(level) {
    level = level.replace(/[_-]/g, " ");
    level = level.charAt(0).toUpperCase() + level.slice(1);
    return level
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
              <Button onPress={this.buttonPressAction} title="Test"/>
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

export default DetailedProgramMyPrograms;