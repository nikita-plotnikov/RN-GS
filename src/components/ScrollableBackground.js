import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import { theme } from '../core/theme';

export default function ScrollableBackground({ children }) {
  return (
    <KeyboardAvoidingView style={styles.background} behavior="height">
      <ScrollView>
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.colors.tint,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
