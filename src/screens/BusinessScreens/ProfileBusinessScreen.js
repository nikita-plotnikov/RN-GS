import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import AppBackground from '../../components/AppBackground';
import { theme } from '../../core/theme';

export default function ProfileBusinessScreen({ navigation }) {
  // const { data } = useQuery(GET_USER, {
  //   fetchPolicy: 'cache-first',
  // });

  const goToBuisenessSettings = () => {
    navigation.push('BuisenessSettingsScreen');
  };

  const goToBusinessRoles = () => {
    navigation.push('BusinessRolesScreen');
  };

  return (
    <>
      <AppBackground
        navigation={navigation}
        title={'Направления бизнеса'}
        back={true}>
        <TouchableOpacity style={styles.button} onPress={goToBuisenessSettings}>
          <View style={styles.firstGroupInButton}>
            <Avatar.Icon
              size={40}
              icon={'office-building'}
              color={theme.colors.tint}
            />
            <Text style={styles.textButton}>Добавить бизнес</Text>
          </View>
          <View style={styles.secondGroupInButton}>
            <Avatar.Icon
              icon={'chevron-right'}
              size={45}
              style={styles.rightIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToBusinessRoles}>
          <View style={styles.firstGroupInButton}>
            <Avatar.Icon
              size={40}
              icon={'account-multiple-plus'}
              color={theme.colors.tint}
            />
            <Text style={styles.textButton}>Настройка ролей</Text>
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
      {/* ) : (
      <AppBackground isLoading={true}>
        <ActivityIndicator size="large" />
      </AppBackground>
      )} */}
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
