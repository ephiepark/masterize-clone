// @flow

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import pitchReducers from '../reducers/pitchReducers';
import authReducers from '../reducers/authReducers';

const reduers = combineReducers({
  auth: authReducers,
  pitch: pitchReducers
});

const store = createStore(
  reduers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

export default store;
