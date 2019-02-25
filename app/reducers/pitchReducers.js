import { combineReducers } from 'redux';
import { SET_SCORE, SET_LEVEL, ADD_HISTORY, SET_ROUND } from '../actions/pitchActions';

function score(state = 0, action) {
  switch (action.type) {
    case SET_SCORE:
      return action.payload.score;
    default:
      return state;
  }
}

function level(state = 7, action) {
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
}

function round(state = {}, action) {
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
