import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../core/theme';
import { YaMap, Marker, Circle } from 'react-native-yamap';
import location from '../assets/location.png';
YaMap.init('f9a8e30e-dbb2-4a72-81cc-174ed3aeba2b');
YaMap.setLocale('ru_RU');

export default function YandexMap({ marker, setMarker }) {
  const map = useRef();

  const onMapLongPress = async event => {
    const { lat, lon } = event.nativeEvent;
    setMarker({ lat, lon });
    // const address = await Geocoder.geoToAddress(marker);
    // if (address) {
    //   this.setState({ address: address.formatted });
    // }
  };

  const onMarkerPress = () => {
    setMarker(undefined);
  };

  return (
    <View style={styles.background}>
      <YaMap
        ref={map}
        style={styles.container}
        showUserPosition
        onMapLongPress={onMapLongPress}>
        {marker ? (
          <>
            <Marker
              anchor={{
                x: 0.5,
                y: 1,
              }}
              scale={1}
              onPress={onMarkerPress}
              point={marker}
              source={location}
            />
            <Circle
              center={marker}
              radius={2}
              fillColor="#ff000080"
              strokeColor={'#ffff00'}
            />
          </>
        ) : null}
      </YaMap>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '80%',
    backgroundColor: theme.colors.tint,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
