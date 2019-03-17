// @flow

import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';
import {
  pastelPalette,
  black
} from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 18
  },
  title: {
    fontSize: fontSizeResponsive(4),
    fontWeight: 'bold',
    color: pastelPalette.primary
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingTop: 50
  },
  subtitle: {
    fontSize: fontSizeResponsive(2),
    fontWeight: 'bold',
    color: pastelPalette.secondary
  },
  score: {
    fontSize: fontSizeResponsive(2),
    fontWeight: 'bold',
    color: pastelPalette.extra
  },
  nameContainer: {
    alignItems: 'center',
    padding: 20
  },
  displayContainer: {
    alignItems: 'center',
    margin: 60
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center'
  },
  toggle: {
    color: black,
    fontWeight: '900'
  }
});

export default styles;
