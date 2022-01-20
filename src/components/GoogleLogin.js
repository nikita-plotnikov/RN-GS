import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { GoogleLogo } from '../assets/icons';
import { theme } from '../core/theme';

export default function GoogleLogin({ onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <Text style={styles.dividerText}>Или</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <GoogleLogo />
          <Text style={styles.buttonText}>Войти с Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    position: 'relative',
    width: '96%',
    height: 1,
    backgroundColor: theme.colors.text,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerText: {
    position: 'absolute',
    backgroundColor: theme.colors.tint,
    color: theme.colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    borderColor: theme.colors.google,
    backgroundColor: theme.colors.surface,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  buttonText: {
    paddingLeft: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 15,
  },
});
