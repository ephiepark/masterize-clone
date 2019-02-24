const RoundUtils = require('./RoundUtils');

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
