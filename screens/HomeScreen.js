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
  Fragment,
  FlatList,
  RefreshControl
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import ProgramDetail from '../components/ProgramDetail';
import DetailedProgram from '../components/DetailedProgram';
const { StatusBarManager } = NativeModules;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      viewOverlay: false,
      programs: [],
      opacity: 1.0,
      highlightOpacity: .2
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.setState({programs: [{"name": "Finger Painting",
     "time_start": "14:20",
   "time_end": "16:20"},
   {"name": "Paper Airplane mfaker",
    "time_start": "2:20",
  "time_end": "15:20"},
  {"name": "Paper Airplane makder",
   "time_start": "2:20",
 "time_end": "15:20"},
 {"name": "Paper Airplan3e maker",
  "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplanfe maker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplane 3maker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplanf3e maker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplane2 maker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplane ma1ker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplane 5maker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplane mak6er",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper Airplane 2maker",
 "time_start": "2:20",
"time_end": "15:20"},
{"name": "Paper A5irplane maker",
 "time_start": "2:20",
"time_end": "15:20"}


    ]});
  }

  async refresh() {
    console.log("refresh");
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.refresh().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <React.Fragment>
      <TouchableWithoutFeedback onPress={() => this._handleExitOverlay()}>
        <View style={[styles.container, {opacity: this.state.opacity}]}>
          <FlatList
          data={this.state.programs}
          renderItem={({item}) =>
          <TouchableOpacity key={item.name} onPress={this._handleProgramPress} activeOpacity={this.state.highlightOpacity}>
            <ProgramDetail key={item.name} program={item} />
          </TouchableOpacity>}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.contentContainer}
        />
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
    paddingTop: 22,
    flex: 1,
    backgroundColor: '#B2B2B2',

  },
  contentContainer: {


  },
});
