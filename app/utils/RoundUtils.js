// @flow

import type {HistoryRecord} from '../types/types.js';

import {allNotes} from '../constants/constants';

export function getNoteQuestionedAndOptions(
  level: number,
  history: Array<HistoryRecord>
): {noteOptions: Array<string>, noteQuestioned: string} {
  const randIdx = Math.floor(Math.random() * level);
  const noteQuestioned: string = allNotes[randIdx];
  const noteOptions: Array<string> = allNotes.slice(0, level);
  return {noteOptions, noteQuestioned};
};
