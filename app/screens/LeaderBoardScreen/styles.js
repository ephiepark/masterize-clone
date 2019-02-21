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
  },
  scoreBoardContainer: {
    padding: 30,
  },
  scoreBoardHeader: {
    alignItems: 'center',
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold',
    color: darkBlue,
    padding: 20,
  },
  scoreBoardItem: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default styles;
