import React from 'react';
import { Button, View, Text, TouchableHighlight } from 'react-native';
import { blue } from '../../../styles/Colors';
import { shuffle } from '../../../utils/notes';
import styles from './styles';

const NoteButton = ({noteOption, onUserAnswer, position}) => {
  const row = Math.floor(position / 4);
  const offset = position % 4;
  const left = 40 + (offset * 70) + (row * 20);
  const top = 50 + Math.floor(position / 4) * 60;
  return (
    <TouchableHighlight
      onPress={() => {onUserAnswer(noteOption)}}
      underlayColor="white"
      style={[styles.noteButton, {position: 'absolute', left, top}]}
      key={noteOption}
    >
      <View>
        <Text style={styles.noteButtonText}>{noteOption}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default function NoteButtons({noteOptions, onUserAnswer}) {
  // const noteArray = shuffle(noteOptions);
  const noteButtons =
    noteOptions.map((note, idx) =>
      <NoteButton
        key={note}
        noteOption={note}
        onUserAnswer={onUserAnswer}
        position={idx}
      />
    );
  return noteButtons;
};
