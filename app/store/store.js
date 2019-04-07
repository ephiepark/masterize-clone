// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import pitchReducers from '../reducers/pitchReducers';
import authReducers from '../reducers/authReducers';

const persistConfigPitch = {
  key: 'pitch',
  storage: AsyncStorage
};

const pPitchReducers = persistReducer(persistConfigPitch, pitchReducers);

const reducers = combineReducers({
  auth: authReducers,
  pitch: pPitchReducers
});

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
);
export const persistor = persistStore(store);
