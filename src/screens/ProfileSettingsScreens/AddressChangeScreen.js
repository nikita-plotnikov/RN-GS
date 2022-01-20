import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppBackground from '../../components/AppBackground';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { requireValidator } from '../../core/helpers/requireValidator';

export default function AddressChangeScreen({ navigation }) {
  const [address, setAddress] = useState({ value: '', error: '' });
  const [city, setCity] = useState({ value: '', error: '' });
  const [region, setRegion] = useState({ value: '', error: '' });

  const onButtonPress = () => {
    const addressError = requireValidator(address.value);
    const cityError = requireValidator(city.value);
    const regionError = requireValidator(region.value);
    if (addressError || cityError || regionError) {
      setAddress({ ...address, error: addressError });
      setCity({ ...city, error: cityError });
      setRegion({ ...region, error: regionError });
    } else {
    }
  };

  return (
    <AppBackground back={true} title={'Изменить адрес'} navigation={navigation}>
      <View style={styles.view}>
        <TextInput
          value={region.value}
          error={region.error}
          errorText={region.error}
          onChangeText={text => setRegion({ value: text, error: '' })}
          label="Регион"
        />
        <TextInput
          value={city.value}
          error={city.error}
          errorText={city.error}
          onChangeText={text => setCity({ value: text, error: '' })}
          label="Город"
        />
        <TextInput
          value={address.value}
          error={address.error}
          errorText={address.error}
          onChangeText={text => setAddress({ value: text, error: '' })}
          label="Адрес"
        />
        <Button onPress={onButtonPress} mode="contained">
          Продолжить
        </Button>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '80%',
  },
});
