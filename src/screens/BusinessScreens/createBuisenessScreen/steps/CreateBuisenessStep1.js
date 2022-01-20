import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Logo from '../../../../components/Logo';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../core/theme';
import DropDown from '../../../../components/DropDown';
import PhotoUploader from '../../../../components/PhotoUploader';

export default function CreateBuisenessStep1({
  navigation,
  name,
  setName,
  type,
  typeError,
  changeType,
  typeList,
  photo,
  setPhoto,
  goToSecondStep,
  back,
}) {
  return (
    <>
      <Background>
        {!back && <Logo />}
        <Header>Бизнес</Header>
        <PhotoUploader photo={photo} setPhoto={setPhoto} />
        <DropDown
          label={'Тип бизнеса'}
          value={type.value}
          setValue={item => changeType(item)}
          list={typeList}
          errorText={typeError}
          inputProps={{
            error: typeError,
          }}
        />
        <TextInput
          value={name.value}
          error={name.error}
          errorText={name.error}
          onChangeText={text => setName({ value: text, error: '' })}
          label="Название"
        />
        <Button mode="contained" onPress={goToSecondStep}>
          Далее
        </Button>
        {!back && (
          <TouchableOpacity
            onPress={() => navigation.replace('AppBottom')}
            style={styles.row}>
            <Text style={styles.link}>Настроить позже</Text>
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
});
