import React from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import Button from '../components/Button';
import Logo from '../components/Logo';

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Gain Systems</Header>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}>
        Вход
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}>
        Регистрация
      </Button>
    </Background>
  );
}
