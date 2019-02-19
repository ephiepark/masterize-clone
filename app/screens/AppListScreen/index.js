import React, { Component } from 'react';
import { Asset } from 'expo';
import { View, Text, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Assets as StackAssets } from 'react-navigation-stack';

import NotificationCard from '../../components/cards/NotificationCard';
import FilterModal from '../../components/modals/FilterModal';
import AppRow from '../../components/cards/rows/AppRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import {
  darkBlue,
  blue,
  lightRed,
  lightYellow,
  lightGreen,
} from '../../styles/Colors';

import styles from './styles';

const APPS = [
  {
    id: 1,
    name: 'Perfect Pitch',
    type: 'MUSIC',
    desc: 'Blind pitch testing and performance tracking',
    color: blue,
  },
  {
    id: 2,
    name: 'Golf Swing',
    type: 'SPORTS',
    desc: 'Golf swing analysis and auto-suggestion',
    color: lightYellow,
  },
  {
    id: 3,
    name: 'Something Else',
    type: 'SPECIAL',
    desc: 'Something great that will impress you',
    color: lightRed,
  },
];

const AppListRow = ({
  data,
  type,
  keyGrid,
  numColumns,
  renderItem,
}) => (
  <FlatList
    data={data}
    key={keyGrid}
    numColumns={numColumns}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) =>
      renderItem(item, numColumns)
    }
  />
);

export default class AppListScreen extends Component {
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
      ),
    };
  };

  state = {
    isVisible: false,
    filterType: 'popularity.desc',
    filterName: 'Most popular',
    numColumns: 1,
    keyGrid: 1,
  };

  async componentDidMount() {
    Asset.loadAsync(StackAssets);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      isVisible,
      keyGrid,
    } = this.state;

    if (
      isVisible !== nextState.isVisible ||
      keyGrid !== nextState.keyGrid
    ) {
      return true;
    }

    return false;
  }

  renderItem = (item, numColumns) => (
    <AppRow
      item={item}
      numColumns={numColumns}
    />
  );

  actionGrid = () => {
    this.setState(({ numColumns, keyGrid }) => {
      return { numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 };
    });
  };

  actionFilter = () => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      isVisible,
      filterType,
      filterName,
      numColumns,
      keyGrid,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.containerList}>
          <View style={styles.containerMainText}>
            <Text style={styles.textMain} numberOfLines={1}>
              {filterName}
            </Text>
            <TouchableOpacity
              style={[
                styles.buttonGrid,
                numColumns === 2 && styles.buttonGridActive,
              ]}
              onPress={this.actionGrid}
            >
              <Feather name="grid" size={22} color={darkBlue} />
            </TouchableOpacity>
          </View>
          <AppListRow
            data={APPS}
            type="normal"
            keyGrid={keyGrid}
            numColumns={numColumns}
            renderItem={this.renderItem}
          />
        </View>
        <FilterModal
          isVisible={isVisible}
          filterType={filterType}
          filterName={filterName}
          actionFilter={this.actionFilter}
          actionSwitchMovie={this.actionSwitchMovie}
          style={styles.bottomModal}
        />
      </View>
    );
  }
}
