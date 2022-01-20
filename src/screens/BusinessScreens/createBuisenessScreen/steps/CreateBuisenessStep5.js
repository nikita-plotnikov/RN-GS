import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../../../../components/Background';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Logo from '../../../../components/Logo';
import YandexMap from '../../../../components/YandexMap';
import { theme } from '../../../../core/theme';

export default function CreateBuisenessStep5({
  saveAndGoHomePage,
  setStep,
  marker,
  setMarker,
  back,
}) {
  return (
    <>
      <Background>
        {!back && <Logo />}
        <Header>Отметьте бизнес на карте</Header>
        <View style={styles.mapContainer}>
          <YandexMap marker={marker} setMarker={setMarker} />
        </View>
        <Button mode="contained" onPress={() => setStep(6)}>
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
  mapContainer: {
    width: '100%',
    minHeight: 350,
    height: '80%',
  },
});
