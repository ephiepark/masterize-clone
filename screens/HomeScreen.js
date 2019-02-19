import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { sanFranciscoWeights } from 'react-native-typography';
import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={params.actionFilter}
        >
          <Feather style={{marginRight: 20}} name="filter" size={23} color='black' />
        </TouchableOpacity>
      )
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
            <Text style={[sanFranciscoWeights.thin, styles.title]}>Masterize</Text>
          </View>

          <View style={styles.displayContainer}>
            <Text style={[sanFranciscoWeights.thin]}>(DISPLAY)</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={styles.developmentModeText}>
          (Dev Mode)
        </Text>
      );
    } else {
      return null;
    }
  }

  _handleButtonClick = () => {
    WebBrowser.openBrowserAsync(
      'https://www.facebook.com'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84b0dd',
  },
  contentContainer: {
    paddingTop: 30,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  displayContainer: {
    alignItems: 'center',
    margin: 60,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'center',
  },
});
