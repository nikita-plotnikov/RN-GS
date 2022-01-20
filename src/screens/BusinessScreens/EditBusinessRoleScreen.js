import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppBackground from '../../components/AppBackground';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { phoneValidator } from '../../core/helpers/phoneValidator';

export default function EditBusinessRoleScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [status, setStatus] = useState({ value: '', error: '' });
  const [premission, setPremission] = useState();

  const changePremission = value => {
    setPremission(value);
  };

  const onButtonPress = () => {};

  return (
    <AppBackground
      back={true}
      title={'Добавление роли'}
      navigation={navigation}>
      <View style={styles.view}>
        <TextInput
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          label={'Введите название'}
          errorText={name.error}
          error={name.error}
        />
        <TextInput
          value={status.value}
          onChangeText={text => setStatus({ value: text, error: '' })}
          label={'Введите статус'}
          errorText={status.error}
          error={status.error}
        />
        <TouchableOpacity>
          <Text style={styles.button}>Настройка доступа</Text>
        </TouchableOpacity>
        <Button onPress={onButtonPress} mode="contained">
          Сохранить
        </Button>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '80%',
  },
  button: {
    textAlign: 'center',
  },
});
