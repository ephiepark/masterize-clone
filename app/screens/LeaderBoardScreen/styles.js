import { StyleSheet } from 'react-native';
import {
  lightRed,
  lightYellow,
  lightGreen,
  white,
  lightGray,
  darkBlue,
  pastelPalette,
} from '../../styles/Colors';
import { fontSizeResponsive } from '../../utils/Metrics';

const styles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20
  },
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 18,
  },
  contentContainer: {
    backgroundColor: pastelPalette.secondary,
    flex: 1,
    margin: 8,
    borderRadius: 18,
  },
  scoreBoardRow: {
    backgroundColor: pastelPalette.backgroundDark,
    borderRadius: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  scoreBoardRowOffset: {
    backgroundColor: pastelPalette.primaryLight,
    borderRadius: 18,
    margin: 10,
  },
  scoreRankBadge: {
    alignItems: 'center',
    backgroundColor: pastelPalette.highlight,
    borderRadius: 100,
  },
  scoreRank: {
    alignItems: 'center',
    fontSize: fontSizeResponsive(2),
    padding: 15,
    fontWeight: 'bold',
  },
  scoreBoardTitle: {
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold',
  },
  scoreBoardSubtitle: {
    fontSize: fontSizeResponsive(2),
  },
});

export default styles;
