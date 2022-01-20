import React, { useState } from 'react';
import { GET_USER } from '../apollo/queries/getMeQuery';
import { useQuery } from '@apollo/react-hooks';
import AppBackground from '../components/AppBackground';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import jsonData from '../constants/storiesJson';
import StoriesCarousel from '../components/StoriesCarousel';

const userBusienesses = [
  {
    id: '1',
    name: 'Gain Systems',
  },
  {
    id: '2',
    name: 'IT Premium',
  },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [stroriesData, setStoriesData] = useState(jsonData);

  const { data, loading } = useQuery(GET_USER);
  // const loading = false;
  const closeModal = () => {
    setModalVisible(false);
  };

  const goForStories = () => {
    setModalVisible(true);
  };

  const onChangeSearch = query => setSearchQuery(query);

  const selectBusiness = id => {
    console.log('ID business', id);
    console.log('USER', data.getMe.user);
  };

  return (
    <>
      {loading ? (
        <AppBackground isLoading={true}>
          <ActivityIndicator size="large" />
        </AppBackground>
      ) : (
        <AppBackground
          navigation={navigation}
          title={'Главная'}
          userBusienesses={userBusienesses}
          selectBusiness={selectBusiness}>
          <Searchbar
            placeholder="Поиск"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchInput}
          />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.storiesBlock}>
            {jsonData.stories.map((stories, index) => {
              return (
                <TouchableNativeFeedback key={index} onPress={goForStories}>
                  <View style={styles.scrollContent}>
                    <View style={styles.border}>
                      <ImageBackground
                        source={stories.image}
                        resizeMode="cover"
                        style={styles.image}>
                        <Text style={styles.scrollTextView}>
                          {stories.name}
                        </Text>
                      </ImageBackground>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </ScrollView>
          <Modal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={modalVisible}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
            style={styles.carousel}
            animationOutTiming={500}
            backdropTransitionOutTiming={0}>
            <View style={styles.carousel}>
              <StoriesCarousel closeModal={closeModal} jsonData={jsonData} />
            </View>
          </Modal>
        </AppBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 10,
  },
  storiesBlock: {
    paddingVertical: 10,
  },
  scrollContent: {
    justifyContent: 'space-evenly',
    width: 125,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  scrollImageView: {
    marginHorizontal: 5,
    borderColor: '#808080',
    borderWidth: 2,
    marginTop: 7,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  scrollTextView: {
    color: 'white',
    // fontSize: 42,
    // lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    fontSize: 12,
  },
  carousel: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: 105,
    height: 105,
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
