import { maxLevel, minLevel, successCountForLevelUp } from './constants';

const RoundUtils = require('./RoundUtils');
const HistoryUtils = require('./HistoryUtils');

/*
 * action types
 */

export const SET_SCORE = 'SET_SCORE';
export const SET_LEVEL = 'SET_LEVEL';
export const ADD_HISTORY = 'ADD_HISTORY';
export const SET_ROUND = 'SET_ROUND';

/*
 * action creators
 */

export function setScore(score) {
  return { type: SET_SCORE, payload: { score } };
}

export function setLevel(level) {
  return { type: SET_LEVEL, payload: { level } };
}

export function addHistory(historyRecord) {
  return { type: ADD_HISTORY, payload: { historyRecord } };
}

export function setRound(round) {
  return { type: SET_ROUND, payload: { round } };
}

// Thunk

export function incrementLevel() {
  return (dispatch, getState) => {
    const { level } = getState();
    dispatch(setLevel(Math.min(level + 1, maxLevel)));
  };
}

export function decrementLevel() {
  return (dispatch, getState) => {
    const { level } = getState();
    dispatch(setLevel(Math.max(level - 1, minLevel)));
  };
}

export function initRound() {
  return (dispatch, getState) => {
    const { level, history } = getState();
    const {
      noteOptions,
      noteQuestioned
    } = RoundUtils.getNoteQuestionedAndOptions(level, history);
    const roundId = history.length;
    dispatch(setRound({ noteOptions, noteQuestioned, roundId }));
  };
}

export function handleUserAnswer(noteUserAnswer) {
  return (dispatch, getState) => {
    const { level, history, round, score } = getState();
    const { noteQuestioned } = round;
    const historyRecord = { level, noteQuestioned, noteUserAnswer };
    dispatch(addHistory(historyRecord));
    const isCorrect = noteQuestioned === noteUserAnswer;
    let newScore = 0;
    if (isCorrect) {
      const newSuccessConsequtiveCount =
        HistoryUtils.getConsequtiveSuccessCount(history) + 1;
      if (
        newSuccessConsequtiveCount > 0 &&
        newSuccessConsequtiveCount % successCountForLevelUp === 0
      ) {
        dispatch(incrementLevel());
      };

      newScore = score + 1;
    } else {
      dispatch(decrementLevel());
      newScore = 0;
    }
    dispatch(setScore(newScore));
    dispatch(initRound());
  };
}
