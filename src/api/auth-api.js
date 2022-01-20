import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function signUpUser({ email, password }) {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await auth().currentUser.sendEmailVerification();
    return { user };
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return { error: 'That email address is already in use!' };
    }
    return {
      error: error.message,
    };
  }
}

export async function signInUser({ email, password }) {
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    return { user };
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return {
        error:
          'Пользователь с таким логином и паролем не найден. Проверьте корректность введенных данных',
      };
    }
    return {
      error: error.message,
    };
  }
}

export async function signInWithGoogle() {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const { user } = await auth().signInWithCredential(googleCredential);
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function resetPassword({ email }) {
  try {
    await auth().sendPasswordResetEmail(email);
    return { status: true };
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return {
        error: 'Пользователь с указанным email не зарегистрирован в системе',
      };
    }
    return {
      error: error.message,
    };
  }
}

export async function logoutUser() {
  try {
    auth().signOut();
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('tokenRefresh');
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
