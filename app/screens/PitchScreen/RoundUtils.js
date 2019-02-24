import {allNotes} from './constants';

export function getNoteQuestionedAndOptions(level, history) {
  const randIdx = Math.floor(Math.random() * level);
  const noteQuestioned = allNotes[randIdx];
  const noteOptions = allNotes.slice(0, level);
  return {noteOptions, noteQuestioned};
};
