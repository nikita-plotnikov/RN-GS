import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Background from '../components/Background';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '563253858534-h0tck380mrvps08139mbvqevfj5i1j3g.apps.googleusercontent.com',
});

export default function AuthLoadingScreen({ navigation }) {
  function onAuthStateChanged(currentUser) {
    console.log('CURRENT USER', currentUser);
    if (!currentUser) {
      navigation.reset({
        routes: [{ name: 'StartScreen' }],
      });
    }
    if (currentUser) {
      navigation.reset({
        routes: [{ name: 'AppBottom' }],
      });
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <ActivityIndicator size="large" />
    </Background>
  );
}
