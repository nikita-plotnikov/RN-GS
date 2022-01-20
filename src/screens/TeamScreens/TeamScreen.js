import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { theme } from '../../core/theme';

export default function TeamScreen({ navigation }) {
  // const { data } = useQuery(GET_USER, {
  //   fetchPolicy: 'cache-first',
  // });

  const data = {
    getMe: {
      user: {
        firstName: 'Test',
        secondName: 'Test',
      },
    },
  };

  return (
    <>
      {data ? (
        <AppBackground
          navigation={navigation}
          title={'Команда'}
          back={true}
          avatar={data.getMe.user.profilePicture}>
          <Header>Название бизнеса</Header>
          <Text>ФИО</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TeamMemberScreen')}>
            <View style={styles.firstGroupInButton}>
              <Avatar.Icon
                size={40}
                icon={'account-plus'}
                color={theme.colors.tint}
              />
              <Text style={styles.textButton}>Добавить</Text>
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
