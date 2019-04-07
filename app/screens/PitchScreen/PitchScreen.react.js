// @flow

import React, { Component } from 'react';
import {
  Animated,
  Button,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import type { Round } from '../../types/types';
import PianoAudioManager from '../../utils/PianoAudioManager';
import firebase from '../../utils/firebase';
import NoteButtons from '../../components/pitch/NoteButtons';
import { pastelPalette } from '../../styles/Colors';
import SoundLoader from '../../animations/SoundLoader';
import styles from './styles';

const GREEN_INTERPOLATION = {
  inputRange: [0, 0.5, 1],
  outputRange: [
    pastelPalette.background,
    'rgba(22, 173, 22, 0.71)',
    pastelPalette.background
  ]
};
const RED_INTERPOLATION = {
  inputRange: [0, 0.5, 1],
  outputRange: [
    pastelPalette.background,
    'rgba(131, 0, 0, 0.76)',
    pastelPalette.background
  ]
};

type Props = {
  score: number,
  round: ?Round,
  onReadyForRound: () => void,
  onUserAnswer: string => void
};
type State = {
  name: ?string,
  backgroundColor: any,
  shuffle: boolean
};

export default class PitchScreen extends Component<Props, State> {
  static navigationOptions = {};

  state = {
    name: null,
    backgroundColor: pastelPalette.background,
    shuffle: false
  };

  componentDidMount() {
    PianoAudioManager.init().then(() => {
      this.props.onReadyForRound();
    });
  }

  componentDidUpdate(prevProps: Props) {
    const roundCurr = this.props.round;
    const roundPrev = prevProps.round;
    if (roundCurr) {
      if (roundPrev) {
        if (roundCurr.roundId !== roundPrev.roundId) {
          PianoAudioManager.playSingleNote(roundCurr.noteQuestioned);
        }
      } else {
        PianoAudioManager.playSingleNote(roundCurr.noteQuestioned);
      }
    }
  }

  handleButtonClick = (noteQuestioned: string, noteUserAnswer: string) => {
    this.props.onUserAnswer(noteUserAnswer);
    const isAnswerCorrect = noteQuestioned === noteUserAnswer;
    const fadeAnim = new Animated.Value(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
    this.setState({
      backgroundColor: isAnswerCorrect
        ? fadeAnim.interpolate(GREEN_INTERPOLATION)
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
    firebase
      .database()
      .ref(`scores/${name}`)
      .set({
        score: this.props.score
      });
  };

  render() {
    const { backgroundColor, shuffle } = this.state;
    const { score, round } = this.props;

    if (round) {
      const { noteOptions, noteQuestioned } = round;

      const onUserAnswer = noteUserAnswer => {
        this.handleButtonClick(noteQuestioned, noteUserAnswer);
      };

      let noteOptionButtons = null;
      if (noteOptions && noteQuestioned) {
        noteOptionButtons = (
          <NoteButtons
            noteOptions={noteOptions}
            onUserAnswer={onUserAnswer}
            shuffle={shuffle}
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
              <View style={styles.nameContainer}>
                <ToggleSwitch
                  isOn={shuffle}
                  onColor="green"
                  offColor="gray"
                  label="Shuffle"
                  labelStyle={styles.toggle}
                  size="small"
                  onToggle={() => this.setState({ shuffle: !shuffle })}
                />
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.score}>
                  Score:
                  {score}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => {
                    PianoAudioManager.playSingleNote(noteQuestioned);
                  }}
                  title="Replay"
                  color={pastelPalette.secondary}
                  key="Replay"
                />
              </View>
              <SoundLoader />
              <View style={styles.buttonContainer}>{noteOptionButtons}</View>
            </ScrollView>
          </Animated.View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
