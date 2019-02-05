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
import { sanFranciscoWeights } from 'react-native-typography';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
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

          <View style={styles.buttonContainer}>
            <Icon.Button name="caretright"
                         backgroundColor="#84b0dd"
                         color="#fff"
                         onPress={this._handleButtonClick}/>
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
