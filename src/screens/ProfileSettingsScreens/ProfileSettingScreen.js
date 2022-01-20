import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { GET_USER } from '../../apollo/queries/getMeQuery';
import { logoutUser } from '../../api/auth-api';
import AppBackground from '../../components/AppBackground';
import PhotoUploader from '../../components/PhotoUploader';
import { theme } from '../../core/theme';
// import auth from '@react-native-firebase/auth';

export default function ProfileSettingScreen({ navigation }) {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-first',
  });
  // const data = {
  //   getMe: {
  //     user: {},
  //   },
  // };
  const [photo, setPhoto] = useState();
  const updatePhoto = async value => {
    setPhoto(value);
    // TODO: intergate backend for photo
    // await auth().currentUser.updateProfile({
    //   displayName: auth().currentUser.displayName,
    //   photoURL: value,
    // });
  };

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction) {
      setPhoto({ uri: data.getMe.user.profilePicture });
    }
    return () => (cleanupFunction = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    logoutUser();
    navigation.reset({
      routes: [{ name: 'StartScreen' }],
    });
  };
  return (
    <>
      {data ? (
        <AppBackground
          navigation={navigation}
          isProfile={true}
          back={true}
          title={'Профиль'}>
          <PhotoUploader photo={photo} setPhoto={updatePhoto} size={100} />
          <TouchableOpacity
            style={[styles.button, styles.firstButton]}
            onPress={() => navigation.push('NameChangeScreen')}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon
                size={40}
                icon={'account'}
                color={theme.colors.tint}
              />
              <Text style={styles.textButton}>
                {`${
                  data.getMe.user.firstName ? data.getMe.user.firstName : 'Имя'
                } ${
                  data.getMe.user.secondName
                    ? data.getMe.user.secondName
                    : 'Фамилия'
                }`}
              </Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('EmailChangeScreen')}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon size={40} icon={'email'} color={theme.colors.tint} />
              <Text style={styles.textButton}>
                {data.getMe.user.email ? data.getMe.user.email : 'Email'}
              </Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('PhoneChangeScreen')}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon size={40} icon={'phone'} color={theme.colors.tint} />
              <Text style={styles.textButton}>
                {data.getMe.user.phone ? data.getMe.user.phone : 'Телефон'}
              </Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('PasswordChangeScreen')}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon size={40} icon={'lock'} color={theme.colors.tint} />
              <Text style={styles.textButton}>Сменить пароль</Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('AddressChangeScreen')}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon size={40} icon={'home'} color={theme.colors.tint} />
              <Text style={styles.textButton}>Адрес</Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon
                size={40}
                icon={'logout-variant'}
                color={theme.colors.tint}
              />
              <Text style={styles.textButton}>Выйти</Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
        </AppBackground>
      ) : (
        <AppBackground isProfile={true}>
          <ActivityIndicator size="large" />
        </AppBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  firstButton: {
    marginTop: 20,
  },
  firstGroupInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
  },
  textButton: {
    fontSize: 18,
    paddingStart: 10,
    fontWeight: 'bold',
  },
  rightIcon: {
    backgroundColor: theme.colors.tint,
  },
});
