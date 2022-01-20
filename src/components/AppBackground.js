import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Appbar, Avatar, Menu } from 'react-native-paper';
import { theme } from '../core/theme';
const deviceHeight = Dimensions.get('window').height;

export default function AppBackground({
  children,
  navigation,
  back,
  onBack,
  step,
  avatar,
  title,
  label,
  isProfile,
  userBusienesses,
  selectBusiness,
  goToProfileSettings,
  isLoading,
}) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const goToProfile = () => {
    goToProfileSettings();
  };
  return (
    <>
      <Appbar.Header>
        {back ? (
          <Appbar.BackAction
            onPress={
              onBack
                ? step > 1
                  ? onBack
                  : navigation.goBack
                : navigation.onBack
            }
          />
        ) : null}
        <Appbar.Content title={title} style={back && styles.titleBack} />
        {!back ? (
          isProfile ? (
            <Appbar.Action
              icon={() =>
                avatar ? (
                  <Avatar.Image size={40} source={{ uri: avatar }} />
                ) : label ? (
                  <Avatar.Text size={40} label={label} />
                ) : (
                  <Avatar.Icon size={40} icon={'account'} />
                )
              }
              color="white"
              onPress={goToProfile}
              animated={false}
            />
          ) : isLoading ? (
            <></>
          ) : (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action
                  icon={() =>
                    avatar ? (
                      <Avatar.Image size={40} source={{ uri: avatar }} />
                    ) : label ? (
                      <Avatar.Text size={40} label={label} />
                    ) : (
                      <Avatar.Icon size={40} icon={'office-building'} />
                    )
                  }
                  color="white"
                  onPress={openMenu}
                  animated={false}
                />
              }>
              {userBusienesses.map((business, key) => {
                return (
                  <Menu.Item
                    key={key}
                    onPress={() => {
                      selectBusiness(business.id);
                    }}
                    title={business.name}
                  />
                );
              })}
            </Menu>
          )
        ) : null}
      </Appbar.Header>
      <KeyboardAvoidingView style={styles.background} behavior="height">
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={isLoading ? styles.loadingContainer : styles.container}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.colors.tint,
  },
  scrollView: {
    width: '100%',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    width: '100%',
    minHeight: deviceHeight - 150,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBack: {
    textAlign: 'center',
  },
});
