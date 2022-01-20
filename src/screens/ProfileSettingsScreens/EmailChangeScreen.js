import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppBackground from '../../components/AppBackground';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { requireValidator } from '../../core/helpers/requireValidator';
import { emailValidator } from '../../core/helpers/emailValidator';
import auth from '@react-native-firebase/auth';
import PasswordInput from '../../components/PasswordInput';

export default function EmailChangeScreen({ navigation }) {
  const [password, setPassword] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log('pass', password);

  const onNextPress = async () => {
    const passwordError = requireValidator(password.value);
    if (passwordError) {
      setPassword({ ...password, error: passwordError });
    } else {
      setLoading(true);
      const cred = auth.EmailAuthProvider.credential(
        await auth().currentUser(),
        password.value,
      );
      try {
        await auth().currentUser.reauthenticateWithCredential(cred);
        setLoading(false);
        setStep(2);
      } catch (err) {
        console.log('ERROR', err);
        setLoading(false);
      }
    }
  };

  const onButtonPress = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
    } else {
      try {
        setLoading(true);
        await auth().currentUser.updateEmail(email.value);
        setLoading(false);
      } catch (err) {
        console.log('ERROR', err);
        setLoading(false);
      }
    }
  };

  return (
    <AppBackground
      back={true}
      title={'Изменить E-mail'}
      navigation={navigation}>
      {step === 1 && (
        <View style={styles.view}>
          <PasswordInput
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            label={'Введите ваш пароль'}
            errorText={password.error}
            error={password.error}
          />
          <Button onPress={onNextPress} loading={loading} mode="contained">
            Продолжить
          </Button>
        </View>
      )}
      {step === 2 && (
        <View style={styles.view}>
          <TextInput
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            label={'Введите ваш Email'}
            errorText={email.error}
            error={email.error}
          />
          <Button onPress={onButtonPress} loading={loading} mode="contained">
            Изменить e-mail
          </Button>
        </View>
      )}
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '80%',
  },
});
