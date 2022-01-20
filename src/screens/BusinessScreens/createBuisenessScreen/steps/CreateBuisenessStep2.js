import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Logo from '../../../../components/Logo';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../core/theme';

export default function CreateBuisenessStep2({
  description,
  setDescription,
  services,
  setServices,
  setStep,
  date,
  setDate,
  saveAndGoHomePage,
  back,
}) {
  const [open, setOpen] = React.useState(false);
  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );
  const month = +date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  return (
    <>
      <Background>
        {!back && <Logo />}
        <Header>Информация о бизнесе</Header>
        <TextInput
          value={description.value}
          error={description.error}
          errorText={description.error}
          onChangeText={text => setDescription({ value: text, error: '' })}
          label="Описание"
          multiline
        />
        <TextInput
          value={services.value}
          error={services.error}
          errorText={services.error}
          onChangeText={text => setServices({ value: text, error: '' })}
          label="Услуги"
          multiline
        />
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Дата основания</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={styles.timeText}>
              {day.toString().length > 1 ? day : `0${day}`}.
              {month.toString().length > 1 ? month : `0${month}`}.{year}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePickerModal
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          saveLabel="Сохранить" // optional
          label="Выберите дату" // optional
          animationType="fade" // optional, default is 'slide' on ios/android and 'none' on web
        />
        <Button mode="contained" onPress={() => setStep(3)}>
          Далее
        </Button>
        {!back && (
          <TouchableOpacity onPress={saveAndGoHomePage} style={styles.row}>
            <Text style={styles.link}>Пропустить</Text>
          </TouchableOpacity>
        )}
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 18,
  },
  dateContainer: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
});
