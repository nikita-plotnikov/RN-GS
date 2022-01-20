import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { GET_USER } from '../apollo/queries/getMeQuery';
import AppBackground from '../components/AppBackground';
import { theme } from '../core/theme';

export default function MoreScreen({ navigation }) {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-first',
  });
  // const data = {
  //   getMe: {
  //     user: {},
  //   },
  // };
  const goToProfileSettings = () => {
    navigation.push('ProfileSettingScreen');
  };

  const goToBuisenessSettings = () => {
    navigation.push('ProfileBusinessScreen');
  };

  const goToTeamSettings = () => {
    navigation.push('TeamScreen');
  };

  return (
    <>
      {data ? (
        <AppBackground
          navigation={navigation}
          title={`${data.getMe.user.firstName} ${data.getMe.user.secondName}`}
          isProfile={true}
          goToProfileSettings={goToProfileSettings}
          avatar={data.getMe.user.profilePicture}>
          <TouchableOpacity
            style={[styles.button, styles.firstButton]}
            onPress={goToProfileSettings}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon
                size={40}
                icon={'account'}
                color={theme.colors.tint}
              />
              <Text style={styles.textButton}>Мой аккаунт</Text>
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
            onPress={goToBuisenessSettings}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon
                size={40}
                icon={'office-building'}
                color={theme.colors.tint}
              />
              <Text style={styles.textButton}>Направления бизнеса</Text>
            </View>
            <View style={styles.secondGroupInButton}>
              <Avatar.Icon
                icon={'chevron-right'}
                size={45}
                style={styles.rightIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToTeamSettings}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon
                size={40}
                icon={'account-multiple'}
                color={theme.colors.tint}
              />
              <Text style={styles.textButton}>Моя команда</Text>
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
        <AppBackground isLoading={true}>
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
    marginTop: 0,
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
