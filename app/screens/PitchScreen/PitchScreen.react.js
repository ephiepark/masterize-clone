import React, { Component } from 'react';
import {
  Animated,
  Button,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import PianoAudioManager from '../../utils/PianoAudioManager';
import firebase from '../../utils/firebase';
import { signInWithFacebook } from '../../utils/auth';
import {
  blue,
  lightYellow
} from '../../styles/Colors';
import styles from './styles';

const HistoryUtils = require('./HistoryUtils');

const allNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const SUCCESS_COUNT_FOR_LEVEL_UP = 3;
const GREEN_INTERPOLATION = {
  inputRange: [0, 0.5, 1],
  outputRange: [lightYellow, 'rgba(22, 173, 22, 0.71)', lightYellow]
};
const RED_INTERPOLATION = {
  inputRange: [0, 0.5, 1],
  outputRange: [lightYellow, 'rgba(131, 0, 0, 0.76)', lightYellow]
};

export default class PitchScreen extends Component {
  static navigationOptions = {
  };

  /*
  props: {
    score: number,
    level: number,
    history: Array<HistoryRecord>,
    onScoreChange: (number) => void,
    onLevelChange: (number) => void,
    onHistoryRecord: (HistoryRecord) => void,
    onReadyForRound: () => void,
  };
  */

  state = {
    backgroundColor: lightYellow,
    name: ''
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      this.setState({ name: user.displayName });
    }
    this.props.onReadyForRound();
  }

  componentDidUpdate(prevProps) {
    if (this.props.round.roundId !== prevProps.round.roundId) {
      PianoAudioManager.playSingleNote(this.props.round.noteQuestioned);
    }
  }

  handleSetRecord = () => {
    const user = firebase.auth().currentUser;
    const name = user !== null ? user.displayName : this.state.name;
    if (name === '') {
      return;
    }
    firebase.database().ref(`scores/${  name}`).set({
      score: this.props.score
    });
  }

  handleLoginAsFB = () => {
    signInWithFacebook();
    this.setState({name: firebase.auth().currentUser.displayName});
  }

  handleCorrectAnswer() {
    let newLevel = this.props.level;
    const newSuccessConsequtiveCount = HistoryUtils.getConsequtiveSuccessCount(this.props.history) + 1;
    if (
      newSuccessConsequtiveCount > 0 &&
      newSuccessConsequtiveCount % SUCCESS_COUNT_FOR_LEVEL_UP === 0 &&
      this.props.level + 1 <= allNotes.length
    ) {
      newLevel = this.props.level + 1;
    };

    return {
      score: this.props.score + 1,
      newLevel
    };
  }

  handleWrongAnswer() {
    const newLevel = Math.max(this.props.level - 1, 1);
    return {
      score: 0,
      newLevel
    };
  }

  getUserOptions(noteOptions, noteQuestioned) {
    const options = [];
    for (const noteOption of noteOptions) {
      options.push(
        <Button
          onPress={this.handleButtonClick.bind(this, noteQuestioned, noteOption)}
          title={noteOption}
          color={blue}
          key={noteOption}
        />
      );
    };
    return options;
  }

  handleButtonClick = async (noteQuestioned, noteUserAnswer) => {
    const historyRecord = {
      level: this.props.level,
      noteQuestioned,
      noteUserAnswer
    };
    this.props.onHistoryRecord(historyRecord);
    const isAnswerCorrect = (noteQuestioned === noteUserAnswer);

    const { score, newLevel } = isAnswerCorrect ?
      this.handleCorrectAnswer() : this.handleWrongAnswer();

    const fadeAnim = new Animated.Value(0);
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }).start();

    this.props.onScoreChange(score);
    this.props.onLevelChange(newLevel);
    this.props.onReadyForRound();
    this.setState({
      backgroundColor: isAnswerCorrect ?
        fadeAnim.interpolate(GREEN_INTERPOLATION)
        : fadeAnim.interpolate(RED_INTERPOLATION)
    });
    this.handleSetRecord();
  };

  render() {
    const { backgroundColor } = this.state;
    const { score } = this.props;
    const { noteOptions, noteQuestioned } = this.props.round;
    let noteOptionButtons = [];
    if (noteOptions && noteQuestioned) {
      noteOptionButtons = this.getUserOptions(noteOptions, noteQuestioned);
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container, { backgroundColor }]}>
          <ScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Master Pitch</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TextInput
                style={{height: 40, alignItems: 'center', width: 150, borderColor: 'gray', borderBottomWidth: 1}}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.subtitle}>
Score:
                {score}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {noteOptionButtons}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {PianoAudioManager.playSingleNote(noteQuestioned)}}
                title="Replay"
                color={blue}
                key="Replay"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.logInAsFBBtn}
                onPress={this.handleLoginAsFB}
                title="Log In as Facebook"
                color={blue}
                key="login"
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
