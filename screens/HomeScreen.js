import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  NativeModules,
  TouchableWithoutFeedback,
  Fragment
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import ProgramDetail from '../components/ProgramDetail';
import DetailedProgram from '../components/DetailedProgram';
const { StatusBarManager } = NativeModules;

export default class HomeScreen extends React.Component {
  state = { programs: [], viewOverlay: false, opacity: 1.0, highlightOpacity: .2};
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.setState({programs: [{"name": "Finger Painting",
     "start_time": "14:20",
   "end_time": "16:20"},
   {"name": "Paper Airplane mfaker",
    "start_time": "2:20",
  "end_time": "15:20"},
  {"name": "Paper Airplane makder",
   "start_time": "2:20",
 "end_time": "15:20"},
 {"name": "Paper Airplan3e maker",
  "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplanfe maker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplane 3maker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplanf3e maker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplane2 maker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplane ma1ker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplane 5maker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplane mak6er",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper Airplane 2maker",
 "start_time": "2:20",
"end_time": "15:20"},
{"name": "Paper A5irplane maker",
 "start_time": "2:20",
"end_time": "15:20"}


    ]});
  }

  renderPrograms(){
    return this.state.programs.map(program =>
      <TouchableOpacity key={program.name} onPress={this._handleProgramPress} activeOpacity={this.state.highlightOpacity}>
        <ProgramDetail key={program.name} program={program} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <React.Fragment>
      <TouchableWithoutFeedback onPress={() => this._handleExitOverlay()}>
        <View style={[styles.container, {opacity: this.state.opacity}]}>
          <ScrollView style={styles.contentContainer} contentContainerStyle={styles.contentContainer}>
            {this.renderPrograms()}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <DetailedProgram show={this.state.viewOverlay} _handleProgramPress={this._handleProgramPress}/>

      </React.Fragment>
    );
  }

  _handleProgramPress = () => {
    if(this.state.viewOverlay){
      this.setState({
        viewOverlay: false,
        opacity: 1.0,
        highlightOpacity: .2
        })
    }
    else{
      this.setState({
        viewOverlay: !this.state.viewOverlay,
        opacity: .4,
        highlightOpacity: 1
      })
    }

    console.log(this.state.opacity);
  };

  _handleExitOverlay = () => {
      if(this.state.viewOverlay){
        this.setState({
          viewOverlay: false,
          opacity: 1.0,
          highlightOpacity: .4
        })
      }
      console.log(this.state.opacity);
    };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2B2B2',

  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 11
  },
});
