import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { shuffleArray } from '../../../utils/notes';
import styles from './styles';

const NoteButton = ({noteOption, onUserAnswer, position}) => {
  const row = Math.floor(position / 4);
  const offset = position % 4;
  const left = 40 + (offset * 70) + (row * 35);
  const top = 50 + Math.floor(position / 4) * 60;
  return (
    <TouchableHighlight
      onPress={() => {onUserAnswer(noteOption)}}
      underlayColor="white"
      style={[styles.noteButton, {left, top}]}
      key={noteOption}
    >
      <View>
        <Text style={styles.noteButtonText}>{noteOption}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default function NoteButtons({noteOptions, onUserAnswer, shuffle}) {
  const notes = shuffle ? shuffleArray(noteOptions) : noteOptions;
  const noteButtons =
    notes.map((note, idx) => (
      <NoteButton
        key={note}
        noteOption={note}
        onUserAnswer={onUserAnswer}
        position={idx}
      />
));
  return noteButtons;
};
