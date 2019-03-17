// @flow

import type {HistoryRecord} from '../../types/types.js';

import React from 'react';
import { View, Text } from 'react-native';
import { allNotes } from '../../constants/constants';
import Loader from '../../animations/Loader';
import styles from './styles';

const HistoryUtils = require('../../utils/HistoryUtils');

type Props = {
  history: Array<HistoryRecord>,
};

export default function ProgressScreen(props: Props) {
  const noteResultCountMap = HistoryUtils.getNoteResultCountMap(props.history);
  const noteSuccessRates = [];
  for (const note of allNotes) {
    const noteResult = noteResultCountMap.get(note);
    let msg = `${note}: N/A`;
    if (noteResult) {
      const countCorrect = noteResult[0];
      const countWrong = noteResult[1];
      const successRate = (countCorrect * 100) / (countCorrect + countWrong);
      msg = `${note}: ${successRate}%`;
    }
    noteSuccessRates.push(
      <View key={note}>
        <Text>{msg}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Loader />
        <View style={styles.notesContainer}>{noteSuccessRates}</View>
      </View>
    </View>
  );
}
