// @flow

import type { Node } from 'react';

import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { shuffleArray } from '../../../utils/notes';
import styles from './styles';

type PropsNoteButton = {
  noteOption: string,
  onUserAnswer: string => void,
  position: number
};

const NoteButton = (props: PropsNoteButton) => {
  const row = Math.floor(props.position / 4);
  const offset = props.position % 4;
  const left = 40 + offset * 70 + row * 35;
  const top = 50 + Math.floor(props.position / 4) * 60;
  return (
    <TouchableHighlight
      onPress={() => {
        props.onUserAnswer(props.noteOption);
      }}
      underlayColor="white"
      style={[styles.noteButton, { left, top }]}
      key={props.noteOption}
    >
      <View>
        <Text style={styles.noteButtonText}>{props.noteOption}</Text>
      </View>
    </TouchableHighlight>
  );
};

type PropsNoteButtons = {
  noteOptions: Array<string>,
  onUserAnswer: string => void,
  shuffle: boolean
};

export default function NoteButtons(props: PropsNoteButtons) {
  const notes = props.shuffle
    ? shuffleArray(props.noteOptions)
    : props.noteOptions;
  const noteButtons = notes.map<Node>((note, idx) => (
    <NoteButton
      key={note}
      noteOption={note}
      onUserAnswer={props.onUserAnswer}
      position={idx}
    />
  ));
  return noteButtons;
}
