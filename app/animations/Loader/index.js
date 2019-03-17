import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;
const animationJson = require('./loader.json');

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 200
  }
});

export default class Loader extends React.Component {
  state = {
    animation: null
  };

  componentWillMount() {
    this.playAnimation();
  }

  playAnimation = () => {
    if (!this.state.animation) {
      this.loadAnimation();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  loadAnimation = async () => {
    this.setState({ animation: animationJson }, this.playAnimation);
  };

  render() {
    return (
      <View>
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={styles.animationContainer}
            source={this.state.animation}
          />
        )}
      </View>
    );
  }
}
