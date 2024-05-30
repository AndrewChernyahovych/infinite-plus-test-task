import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EditImageScreenRouteProp} from '../types/NavigationTypes';
import {SketchCanvas} from '@sourcetoad/react-native-sketch-canvas';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import ViewShot, {captureRef} from 'react-native-view-shot';

interface Props {
  route: EditImageScreenRouteProp;
}

const EditImageScreen = ({route}: Props): React.JSX.Element => {
  const imageUri = route.params.imageUri;
  const [scale, setScale] = useState(1);
  const scaleAnimated = useSharedValue(1);
  const canvasRef = useRef(null);

  const saveImage = async () => {
    try {
      const uri = await captureRef(canvasRef, {
        format: 'png',
        quality: 1,
      });
      console.log('Image saved to', uri);
    } catch (error) {
      console.error('Failed to save image', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ViewShot ref={canvasRef} style={styles.container}>
        <Image source={{uri: imageUri}} style={styles.image} />
        <SketchCanvas
          style={[styles.canvasContainer, {transform: [{scale: scale}]}]}
          strokeColor={'#FF0000'}
          strokeWidth={4}
        />
      </ViewShot>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={saveImage} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setScale(current => current + 0.1);
          }}
          style={styles.saveButton}>
          <Text style={styles.buttonText}>Increase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setScale(current => current - 0.1);
          }}
          style={styles.saveButton}>
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    bottom: 50,
  },
});
