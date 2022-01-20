import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Logo from '../../../../components/Logo';
import TextInput from '../../../../components/TextInput';
import TimeRangePicker from '../../../../components/TimeRangePicker';
import { theme } from '../../../../core/theme';

export default function CreateBuisenessStep3({
  region,
  setRegion,
  city,
  setCity,
  address,
  setAddress,
  availibleTime,
  setAvailibleTime,
  saveAndGoHomePage,
  setStep,
  back,
}) {
  return (
    <>
      <Background>
        {!back && <Logo />}
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
        <TimeRangePicker
          label="Время работы"
          value={availibleTime}
          onChangeTime={setAvailibleTime}
        />
        <Button mode="contained" onPress={() => setStep(4)}>
          Далее
        </Button>
        {!back && (
          <TouchableOpacity onPress={saveAndGoHomePage} style={styles.row}>
            <Text style={styles.link}>Пропустить</Text>
          </TouchableOpacity>
        )}
      </Background>
    </>
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
