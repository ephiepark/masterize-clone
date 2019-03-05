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

  componentDidMount() {
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
    this.props.setUser(firebase.auth().currentUser);
  }

  render() {
    const {displayName, photoURL} = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.avatar}>
            {this.getAvatar(displayName, photoURL)}
          </View>
          <View style={styles.name}>
            <Text style={styles.title}>{displayName}</Text>
          </View>
          <Button
            style={styles.logInAsFBBtn}
            onPress={this.handleLoginAsFB}
            title="Log in as Facebook"
            color={blue}
            key="login"
          />
        </View>
      </View>
    );
  }
}
