import React from 'react';
import { Button, View, Text, TouchableHighlight } from 'react-native';
import { blue } from '../../../styles/Colors';
import styles from './styles';

export default function NoteButtons({noteOptions, onUserAnswer}) {
  return noteOptions.map(noteOption => (
    <TouchableHighlight
      onPress={() => {onUserAnswer(noteOption)}}
      underlayColor="white"
      style={styles.noteButton}
      key={noteOption}
    >
      <View>
        <Text style={styles.noteButtonText}>{noteOption}</Text>
      </View>
    </TouchableHighlight>
  ));
};
