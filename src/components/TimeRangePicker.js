import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';
import { TimePickerModal } from 'react-native-paper-dates';

export default function TimeRangePicker({
  onChangeTime,
  value,
  label,
  ...props
}) {
  const [visibleStart, setVisibleStart] = useState(false);
  const onDismissStart = useCallback(() => {
    setVisibleStart(false);
  }, [setVisibleStart]);

  const onConfirmStart = React.useCallback(
    ({ hours, minutes }) => {
      setVisibleStart(false);
      onChangeTime({ ...value, start: { hours, minutes } });
    },
    [setVisibleStart, value, onChangeTime],
  );
  const [visibleEnd, setVisibleEnd] = useState(false);
  const onDismissEnd = useCallback(() => {
    setVisibleEnd(false);
  }, [setVisibleEnd]);

  const onConfirmEnd = React.useCallback(
    ({ hours, minutes }) => {
      setVisibleEnd(false);
      onChangeTime({ ...value, end: { hours, minutes } });
    },
    [setVisibleEnd, value, onChangeTime],
  );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TimePickerModal
        visible={visibleStart}
        onDismiss={onDismissStart}
        onConfirm={onConfirmStart}
        label="Выберите время" // optional, default 'Select time'
        cancelLabel="Отмена" // optional, default: 'Cancel'
        confirmLabel="Ок" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
      />
      <TimePickerModal
        visible={visibleEnd}
        onDismiss={onDismissEnd}
        onConfirm={onConfirmEnd}
        label="Выберите время" // optional, default 'Select time'
        cancelLabel="Отмена" // optional, default: 'Cancel'
        confirmLabel="Ок" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>С </Text>
        <TouchableOpacity onPress={() => setVisibleStart(true)}>
          <Text style={styles.timeText}>
            {value.start.hours.toString().length > 1
              ? value.start.hours
              : `0${value.start.hours}`}
            :
            {value.start.minutes.toString().length > 1
              ? value.start.minutes
              : `0${value.start.minutes}`}
          </Text>
        </TouchableOpacity>
        <Text style={styles.timeText}> До </Text>
        <TouchableOpacity onPress={() => setVisibleEnd(true)}>
          <Text style={styles.timeText}>
            {value.end.hours.toString().length > 1
              ? value.end.hours
              : `0${value.end.hours}`}
            :
            {value.end.minutes.toString().length > 1
              ? value.end.minutes
              : `0${value.end.minutes}`}
          </Text>
        </TouchableOpacity>
      </View>
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
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 18,
  },
});
