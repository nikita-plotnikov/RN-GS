import React, { useState } from 'react';
import Header from '../../components/Header';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import { emailValidator } from '../../core/helpers/emailValidator';
import BackButton from '../../components/BackButton';
import { resetPassword } from '../../api/auth-api';
import { createOneButtonAlert } from '../../common/alerts';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const handleClickRedirection = () => {
    navigation.reset({
      routes: [{ name: 'StartScreen' }],
    });
  };

  const onSubmitPressed = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
    }
    setLoading(true);
    const response = await resetPassword({ email: email.value });
    if (response.error) {
      createOneButtonAlert('Ошибка', response.error);
      setLoading(false);
    } else {
      createOneButtonAlert(
        'Успешно',
        'На ваш email отправлено письмо с дальнейшими инструкциями.',
        handleClickRedirection(),
      );
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
        description="На вашу почту будет отправлено письмо с инструкциями"
      />
      <Button loading={loading} mode="contained" onPress={onSubmitPressed}>
        Сбросить пароль
      </Button>
    </Background>
  );
}
