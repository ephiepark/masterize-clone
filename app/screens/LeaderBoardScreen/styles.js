import { StyleSheet } from 'react-native';
import {
  lightRed,
  lightYellow,
  lightGreen,
  white,
  lightGray,
  darkBlue
} from '../../styles/Colors';
import { fontSizeResponsive } from '../../utils/Metrics';

const styles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20
  },
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1,
    padding: 30,
  },
});

export default styles;
