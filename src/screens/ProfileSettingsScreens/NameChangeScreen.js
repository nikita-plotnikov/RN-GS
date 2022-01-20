import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppBackground from '../../components/AppBackground';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { requireValidator } from '../../core/helpers/requireValidator';
import auth from '@react-native-firebase/auth';

export default function NameChangeScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [secondName, setSecondName] = useState({ value: '', error: '' });
  const [middleName, setMiddleName] = useState({ value: '' });
  const [loading, setLoading] = useState(false);

  const onButtonPress = async () => {
    const firstNameError = requireValidator(firstName.value);
    const secondNameError = requireValidator(secondName.value);
    if (firstNameError || secondNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setSecondName({ ...secondName, error: secondNameError });
    } else {
      try {
        console.log('First name', firstName.value);
        console.log('Second name', secondName.value);
        console.log('Middle name', middleName.value);
        setLoading(true);
        await auth().currentUser.updateProfile({
          displayName: `${firstName} ${secondName} ${middleName}`,
          photoURL: auth().currentUser.photoURL,
        });
        setLoading(false);
      } catch (err) {
        console.log('ERROR', err);
        setLoading(false);
      }
    }
  };

  return (
    <AppBackground back={true} title={'Изменить ФИО'} navigation={navigation}>
      <View style={styles.view}>
        <TextInput
          value={secondName.value}
          onChangeText={text => setSecondName({ value: text, error: '' })}
          label={'Введите вашу фамилию'}
          errorText={secondName.error}
          error={secondName.error}
        />
        <TextInput
          value={firstName.value}
          onChangeText={text => setFirstName({ value: text, error: '' })}
          label={'Введите ваше имя'}
          errorText={firstName.error}
          error={firstName.error}
        />
        <TextInput
          value={middleName.value}
          onChangeText={text => setMiddleName({ value: text, error: '' })}
          label={'Введите ваше отчество'}
          errorText={middleName.error}
          error={middleName.error}
        />
        <Button onPress={onButtonPress} loading={loading} mode="contained">
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
