import { combineReducers } from 'redux';
import { SET_USER } from '../actions/authActions';

function user(state = {displayName: '', photoURL: ''}, action) {
  console.log(action.type);
  switch (action.type) {
    case SET_USER:
      return action.payload.user;
    default:
      return state;
  }
}

const authReducer = combineReducers({
  user
});

export default authReducer;
