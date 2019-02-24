import { connect } from 'react-redux';
import { initRound, handleUserAnswer } from './actions';
import PitchScreen from './PitchScreen.react';

const mapStateToProps = state => {
  return {
    score: state.score,
    level: state.level,
    history: state.history,
    round: state.round
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReadyForRound: () => {
      dispatch(initRound());
    },
    onUserAnswer: noteUserAnswer => {
      dispatch(handleUserAnswer(noteUserAnswer));
    }
  };
};

const PitchScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PitchScreen);

export default PitchScreenContainer;
