import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppBackground from '../../components/AppBackground';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { phoneValidator } from '../../core/helpers/phoneValidator';

export default function PhoneChangeScreen({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' });

  const onButtonPress = () => {
    const phoneError = phoneValidator(phone.value);
    if (phoneError) {
      setPhone({ ...phone, error: phoneError });
    } else {
      console.log('Phone', phone.value);
    }
  };

  return (
    <AppBackground
      back={true}
      title={'Изменить телефон'}
      navigation={navigation}>
      <View style={styles.view}>
        <TextInput
          value={phone.value}
          onChangeText={text => setPhone({ value: text, error: '' })}
          label={'Введите ваш номер'}
          errorText={phone.error}
          error={phone.error}
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
