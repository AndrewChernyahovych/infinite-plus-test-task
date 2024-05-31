import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  EditImageScreenNavigationProp,
  EditImageScreenRouteProp,
} from '../types/NavigationTypes';
import {SketchCanvas} from '@sourcetoad/react-native-sketch-canvas';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Slider from '@react-native-community/slider';

const colors = [
  'white',
  'yellow',
  'orange',
  'red',
  'blue',
  'purple',
  'green',
  'black',
];
interface Props {
  navigation: EditImageScreenNavigationProp;
  route: EditImageScreenRouteProp;
}

const EditImageScreen = ({route, navigation}: Props): React.JSX.Element => {
  const imageUri = route.params.imageUri;
  const [scale, setScale] = useState(1);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [color, setColor] = useState('red');
  const [isResizeSliderVisible, setIsResizeSliderVisible] = useState(false);
  const [isResizeStrokeSliderVisible, setIsResizeStrokeSliderVisible] =
    useState(false);
  const canvasRef = useRef<SketchCanvas>(null);
  const viewShotRef = useRef<ViewShot>(null);

  const onSave = async () => {
    Alert.alert('Save image', 'Are you sure you want to finish drawning?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Save', onPress: () => saveImage()},
    ]);

    const saveImage = async () => {
      try {
        const uri = await captureRef(viewShotRef, {
          format: 'png',
          quality: 1,
        });
        navigation.navigate('HomeScreen', {editedImgUri: uri});
      } catch (error) {
        console.error('Failed to save image', error);
      }
    };
  };

  const onResize = () => {
    if (isResizeStrokeSliderVisible) {
      setIsResizeStrokeSliderVisible(false);
    }
    setIsResizeSliderVisible(current => !current);
  };

  const onResizeStrokeWidth = () => {
    if (isResizeSliderVisible) {
      setIsResizeSliderVisible(false);
    }
    setIsResizeStrokeSliderVisible(current => !current);
  };

  const onUndo = () => {
    canvasRef.current?.undo();
  };

  const onClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <View style={{flex: 1}}>
      <ViewShot ref={viewShotRef} style={styles.container}>
        <Image source={{uri: imageUri}} style={styles.image} />
        <SketchCanvas
          ref={canvasRef}
          style={[styles.canvasContainer, {transform: [{scale: scale}]}]}
          strokeColor={color}
          strokeWidth={strokeWidth}
        />
      </ViewShot>
      <View style={styles.topButtonsContainer}>
        <View style={styles.colorsContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorButton, {backgroundColor: color}]}
              onPress={() => setColor(color)}
            />
          ))}
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onSave}>
            <Text style={styles.actionButtonTitle}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onUndo}>
            <Text style={styles.actionButtonTitle}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.resizeStrokeBtn,
              isResizeStrokeSliderVisible && {backgroundColor: '#1fb28a'},
            ]}
            onPress={onResizeStrokeWidth}>
            <View
              style={{
                backgroundColor: color,
                height: strokeWidth,
                width: strokeWidth,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onClear}>
            <Text style={styles.actionButtonTitle}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isResizeSliderVisible && {backgroundColor: '#1fb28a'},
            ]}
            onPress={onResize}>
            <Text style={styles.actionButtonTitle}>Resize</Text>
          </TouchableOpacity>
        </View>
        {isResizeSliderVisible && (
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={5}
            step={0.1}
            value={scale}
            onValueChange={setScale}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
          />
        )}
        {isResizeStrokeSliderVisible && (
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={15}
            step={1}
            value={strokeWidth}
            onValueChange={setStrokeWidth}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
          />
        )}
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
  topButtonsContainer: {
    position: 'absolute',
    top: 10,
    gap: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 10,
    backgroundColor: 'grey',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButtonTitle: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    bottom: 50,
  },
  colorsContainer: {
    flexDirection: 'row',
    // gap: 15,
    justifyContent: 'space-between',
  },
  colorButton: {
    padding: 16,
    borderRadius: 100,
  },
  resizeStrokeBtn: {
    borderRadius: 100,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
  },
  slider: {
    width: '100%',
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
});
