import React, { memo } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
// import styles from './Styles';
import { Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text, Platform } from 'react-native';
import { theme } from '../core/theme';

const deviceHeight = Dimensions.get('screen').height;
const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;
const entryBorderRadius = 0;
const IS_IOS = Platform.OS === 'ios';

const StoriesCarousel = ({ closeModal, jsonData }) => {
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View>
        <Carousel
          hasParallaxImages={true}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          sliderWidth={sliderWidth}
          sliderHeight={itemHeight}
          itemWidth={sliderWidth}
          data={jsonData.ENTRIES1}
          renderItem={renderItem}
          enableMomentum={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 0,
    padding: 0,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderColor: 'red',
    height: deviceHeight - 98,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  closeButton: {
    zIndex: 999,
    justifyContent: 'center',
    backgroundColor: theme.colors.tint,
    width: 25,
    height: 25,
    borderRadius: 25,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    alignItems: 'center',
    color: '#808080',
    fontWeight: 'bold',
  },
});
export default memo(StoriesCarousel);
