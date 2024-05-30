import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ImageLibraryOptions, MediaType, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhotoLibraryIcon from '../assets/icons/PhotoLibraryIcon';
import { HomeScreenNavigationProp } from '../types/NavigationTypes';

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({navigation}: Props): React.JSX.Element  => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  console.log(selectedImage);

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo" as MediaType,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        navigation.navigate('EditImageScreen', {imageUri: imageUri})
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={openImagePicker}>
        <Text style={styles.btnText}>Choose the photo</Text>
        <PhotoLibraryIcon width={35} height={35} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
