import { combineReducers } from 'redux';
import { SET_USER } from '../actions/authActions';

function user(state = 0, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload.score;
    default:
      return state;
  }
}

const userReducer = combineReducers({
  user
});

export default userReducer;
