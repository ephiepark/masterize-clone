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
import {
  blue,
  lightYellow
} from '../../styles/Colors';
import styles from './styles';
import NoteOptions from '../../components/pitch/NoteOptions.react';

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

  handleButtonClick = (noteQuestioned, noteUserAnswer) => {
    this.props.onUserAnswer(noteUserAnswer);
    const isAnswerCorrect = noteQuestioned === noteUserAnswer;
    const fadeAnim = new Animated.Value(0);
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }).start();
    this.setState({
      backgroundColor: isAnswerCorrect ?
        fadeAnim.interpolate(GREEN_INTERPOLATION)
        : fadeAnim.interpolate(RED_INTERPOLATION)
    });
    this.handleSetRecord();
  };

  handleSetRecord = () => {
    const user = firebase.auth().currentUser;
    const name = user !== null ? user.displayName : this.state.name;
    if (name === '') {
      return;
    }
    firebase.database().ref(`scores/${name}`).set({
      score: this.props.score
    });
  }

  render() {
    const { backgroundColor } = this.state;
    const { score } = this.props;
    const { noteOptions, noteQuestioned } = this.props.round;
    const onUserAnswer = noteUserAnswer => {
      this.handleButtonClick(noteQuestioned, noteUserAnswer)
    };
    let noteOptionButtons = null;
    if (noteOptions && noteQuestioned) {
      noteOptionButtons = (
        <NoteOptions
          noteOptions={noteOptions}
          onUserAnswer={onUserAnswer}
        />
      );
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
                {' '}
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
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
