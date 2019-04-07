// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ProgressScreenContainer from './ProgressScreenContainer.react';
import { persistor, store } from '../../store/store';

export default function ProgressScreen() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProgressScreenContainer />
      </PersistGate>
    </Provider>
  );
}
