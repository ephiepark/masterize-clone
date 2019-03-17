// @flow

import type {Dispatch} from 'react-redux';
import type {SetScoreAction, SetLevelAction, AddHistoryAction, SetRoundAction} from '../types/actionTypes.js';
import type {HistoryRecord, Round, GetState} from '../types/types';

import {
  maxLevel,
  minLevel,
  successCountForLevelUp
} from '../constants/constants';

const RoundUtils = require('../utils/RoundUtils');
const HistoryUtils = require('../utils/HistoryUtils');

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

export function setScore(score: number): SetScoreAction {
  return { type: SET_SCORE, payload: { score } };
}

export function setLevel(level: number): SetLevelAction {
  return { type: SET_LEVEL, payload: { level } };
}

export function addHistory(historyRecord: HistoryRecord): AddHistoryAction {
  return { type: ADD_HISTORY, payload: { historyRecord } };
}

export function setRound(round: Round): SetRoundAction {
  return { type: SET_ROUND, payload: { round } };
}

// Thunk

export function incrementLevel() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { level } = getState().pitch;
    dispatch(setLevel(Math.min(level + 1, maxLevel)));
  };
}

export function decrementLevel() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { level } = getState().pitch;
    dispatch(setLevel(Math.max(level - 1, minLevel)));
  };
}

export function initRound() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { level, history } = getState().pitch;
    const {
      noteOptions,
      noteQuestioned
    } = RoundUtils.getNoteQuestionedAndOptions(level, history);
    const roundId = history.length;
    dispatch(setRound({ noteOptions, noteQuestioned, roundId }));
  };
}

export function handleUserAnswer(noteUserAnswer: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { level, history, round, score } = getState().pitch;
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
      }

      newScore = score + 1;
    } else {
      dispatch(decrementLevel());
      newScore = 0;
    }
    dispatch(setScore(newScore));
    dispatch(initRound());
  };
}
