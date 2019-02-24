import { connect } from 'react-redux';
import { setScore, setLevel, addHistory, initRound } from './actions';
import PitchScreen from './PitchScreen.react';

const mapStateToProps = state => {
  return {
    score: state.score,
    level: state.level,
    history: state.history,
    round: state.round
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onScoreChange: score => {
      dispatch(setScore(score));
    },
    onLevelChange: level => {
      dispatch(setLevel(level));
    },
    onHistoryRecord: historyRecord => {
      dispatch(addHistory(historyRecord));
    },
    onReadyForRound: () => {
      dispatch(initRound());
    }
  };
};

const PitchScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PitchScreen);

export default PitchScreenContainer;
