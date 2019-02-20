import React, { Component } from 'react';
import {
  Animated,
  Button,
  Text,
  View
} from 'react-native';
import PianoAudioManager from '../../utils/PianoAudioManager';
import {
  blue,
  lightYellow
} from '../../styles/Colors';

import styles from './styles';

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

  state = {
    backgroundColor: lightYellow,
    level: 1,
    noteQuestioned: this.getRandNote(1),
    successConsequtiveCount: 0,
    history: [],
    fadeAnim: new Animated.Value(1)
  };

  componentDidMount() {
    // TODO this is super hacky. This is for demo purpose
    PianoAudioManager.playSingleNote("C4");
  }

  getRandNote(level) {
    const randIdx = Math.floor(Math.random() * level);
    return allNotes[randIdx];
  }

  handleCorrectAnswer() {
    let newLevel = this.state.level;
    let newSuccessConsequtiveCount = this.state.successConsequtiveCount + 1;
    if (
      newSuccessConsequtiveCount === SUCCESS_COUNT_FOR_LEVEL_UP &&
      this.state.level + 1 <= allNotes.length
    ) {
      newLevel = this.state.level + 1;
      newSuccessConsequtiveCount = 0;
    };

    return {
      newLevel,
      newSuccessConsequtiveCount
    };
  }

  handleWrongAnswer() {
    const newLevel = Math.max(this.state.level - 1, 1);
    const newSuccessConsequtiveCount = 0;
    return {
      newLevel,
      newSuccessConsequtiveCount
    };
  }

  getUserOptions(noteQuestioned) {
    const options = [];
    for (let i = 0; i < this.state.level; i++) {
      const noteOption = allNotes[i];
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
      level: this.state.level,
      noteQuestioned,
      noteUserAnswer
    };
    const newHistory = this.state.history.concat(historyRecord);
    const isAnswerCorrect = (noteQuestioned === noteUserAnswer);
    const { newLevel, newSuccessConsequtiveCount } = isAnswerCorrect ?
      this.handleCorrectAnswer() : this.handleWrongAnswer();

    const fadeAnim = new Animated.Value(0);
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }).start();

    const randNote = this.getRandNote(newLevel);

    // TODO this is hacky refactor this later.
    setTimeout(() => {PianoAudioManager.playSingleNote(randNote)}, 600);
    this.setState({
      backgroundColor: isAnswerCorrect ?
        fadeAnim.interpolate(GREEN_INTERPOLATION)
        : fadeAnim.interpolate(RED_INTERPOLATION),
      level: newLevel,
      noteQuestioned: randNote,
      successConsequtiveCount: newSuccessConsequtiveCount,
      history: newHistory,
      fadeAnim
    });
  };

  render() {
    const { backgroundColor, noteQuestioned } = this.state;
    const noteOptions = this.getUserOptions(noteQuestioned);
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container, { backgroundColor }]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Master Pitch</Text>
          </View>
          <View style={styles.buttonContainer}>
            {noteOptions}
          </View>
        </Animated.View>
      </View>
    );
  }
}
