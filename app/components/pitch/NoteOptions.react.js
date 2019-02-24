import React from 'react';
import { Button } from 'react-native';
import { blue } from '../../styles/Colors';

export default function NoteOptions({noteOptions, onUserAnswer}) {
  return noteOptions.map(noteOption => (
    <Button
      onPress={() => {onUserAnswer(noteOption)}}
      title={noteOption}
      color={blue}
      key={noteOption}
    />
  ));
};
