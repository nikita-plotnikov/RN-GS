import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppBackground from '../../components/AppBackground';
import Button from '../../components/Button';
import { confirmPasswordValidator } from '../../core/helpers/confirmPasswordValidator';
import { passwordValidator } from '../../core/helpers/passwordValidator';
import { requireValidator } from '../../core/helpers/requireValidator';
import auth from '@react-native-firebase/auth';
import PasswordInput from '../../components/PasswordInput';

export default function PasswordChangeScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const onNextPress = async () => {
    const currentPasswordError = requireValidator(currentPassword.value);
    if (currentPasswordError) {
      setCurrentPassword({ ...currentPassword, error: currentPasswordError });
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
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value,
    );
    if (passwordError || confirmPasswordError) {
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
    } else {
      try {
        setLoading(true);
        await auth().currentUser.updatePassword(password.value);
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
      title={'Изменить пароль'}
      navigation={navigation}>
      {step === 1 && (
        <View style={styles.view}>
          <PasswordInput
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            label={'Введите ваш текущий пароль'}
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
          <PasswordInput
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            label={'Введите новый пароль'}
            errorText={password.error}
            error={password.error}
          />
          <PasswordInput
            value={confirmPassword.value}
            onChangeText={text =>
              setConfirmPassword({ value: text, error: '' })
            }
            label={'Введите новый пароль повторно'}
            errorText={confirmPassword.error}
            error={confirmPassword.error}
          />
          <Button onPress={onButtonPress} loading={loading} mode="contained">
            Изменить пароль
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
