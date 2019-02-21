import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';
import {
  white,
  darkBlue
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
    color: white
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingTop: 50
  },
  displayContainer: {
    alignItems: 'center',
    margin: 60
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'center'
  },
  logInAsFBBtn: {
    backgroundColor: darkBlue,
  }
});

export default styles;
