// @flow 

import React from 'react';
import { Provider } from 'react-redux';
import PitchScreenContainer from './PitchScreenContainer.react';
import store from '../../store/store';

export default function PitchScreenApp() {
  return (
    <Provider store={store}>
      <PitchScreenContainer />
    </Provider>
  );
};
