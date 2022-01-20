import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar, Divider, Subheading } from 'react-native-paper';
import Button from './Button';
import { theme } from '../core/theme';

export default function PhotoUploader({ size, photo, setPhoto, ...props }) {
  const [visible, setVisible] = React.useState(false);
  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleCreatePhoto = () => {
    setVisible(!visible);
    setTimeout(() => {
      launchCamera(
        { noData: true, maxWidth: 300, maxHeight: 300 },
        response => {
          if (response.didCancel) {
            return;
          }
          if (response) {
            setPhoto(response.assets[0]);
          }
        },
      );
    }, 300);
  };

  const handleChoosePhoto = () => {
    setVisible(!visible);
    setTimeout(() => {
      launchImageLibrary(
        { noData: true, maxWidth: 300, maxHeight: 300 },
        response => {
          if (response.didCancel) {
            return;
          }
          if (response) {
            setPhoto(response.assets[0]);
          }
        },
      );
    }, 300);
  };

  const handleDeletePhoto = () => {
    setVisible(!visible);
    setPhoto(null);
  };

  return (
    <>
      {photo ? (
        <TouchableOpacity onPress={toggleModal}>
          <Avatar.Image source={{ uri: photo.uri }} size={size ? size : 140} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleModal}>
          <Avatar.Icon size={140} icon="camera-image" />
        </TouchableOpacity>
      )}
      <Modal
        isVisible={visible}
        backdropOpacity={0.5}
        style={styles.modal}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        animationOutTiming={500}
        backdropTransitionOutTiming={0}>
        <View style={styles.dialog}>
          <Subheading style={styles.dialogTitle}>Изображение</Subheading>
          <Divider />
          <Divider />
          <Divider />
          <Button onPress={handleChoosePhoto} style={styles.actionButton}>
            Выбрать фото
          </Button>
          <Divider />
          <Divider />
          <Divider />
          <Button
            onPress={handleCreatePhoto}
            style={[styles.actionButton, styles.buttonBottom]}>
            Сделать фото
          </Button>
          {photo && (
            <>
              <Divider />
              <Divider />
              <Divider />
              <Button onPress={handleDeletePhoto} style={styles.actionButton}>
                Удалить фото
              </Button>
            </>
          )}
        </View>
        <View style={styles.dialog}>
          <Button
            onPress={toggleModal}
            style={[styles.actionButton, styles.buttonCancel]}>
            Отмена
          </Button>
        </View>
      </Modal>
    </>
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
  modal: {
    width: '100%',
    marginHorizontal: 0,
    marginVertical: 0,
    position: 'absolute',
    bottom: 0,
  },
  dialog: {
    width: '98%',
    marginHorizontal: 4.5,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 13,
  },
  dialogTitle: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 13,
    fontWeight: 'bold',
  },
  dialogContent: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  dialogActions: {
    flexDirection: 'column',
  },
  actionButton: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  buttonCancel: {
    borderRadius: 13,
  },
});
