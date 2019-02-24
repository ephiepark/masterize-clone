import React from 'react';
import { Platform } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Feather } from '@expo/vector-icons';
import firebase from './app/utils/firebase';

import AppListScreen from './app/screens/AppListScreen';
import PitchScreenApp from './app/screens/PitchScreen';
import LeaderBoardScreen from './app/screens/LeaderBoardScreen';

const TitleHomeTab = 'Home';
const TitleTrainTab = 'Train';
const TitleLeaderBoardTab = 'LeaderBoard';

const HomeTab = createStackNavigator(
  {
    Home: {
      screen: AppListScreen,
      navigationOptions: {
        title: TitleHomeTab,
        headerTintColor: '#47525E',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

HomeTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="home" size={20} color={tintColor} />
  )
};

const TrainTab = createStackNavigator(
  {
    Train: {
      screen: PitchScreenApp,
      navigationOptions: {
        title: TitleTrainTab,
        headerTintColor: '#47525E',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }
    }
  },
  {
    initialRouteName: 'Train'
  }
);

TrainTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="star" size={20} color={tintColor} />
  )
};

const LeaderBoardTab = createStackNavigator(
  {
    LeaderBoard: {
      screen: LeaderBoardScreen,
      navigationOptions: {
        title: TitleLeaderBoardTab,
        headerTintColor: '#47525E',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }
    }
  },
  {
    initialRouteName: 'LeaderBoard'
  }
);

LeaderBoardTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="list" size={20} color={tintColor} />
  )
};

const MainNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(
        {
          Home: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleHomeTab,
              tabBarVisible: true
            })
          },
          Train: {
            screen: TrainTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleTrainTab,
              tabBarVisible: true
            })
          },
          LeaderBoard: {
            screen: LeaderBoardTab,
            navigationOptions: {
              title: TitleLeaderBoardTab
            }
          }
        },
        {
          tabBarOptions: {
            activeTintColor: '#F95F62',
            inactiveTintColor: '#8190A5',
            showIcon: true,
            labelStyle: {
              margin: 0,
              padding: 2
            },
            style: {
              backgroundColor: '#ffffff'
            }
          },
          animationEnabled: false,
          swipeEnabled: false
        }
      )
    : createMaterialBottomTabNavigator(
        {
          Home: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleHomeTab,
              tabBarVisible: true
            })
          },
          Train: {
            screen: TrainTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleTrainTab,
              tabBarVisible: true
            })
          },
          LeaderBoard: {
            screen: LeaderBoardTab,
            navigationOptions: {
              title: TitleLeaderBoardTab
            }
          }
        },
        {
          initialRouteName: 'Home',
          activeTintColor: '#F95F62',
          inactiveTintColor: '#8190A5',
          shifting: true,
          barStyle: {
            backgroundColor: '#ffffff',
            paddingTop: 2,
            paddingBottom: 2
          }
        }
      );

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator
  },
  {
    initialRouteName: 'Main'
  }
);

export default createAppContainer(AppNavigator);
