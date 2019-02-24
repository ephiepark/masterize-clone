import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import pitchApp from './reducers';
import PitchScreenContainer from './PitchScreenContainer.react';

const store = createStore(
  pitchApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

export default function PitchScreenApp() {
  return (
    <Provider store={store}>
      <PitchScreenContainer />
    </Provider>
  );
};
