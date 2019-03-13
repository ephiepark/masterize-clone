// @flow

import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';
import {
  white,
  darkBlue
} from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  avatar: {
    margin: 8,
    alignItems: 'center'
  },
  name: {
    padding: 8,
    alignItems: 'center'
  },
  title: {
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: fontSizeResponsive(2)
  }
});

export default styles;
