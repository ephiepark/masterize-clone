import { StyleSheet } from 'react-native';
import {
  pastelPalette
} from '../../../styles/Colors';
import { fontSizeResponsive } from '../../../utils/Metrics';

const styles = StyleSheet.create({
  noteButton: {
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: pastelPalette.highlight,
    margin: 5,
    position: 'absolute'
  },
  noteButtonText: {
    padding: 15,
    alignItems: 'center',
    fontSize: fontSizeResponsive(2)
  }
});

export default styles;
