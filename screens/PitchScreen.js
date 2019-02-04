import React from 'react';
import {
  Animated,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography'
import Icon from 'react-native-vector-icons/AntDesign';
import { WebBrowser } from 'expo';

const allNotes = ["C", "D", "E", "F", "G", "A", "B"];
const SUCCESS_COUNT_FOR_LEVEL_UP = 10;


export default class PitchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    level: 1,
    successConsequtiveCount: 0,
    history: [],
    isLastAnswerCorrect: null,
    fadeAnim: new Animated.Value(1),
    fadeAnimVal: 1,
  };

  _getRandNote() {
    const randIdx = Math.floor(Math.random() * this.state.level);
    return allNotes[randIdx];
  }

  _getHistoryRecord(level, noteQuestioned, noteUserAnswer) {
    return {
      'level': level,
      'noteQuestioned': noteQuestioned,
      'noteUserAnswer': noteUserAnswer,
    };
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
    }
    return {
      newLevel: newLevel,
      newSuccessConsequtiveCount: newSuccessConsequtiveCount
    };
  }

  _handleWrongAnswer() {
    let newLevel = Math.max(this.state.level - 1, 1);
    let newSuccessConsequtiveCount = 0;
    return {
      newLevel: newLevel,
      newSuccessConsequtiveCount: newSuccessConsequtiveCount
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
          color="#841584"
          key={noteOption}
        />
      );
    }
    return options;
  }

  _feedbackAnimationListener = (value) => {
    console.log(value.value);
    this.setState({fadeAnimVal: value.value});
  }

  _startAnswerFeedbackAnimation() {
    const fadeAnim = new Animated.Value(1);
    fadeAnim.addListener(this._feedbackAnimationListener);
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start();
    this.setState({fadeAnim: fadeAnim});
  }

  _handleButtonClick = (noteQuestioned, noteUserAnswer) => {
    const historyRecord = this._getHistoryRecord(
      this.state.level,
      noteQuestioned,
      noteUserAnswer,
    );
    const newHistory = this.state.history.concat(historyRecord);
    const isAnswerCorrect = (noteQuestioned === noteUserAnswer);
    const {newLevel, newSuccessConsequtiveCount} = isAnswerCorrect ?
      this._handleCorrectAnswer() : this._handleWrongAnswer();

    this.setState({
      level: newLevel,
      successConsequtiveCount: newSuccessConsequtiveCount,
      history: newHistory,
      isLastAnswerCorrect: isAnswerCorrect,
    });
    this._startAnswerFeedbackAnimation();
  };

  render() {
    // User Answer feedback
    let { fadeAnim } = this.state;
    let feedbackBackgroundColor = '';
    if (this.state.isLastAnswerCorrect === null) {
      feedbackBackgroundColor = '#84b0dd';
    } else if (this.state.isLastAnswerCorrect) {
      feedbackBackgroundColor = 'rgba(0,255,0,' + this.state.fadeAnimVal + ')';
    } else {
      feedbackBackgroundColor = 'rgba(255,0,0,' + this.state.fadeAnimVal + ')';
    }
    console.log(feedbackBackgroundColor);

    const noteQuestioned = this._getRandNote();
    const noteOptions = this._getUserOptions(noteQuestioned);
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.container, {backgroundColor: feedbackBackgroundColor}]} contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
            <Text style={[sanFranciscoWeights.thin, styles.title]}>Master Pitch</Text>
          </View>

          <View style={styles.displayContainer}>
            <Text style={[sanFranciscoWeights.thin]}>{noteQuestioned}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {noteOptions}
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={styles.developmentModeText}>
          (Dev Mode)
        </Text>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84b0dd',
  },
  contentContainer: {
    paddingTop: 30,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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
