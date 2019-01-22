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

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
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
    backgroundColor: '#B2B2B2'

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 12,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
