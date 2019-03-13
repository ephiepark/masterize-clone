// @flow

import { combineReducers } from 'redux';
import type {SetScoreAction, SetLevelAction, AddHistoryAction, SetRoundAction} from '../types/actionTypes.js';
import type {HistoryRecord, Round} from '../types/types.js';

import {
  SET_SCORE,
  SET_LEVEL,
  ADD_HISTORY,
  SET_ROUND
} from '../actions/pitchActions';

function score(state: number = 0, action: SetScoreAction): number {
  switch (action.type) {
    case SET_SCORE:
      return action.payload.score;
    default:
      return state;
  }
}

function level(state: number = 7, action: SetLevelAction): number {
  switch (action.type) {
    case SET_LEVEL:
      return action.payload.level;
    default:
      return state;
  }
}

function history(state: Array<HistoryRecord> = [], action: AddHistoryAction): Array<HistoryRecord> {
  switch (action.type) {
    case ADD_HISTORY:
      return [...state, action.payload.historyRecord];
    default:
      return state;
  }
}

function round(state: ?Round = null, action: SetRoundAction): ?Round {
  switch (action.type) {
    case SET_ROUND:
      return action.payload.round;
    default:
      return state;
  }
}

const pitchReducer = combineReducers({
  score,
  level,
  history,
  round
});

export default pitchReducer;
