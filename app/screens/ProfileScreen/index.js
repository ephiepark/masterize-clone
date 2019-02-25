import React from 'react';
import { Provider } from 'react-redux';
import ProfileScreenContainer from './ProfileScreenContainer.react';
import store from '../../store/store';

export default function PitchScreenApp() {
  return (
    <Provider store={store}>
      <ProfileScreenContainer />
    </Provider>
  );
};
