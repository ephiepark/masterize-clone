import React from 'react';
import { Provider } from 'react-redux';
import ProgressScreenContainer from './ProgressScreenContainer.react';
import store from '../../store/store';

export default function ProgressScreen() {
  return (
    <Provider store={store}>
      <ProgressScreenContainer />
    </Provider>
  );
};
