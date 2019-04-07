// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PitchScreenContainer from './PitchScreenContainer.react';
import { persistor, store } from '../../store/store';

export default function PitchScreenApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PitchScreenContainer />
      </PersistGate>
    </Provider>
  );
}
