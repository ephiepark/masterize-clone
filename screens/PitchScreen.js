import React from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebBrowser } from 'expo';

const allNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const SUCCESS_COUNT_FOR_LEVEL_UP = 3;
const GREEN_INTERPOLATION = {
  inputRange: [0, 0.5, 1],
  outputRange: ['#84b0dd', 'rgba(0, 255, 0, 1)', '#84b0dd'],
};
const RED_INTERPOLATION = {
  inputRange: [0, 0.5, 1],
  outputRange: ['#84b0dd', 'rgba(255, 0, 0, 1)', '#84b0dd'],
};

export default class PitchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      backgroundColor: '#84b0dd',
      level: 1,
      noteQuestioned: this._getRandNote(1),
      successConsequtiveCount: 0,
      history: [],
      isLastAnswerCorrect: null,
      fadeAnim: new Animated.Value(1),
    };
  };

  _getRandNote(level) {
    const randIdx = Math.floor(Math.random() * level);
    return allNotes[randIdx];
  }

  _handleCorrectAnswer() {
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
      newSuccessConsequtiveCount,
    };
  }

  _handleWrongAnswer() {
    let newLevel = Math.max(this.state.level - 1, 1);
    let newSuccessConsequtiveCount = 0;
    return {
      newLevel,
      newSuccessConsequtiveCount,
    };
  }

  _getUserOptions(noteQuestioned) {
    const options = [];
    for (let i = 0; i < this.state.level; i++) {
      const noteOption = allNotes[i];
      options.push(
        <Button
          onPress={this._handleButtonClick.bind(this, noteQuestioned, noteOption)}
          title={noteOption}
          color='#841584'
          key={noteOption}
        />
      );
    };

    return options;
  }

  _handleButtonClick = (noteQuestioned, noteUserAnswer) => {
    const historyRecord = {
      level: this.state.level,
      noteQuestioned,
      noteUserAnswer,
    };
    const newHistory = this.state.history.concat(historyRecord);
    const isAnswerCorrect = (noteQuestioned === noteUserAnswer);
    const { newLevel, newSuccessConsequtiveCount } = isAnswerCorrect ?
      this._handleCorrectAnswer() : this._handleWrongAnswer();

    const fadeAnim = new Animated.Value(0);
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }).start();

    this.setState({
      backgroundColor: isAnswerCorrect ?
        fadeAnim.interpolate(GREEN_INTERPOLATION)
        : fadeAnim.interpolate(RED_INTERPOLATION),
      level: newLevel,
      noteQuestioned: this._getRandNote(newLevel),
      successConsequtiveCount: newSuccessConsequtiveCount,
      history: newHistory,
      isLastAnswerCorrect: isAnswerCorrect,
      fadeAnim,
    });
  };

  render() {
    const { backgroundColor, noteQuestioned } = this.state;
    const noteOptions = this._getUserOptions(noteQuestioned);
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]}>
          <View style={styles.titleContainer}>
            <Text style={[sanFranciscoWeights.thin, styles.title]}>Master Pitch</Text>
          </View>
          <View style={styles.displayContainer}>
            <Text style={[sanFranciscoWeights.thin]}>{noteQuestioned}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {noteOptions}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingTop: 50,
  },
  displayContainer: {
    alignItems: 'center',
    margin: 60,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'center',
  },
});
