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
    color: white,
  },
  nameContainer: {
    alignItems: 'center',
    padding: 20,
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
});

export default styles;
