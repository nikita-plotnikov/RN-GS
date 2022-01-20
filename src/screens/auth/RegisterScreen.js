import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import { emailValidator } from '../../core/helpers/emailValidator';
import { passwordValidator } from '../../core/helpers/passwordValidator';
import BackButton from '../../components/BackButton';
import { confirmPasswordValidator } from '../../core/helpers/confirmPasswordValidator';
import { theme } from '../../core/theme';
import { signUpUser } from '../../api/auth-api';
import PasswordInput from '../../components/PasswordInput';
import { createOneButtonAlert } from '../../common/alerts';
import auth from '@react-native-firebase/auth';
import { AUTH_USER } from '../../apollo/mutations/authMutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/react-hooks';
import { getUniqueId } from 'react-native-device-info';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);

  const deviceId = getUniqueId();

  const [authUser] = useMutation(AUTH_USER, {
    async onCompleted({ thirdPartyAuthentication }) {
      const { token, tokenRefresh } = thirdPartyAuthentication;
      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('tokenRefresh', tokenRefresh);
        navigation.reset({
          routes: [{ name: 'RegistrationProfileScreen' }],
        });
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  const onRegisterPressed = async () => {
    try {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      const confirmPasswordError = confirmPasswordValidator(
        password.value,
        confirmPassword.value,
      );
      if (emailError || passwordError || confirmPasswordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      } else {
        setLoading(true);
        const response = await signUpUser({
          email: email.value,
          password: password.value,
        });
        if (response.error) {
          createOneButtonAlert('Ошибка', response.error);
          setLoading(false);
        }
        if (response.user) {
          await auth().currentUser.sendEmailVerification();
          const userEmail = response.user.email;
          const userUid = response.user.uid;
          const accountStatus = response.user.emailVerified
            ? 'ACTIVE'
            : 'NOT_ACTIVE';
          authUser({
            variables: {
              email: userEmail,
              uid: userUid,
              deviceId: deviceId,
              accountStatus: accountStatus,
            },
          });
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Добро пожаловать</Header>
      <TextInput
        value={email.value}
        error={email.error}
        errorText={email.error}
        onChangeText={text => setEmail({ value: text, error: '' })}
        label="Email"
      />
      <PasswordInput
        value={password.value}
        error={password.error}
        errorText={password.error}
        onChangeText={text => setPassword({ value: text, error: '' })}
        label="Пароль"
      />
      <PasswordInput
        value={confirmPassword.value}
        error={confirmPassword.error}
        errorText={confirmPassword.error}
        onChangeText={text => setConfirmPassword({ value: text, error: '' })}
        label="Подтвердите пароль"
      />
      <Button loading={loading} mode="contained" onPress={onRegisterPressed}>
        Зарегестрироваться
      </Button>
      <View style={styles.row}>
        <Text>Уже зарегестрированы? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Войти</Text>
        </TouchableOpacity>
      </View>
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
  },
});
