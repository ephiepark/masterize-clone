import { connect } from 'react-redux';
import ProgressScreen from './ProgressScreen.react';

const mapStateToProps = state => {
  return {
    history: state.pitch.history
  };
};

const ProgressScreenContainer = connect(
  mapStateToProps
)(ProgressScreen);

export default ProgressScreenContainer;
