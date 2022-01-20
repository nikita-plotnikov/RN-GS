import React from 'react';
// import { StyleSheet } from 'react-native';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
// import { theme } from '../../../../core/theme';

export default function TeamMemberStep2({
  status,
  setStatus,
  business,
  setBusiness,
  role,
  setRole,
  saveMember,
}) {
  return (
    <>
      <Background>
        <TextInput
          value={status.value}
          error={status.error}
          errorText={status.error}
          onChangeText={text => setStatus({ value: text, error: '' })}
          label="Статус"
        />
        <TextInput
          value={business.value}
          error={business.error}
          errorText={business.error}
          onChangeText={text => setBusiness({ value: text, error: '' })}
          label="Направление бизнеса"
        />
        <TextInput
          value={role.value}
          error={role.error}
          errorText={role.error}
          onChangeText={text => setRole({ value: text, error: '' })}
          label="Роль в бизнесе"
        />
        <Button mode="contained" onPress={() => saveMember()}>
          Сохранить
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
