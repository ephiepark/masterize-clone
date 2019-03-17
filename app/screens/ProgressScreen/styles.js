import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';
import { babyBlue } from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 18
  },
  contentContainer: {
    backgroundColor: babyBlue,
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 18
  },
  notesContainer: {
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
