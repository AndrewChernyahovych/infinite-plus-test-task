import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EditImageScreenRouteProp} from '../types/NavigationTypes';

interface Props {
  route: EditImageScreenRouteProp;
}

const EditImageScreen = ({route}: Props): React.JSX.Element => {
  const imageUri = route.params.imageUri;

  return (
    <View style={{flex: 1}}>
      <Image source={{uri: imageUri}} style={styles.image} />
    </View>
  );
};

export default EditImageScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
