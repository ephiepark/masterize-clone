// @flow

import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';
import {
  white,
  darkBlue,
  pastelPalette,
} from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 18,
  },
  contentContainer: {
    backgroundColor: pastelPalette.primary,
    flex: 1,
    margin: 8,
    padding: 30,
    borderRadius: 18,
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
