import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem } from "react-native-elements";
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
      this.setState({scores: snapshot.val()})
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

  sortByScores = (scoreBoard) => {
    var sortedScores = [];
    for (var name in scoreBoard) {
      sortedScores.push({name: name, score: scoreBoard[name].score});
    }
    sortedScores.sort(function(a, b) {
      return b.score - a.score;
    });
    return sortedScores;
  }

  renderScoreBoardItem = ({item, index}) => {
    const rank = index + 1;
    return (
      <ListItem
        key={`scoreBoardItem--${index}`}
        containerStyle={rank % 2 === 0 ? styles.scoreBoardRow : styles.scoreBoardRowOffset}
        title={item.name}
        titleStyle={styles.scoreBoardTitle}
        subtitle={
          <Text style={styles.scoreBoardSubtitle}>
            Score : {item.score}
          </Text>
        }
        leftAvatar={
          <View style={styles.scoreRankBadge}>
            <Text style={styles.scoreRank}>
              {rank}
            </Text>
          </View>
        }
      />
    )
  }

  render() {
    const loading = this.state.scores === null;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FlatList
            data={this.sortByScores(this.state.scores)}
            renderItem={this.renderScoreBoardItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    );
  }
}
