import { combineReducers } from 'redux';
import {
  SET_SCORE,
  SET_LEVEL,
  ADD_HISTORY,
  INIT_ROUND
} from './actions';

function score(state = 0, action) {
  switch (action.type) {
    case SET_SCORE:
      return action.payload.score;
    default:
      return state;
  }
};

function level(state = 1, action) {
  switch (action.type) {
    case SET_LEVEL:
      return action.payload.level;
    default:
      return state;
  }
}

function history(state = [], action) {
  switch (action.type) {
    case ADD_HISTORY:
      return [...state, action.payload.historyRecord];
    default:
      return state;
  }
};

function round(state = {}, action) {
  switch (action.type) {
    case INIT_ROUND:
      return {
        noteOptions: action.payload.noteOptions,
        noteQuestioned: action.payload.noteQuestioned,
        roundId: action.payload.roundId
      };
    default:
      return state;
  }
};

const pitchApp = combineReducers({
  score,
  level,
  history,
  round
});

export default pitchApp;
