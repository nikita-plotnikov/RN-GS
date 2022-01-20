import React, { Fragment } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Logo from '../../../../components/Logo';
import ScrollableBackground from '../../../../components/ScrollableBackground';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../core/theme';

export default function CreateBuisenessStep6({
  attributes,
  addAttribute,
  onChangeAttribute,
  saveAndGoHomePage,
  back,
}) {
  return (
    <>
      <ScrollableBackground>
        {!back && <Logo />}
        <Header>Дополнительно</Header>
        {attributes &&
          attributes.map((attribute, index) => {
            return (
              <View style={styles.inputContainer} key={index}>
                <TextInput
                  label={'Имя'}
                  value={attribute.name}
                  onChangeText={text => onChangeAttribute(index, text, 'name')}
                />
                <TextInput
                  label={'Описание'}
                  value={attribute.value}
                  onChangeText={text => onChangeAttribute(index, text, 'value')}
                />
              </View>
            );
          })}
        <TouchableOpacity onPress={addAttribute}>
          <Text>Добавить</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={saveAndGoHomePage}>
          Сохранить
        </Button>
      </ScrollableBackground>
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
  inputContainer: {
    width: '100%',
  },
});
