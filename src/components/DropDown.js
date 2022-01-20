import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';
import DropDown from 'react-native-paper-dropdown';

export default function DropDownStyled({ errorText, description, ...props }) {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View style={styles.container}>
      <DropDown
        mode={'outlined'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 4,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
