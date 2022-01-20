import React from 'react';
// import { StyleSheet } from 'react-native';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
// import { theme } from '../../../../core/theme';

export default function TeamMemberStep1({
  firstName,
  setFirstName,
  secondName,
  setSecondName,
  middleName,
  setMiddleName,
  email,
  setEmail,
  phone,
  setPhone,
  setStep,
}) {
  return (
    <>
      <Background>
        <TextInput
          value={firstName.value}
          error={firstName.error}
          errorText={firstName.error}
          onChangeText={text => setFirstName({ value: text, error: '' })}
          label="Имя"
        />
        <TextInput
          value={secondName.value}
          error={secondName.error}
          errorText={secondName.error}
          onChangeText={text => setSecondName({ value: text, error: '' })}
          label="Фамилия"
        />
        <TextInput
          value={middleName.value}
          error={middleName.error}
          errorText={middleName.error}
          onChangeText={text => setMiddleName({ value: text, error: '' })}
          label="Отчество"
        />
        <TextInput
          value={email.value}
          error={email.error}
          errorText={email.error}
          onChangeText={text => setEmail({ value: text, error: '' })}
          label="Email"
        />
        <TextInput
          value={phone.value}
          error={phone.error}
          errorText={phone.error}
          onChangeText={text => setPhone({ value: text, error: '' })}
          label="Телефон"
        />
        <Button mode="contained" onPress={() => setStep(2)}>
          Далее
        </Button>
      </Background>
    </>
  );
}

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     fontSize: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   timeText: {
//     fontSize: 18,
//   },
//   dateContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     display: 'flex',
//     alignItems: 'center',
//   },
// });
