// @flow

import type {User, HistoryRecord, Round} from './types.js';

export type SetUserAction = {
  type: 'SET_USER',
  payload: {user: User},
};

export type SetScoreAction = {
  type: 'SET_SCORE',
  payload: {score: number},
};

export type SetLevelAction = {
  type: 'SET_LEVEL',
  payload: {level: number},
};

export type AddHistoryAction = {
  type: 'ADD_HISTORY',
  payload: {historyRecord: HistoryRecord},
};

export type SetRoundAction = {
  type: 'SET_ROUND',
  payload: {round: Round},
}
