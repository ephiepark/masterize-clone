import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;
const animationJson = require('./sound_loader.json');

const styles = StyleSheet.create({
  animationContainer: {
    width: 350,
    height: 100
  }
});

export default class SoundLoader extends React.Component {
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

  loadAnimation = () => {
    this.setState({ animation: animationJson }, this.playAnimation);
  };

  // TODO: make loop be on click
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
            autoPlay={true}
            loop={true}
          />
        )}
      </View>
    );
  }
}
