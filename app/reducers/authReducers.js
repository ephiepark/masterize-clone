// @flow

import { combineReducers } from 'redux';
import type {SetUserAction} from '../types/actionTypes.js';
import type {User} from '../types/types.js';

import { SET_USER } from '../actions/authActions';

function user(
  state: User = {displayName: '', photoURL: ''},
  action: SetUserAction
): User {
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
