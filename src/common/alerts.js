import { Alert } from 'react-native';

export const createOneButtonAlert = (title, description, handleClick) =>
  Alert.alert(title, description, [
    {
      text: 'Закрыть',
      onPress: () => (handleClick ? handleClick() : console.log('Click')),
      style: 'cancel',
    },
  ]);
