import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Logo from '../../../../components/Logo';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../core/theme';
import Background from '../../../../components/Background';

export default function RegistrationProfileFirstStep({
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  secondName,
  setSecondName,
  phone,
  setPhone,
  onNextPressed,
  navigation,
}) {
  return (
    <Background>
      <Logo />
      <Header>Персональные данные</Header>
      <TextInput
        value={firstName.value}
        error={firstName.error}
        errorText={firstName.error}
        onChangeText={text => setFirstName({ value: text, error: '' })}
        label="Имя"
      />
      <TextInput
        value={middleName.value}
        onChangeText={text => setMiddleName({ value: text, error: '' })}
        label="Отчество"
      />
      <TextInput
        value={secondName.value}
        error={secondName.error}
        errorText={secondName.error}
        onChangeText={text => setSecondName({ value: text, error: '' })}
        label="Фамилия"
      />
      <TextInput
        value={phone.value}
        error={phone.error}
        errorText={phone.error}
        onChangeText={text => setPhone({ value: text, error: '' })}
        label="Телефон"
      />

      <Button mode="contained" onPress={onNextPressed}>
        Далее
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
