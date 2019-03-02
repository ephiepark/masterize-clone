import { connect } from 'react-redux';
import { initRound, handleUserAnswer } from '../../actions/pitchActions';
import PitchScreen from './PitchScreen.react';

const mapStateToProps = state => {
  return {
    score: state.pitch.score,
    level: state.pitch.level,
    history: state.pitch.history,
    round: state.pitch.round
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
