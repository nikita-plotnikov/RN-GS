import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Logo from '../../../../components/Logo';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../core/theme';
import Background from '../../../../components/Background';
import BackButton from '../../../../components/BackButton';

export default function RegistrationProfileSecondStep({
  region,
  setRegion,
  city,
  setCity,
  address,
  setAddress,
  loading,
  navigation,
  onSavePressed,
  goBack,
}) {
  return (
    <Background>
      <BackButton goBack={goBack} />
      <Logo />
      <Header>Адрес</Header>
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
      <Button loading={loading} mode="contained" onPress={onSavePressed}>
        Сохранить
      </Button>
      <TouchableOpacity
        onPress={() => navigation.replace('AppBottom')}
        style={styles.row}>
        <Text style={styles.link}>Настроить позже</Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 15,
  },
});
