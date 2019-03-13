// @flow

import type {SetUserAction} from '../types/actionTypes.js';
import type {User} from '../types/types';

/*
 * action types
 */

export const SET_USER = 'SET_USER';

/*
 * action creators
 */

export function setUser(user: User): SetUserAction {
  return { type: SET_USER, payload: { user } };
}
