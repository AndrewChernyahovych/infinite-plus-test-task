import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import PhotoLibraryIcon from '../assets/icons/PhotoLibraryIcon';
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from '../types/NavigationTypes';
import {EditedImage} from '../types/EditedImage';
import getCurrentDate from '../helpers/getCurrentDate';

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen = ({navigation, route}: Props): React.JSX.Element => {
  const newEditedImageUri = route.params?.editedImgUri;

  const [recentlyEditedImages, setRecentlyEditedImages] = useState<
    EditedImage[]
  >([]);

  useEffect(() => {
    if (newEditedImageUri) {
      const date = getCurrentDate();

      setRecentlyEditedImages(current => [
        {imageUri: newEditedImageUri, creationDate: date},
        ...current,
      ]);

      Alert.alert(
        'Info',
        `Edited image has been successfully saved to your phone! The path to it: \n ${newEditedImageUri}`,
      );
    }
  }, [newEditedImageUri]);

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        navigation.navigate('EditImageScreen', {imageUri: imageUri});
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recentlyEditedImagesContainer}>
        <Text style={styles.recentlyEditedImagesTitle}>
          Recently edited images
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 10}}>
          {recentlyEditedImages.length > 0 ? (
            recentlyEditedImages.map((image, index) => (
              <View key={index} style={{width: 150, height: 150}}>
                <Image
                  source={{uri: image.imageUri}}
                  style={{width: '100%', height: '100%'}}
                />
                <Text
                  style={styles.recentlyEditedImageDate}>
                  {image.creationDate}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{color: '#fff'}}>No images yet</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={openImagePicker}>
          <Text style={styles.btnText}>Choose the photo</Text>
          <PhotoLibraryIcon width={35} height={35} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    position: 'absolute',
    top: Dimensions.get('screen').height / 2,
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
  recentlyEditedImagesContainer: {
    gap: 10,
    padding: 16,
    backgroundColor: 'grey',
    borderRadius: 15,
  },
  recentlyEditedImagesTitle: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 24,
  },
  recentlyEditedImageDate: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 12,
    color: '#000',
  },

});
