import React from 'react';
import { View, Text } from 'react-native';
import Image from 'react-native-scalable-image';

import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { width } from '../../../../utils/Metrics';
import { notFound } from '../../../../utils/StaticImages';

import styles from './styles';

const getImageApi = image =>
  image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : notFound;

export default class AppRow extends React.PureComponent {
  render() {
    const { numColumns, item } = this.props;
    if (numColumns === 1) {
      return (
        <TouchableOpacity
          onPress={() => navigate('AppDetails', { id: item.id })}
        >
          <View style={styles.containerItem}>
            <Image
              source={getImageApi(item.poster_path)}
              style={[styles.photo, { backgroundColor: item.color }]}
              width={width * 0.3}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.name}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text numberOfLines={1} style={styles.textSmall}>
                    Category: 
                    {' '}
                    {item.type}
                  </Text>
                </View>
                <Text style={styles.textSmall}>
                  Features: 
                  {' '}
                  {item.desc}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <TouchableOpacity
        style={styles.containerTwoItem}
        onPress={() => navigate('MovieDetails', { id: item.id })}
      >
        <View>
          <Image
            source={getImageApi(item.poster_path)}
            style={[styles.photo, { backgroundColor: item.color }]}
            width={width * 0.3}
          />
        </View>
        <Text numberOfLines={2} style={styles.textTwoTitle}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
