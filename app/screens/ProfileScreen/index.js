import React, { Component } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { Avatar } from "react-native-elements";
import firebase from '../../utils/firebase';
import { signInWithFacebook } from '../../utils/auth';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import {
  darkBlue,
  blue,
  lightRed,
  lightYellow
} from '../../styles/Colors';

import styles from './styles';

export default class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
  };

  state = {
    name: '',
    photoURL: ''
  }

  componentDidMount() {
    this.setState({
      name: firebase.auth().currentUser.displayName,
      photoURL: firebase.auth().currentUser.photoURL
    })
  };

  getAvatar(name, photoURL) {
    if(photoURL === '') {
      return (
        <Avatar
          size="xlarge"
          rounded
          title="NA"
          activeOpacity={1}
        />
      )
    }
    return (
      <Avatar
        size="xlarge"
        rounded
        activeOpacity={1}
        source={{
          uri: photoURL
        }}
      />
    )
  }

  handleLoginAsFB = () => {
    signInWithFacebook();
    this.setState({
      name: firebase.auth().currentUser.displayName,
      photoURL: firebase.auth().currentUser.photoURL
    });
  }

  render() {
    const {name, photoURL} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.avatar}>
          {this.getAvatar(name, photoURL)}
        </View>
        <View style={styles.name}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Button
          style={styles.logInAsFBBtn}
          onPress={this.handleLoginAsFB}
          title="Log In as Facebook"
          color={blue}
          key="login"
        />
      </View>
    );
  }
}
