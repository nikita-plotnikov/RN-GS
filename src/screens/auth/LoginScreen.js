import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import Header from '../../components/Header';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import { emailValidator } from '../../core/helpers/emailValidator';
import { passwordValidator } from '../../core/helpers/passwordValidator';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { signInUser, signInWithGoogle } from '../../api/auth-api';
import GoogleLogin from '../../components/GoogleLogin';
import PasswordInput from '../../components/PasswordInput';
import { createOneButtonAlert } from '../../common/alerts';
import { AUTH_USER } from '../../apollo/mutations/authMutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId } from 'react-native-device-info';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [appLoading, setAppLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const deviceId = getUniqueId();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    paddingVertical: 20,
    margin: 10,
  };

  const [authUser] = useMutation(AUTH_USER, {
    async onCompleted({ thirdPartyAuthentication }) {
      console.log('ON COMPLETED');
      const { token, tokenRefresh } = thirdPartyAuthentication;
      try {
        console.log('TOKEN', token);
        console.log('REFRESH', tokenRefresh);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('tokenRefresh', tokenRefresh);
        navigation.reset({
          routes: [{ name: 'AppBottom' }],
        });
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    } else {
      setAppLoading(true);
      console.log('SIGN IN');
      const response = await signInUser({
        email: email.value,
        password: password.value,
      });
      console.log('RESPONSE', response);
      if (response.error) {
        createOneButtonAlert('Ошибка', response.error);
        setAppLoading(false);
      }
      if (response.user) {
        console.log('USER', response.user);
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
  };

  const onGooglePressed = async () => {
    setAppLoading(true);
    const response = await signInWithGoogle();
    if (response.error) {
      createOneButtonAlert('Ошибка', response.error);
      setAppLoading(false);
    }
    if (response.user) {
      const userEmail = response.user.email;
      const userUid = response.user.uid;
      const accountStatus = response.user.emailVerified
        ? 'ACTIVE'
        : 'NOT_ACTIVE';
      const displayName = response.user.displayName;
      const profilePicture = response.user.photoURL;
      authUser({
        variables: {
          email: userEmail,
          uid: userUid,
          deviceId: deviceId,
          accountStatus: accountStatus,
          displayName: displayName,
          profilePicture: profilePicture,
        },
      });
    }
  };
  return (
    <Background>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <ScrollView style={styles.modalView}>
              <Text style={styles.modalText}>
                Suspendisse sollicitudin, risus nec venenatis sodales, quam orci
                consequat risus, ac lacinia urna nisi imperdiet massa. Curabitur
                lacinia auctor nisi non vestibulum. Phasellus eget libero lacus.
                Vestibulum interdum lorem quis pellentesque vehicula. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Proin quis
                elementum metus. Vestibulum porttitor dolor sem, eget varius
                urna consequat iaculis. Suspendisse pretium lectus id pharetra
                placerat. Curabitur ut accumsan tellus. Vivamus tincidunt metus
                ut faucibus consectetur. In consectetur egestas condimentum.
                Nulla pulvinar tristique rutrum. Maecenas sollicitudin urna quis
                viverra dignissim. Mauris purus nulla, aliquam quis tellus eu,
                blandit interdum magna. Curabitur finibus varius felis, in
                molestie eros. Cras eu tortor vel erat finibus consequat.
                Suspendisse sollicitudin, risus nec venenatis sodales, quam orci
                consequat risus, ac lacinia urna nisi imperdiet massa. Curabitur
                lacinia auctor nisi non vestibulum. Phasellus eget libero lacus.
                Vestibulum interdum lorem quis pellentesque vehicula. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Proin quis
                elementum metus. Vestibulum porttitor dolor sem, eget varius
                urna consequat iaculis. Suspendisse pretium lectus id pharetra
                placerat. Curabitur ut accumsan tellus. Vivamus tincidunt metus
                ut faucibus consectetur. In consectetur egestas condimentum.
                Nulla pulvinar tristique rutrum. Maecenas sollicitudin urna quis
                viverra dignissim. Mauris purus nulla, aliquam quis tellus eu,
                blandit interdum magna. Curabitur finibus varius felis, in
                molestie eros. Cras eu tortor vel erat finibus consequat.
                Suspendisse sollicitudin, risus nec venenatis sodales, quam orci
                consequat risus, ac lacinia urna nisi imperdiet massa. Curabitur
                lacinia auctor nisi non vestibulum. Phasellus eget libero lacus.
                Vestibulum interdum lorem quis pellentesque vehicula. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Proin quis
                elementum metus. Vestibulum porttitor dolor sem, eget varius
                urna consequat iaculis. Suspendisse pretium lectus id pharetra
                placerat. Curabitur ut accumsan tellus. Vivamus tincidunt metus
                ut faucibus consectetur. In consectetur egestas condimentum.
                Nulla pulvinar tristique rutrum. Maecenas sollicitudin urna quis
                viverra dignissim. Mauris purus nulla, aliquam quis tellus eu,
                blandit interdum magna. Curabitur finibus varius felis, in
                molestie eros. Cras eu tortor vel erat finibus consequat.
                Suspendisse sollicitudin, risus nec venenatis sodales, quam orci
                consequat risus, ac lacinia urna nisi imperdiet massa. Curabitur
                lacinia auctor nisi non vestibulum. Phasellus eget libero lacus.
                Vestibulum interdum lorem quis pellentesque vehicula. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Proin quis
                elementum metus. Vestibulum porttitor dolor sem, eget varius
                urna consequat iaculis. Suspendisse pretium lectus id pharetra
                placerat. Curabitur ut accumsan tellus. Vivamus tincidunt metus
                ut faucibus consectetur. In consectetur egestas condimentum.
                Nulla pulvinar tristique rutrum. Maecenas sollicitudin urna quis
                viverra dignissim. Mauris purus nulla, aliquam quis tellus eu,
                blandit interdum magna. Curabitur finibus varius felis, in
                molestie eros. Cras eu tortor vel erat finibus consequat.
              </Text>
            </ScrollView>
          </Modal>
        </Portal>
      </View>
      <BackButton goBack={navigation.goBack} disable={appLoading} />
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
      <Button
        loading={appLoading}
        disable={appLoading}
        mode="contained"
        onPress={onLoginPressed}>
        Войти
      </Button>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.replace('ResetPasswordScreen')}
          disable={appLoading}>
          <Text style={styles.forgot}>Забыли пароль?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text>У вас нет аккаунта? </Text>
        <TouchableOpacity
          onPress={() => navigation.replace('RegisterScreen')}
          disable={appLoading}>
          <Text style={styles.link}>Зарегестрироваться</Text>
        </TouchableOpacity>
      </View>
      <GoogleLogin onPress={() => onGooglePressed()} disable={appLoading} />
      <View style={styles.bottom}>
        <TouchableOpacity onPress={showModal} disable={appLoading}>
          <Text style={styles.link}>Политика обработки данных</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 1,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
  },
  modalView: {
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 16,
  },
});
