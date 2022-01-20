import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Logo from '../../../../components/Logo';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../core/theme';

export default function CreateBuisenessStep4({
  site,
  setSite,
  email,
  setEmail,
  phone,
  setPhone,
  saveAndGoHomePage,
  setStep,
  back,
}) {
  return (
    <>
      <Background>
        {!back && <Logo />}
        <Header>Контакты</Header>
        <TextInput
          value={site.value}
          error={site.error}
          errorText={site.error}
          onChangeText={text => setSite({ value: text, error: '' })}
          label="Сайт"
        />
        <TextInput
          value={email.value}
          error={email.error}
          errorText={email.error}
          onChangeText={text => setEmail({ value: text, error: '' })}
          label="Email"
        />
        <TextInput
          value={phone.value}
          error={phone.error}
          errorText={phone.error}
          onChangeText={text => setPhone({ value: text, error: '' })}
          label="Телефон"
        />
        <Button mode="contained" onPress={() => setStep(5)}>
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
