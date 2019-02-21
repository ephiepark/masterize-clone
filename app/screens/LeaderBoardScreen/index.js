import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from '../../utils/firebase';
import NotificationCard from '../../components/cards/NotificationCard';
import FilterModal from '../../components/modals/FilterModal';
import AppRow from '../../components/cards/rows/AppRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import {
  darkBlue,
  blue,
  lightRed,
  lightYellow
} from '../../styles/Colors';

import styles from './styles';

export default class LeaderBoardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={params.actionFilter}
        >
          <Feather name="filter" size={23} color={darkBlue} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    scores: null,
  }

  componentDidMount() {
    this.setupScoreListener();
  };

  setupScoreListener() {
    firebase.database().ref('scores').on('value', (snapshot) => {
      const scores = snapshot.val();
      console.log("scores: " + scores);
      this.setState({scores: scores})
    });
  }

  handleGetRecords = () => {
    const user = firebase.auth().currentUser;
    if (user != null) {
      firebase.database().ref('scores/' + user.displayName).set({
        score: this.state.level,
      });
    }
  }

  render() {
    const loading = this.state.scores === null;
    if (loading) {
      return (
        <View style={styles.container}>
          <View style={styles.containerList}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerList}>
          <Text>{JSON.stringify(this.state.scores)}</Text>
        </View>
      </View>
    );
  }
}
