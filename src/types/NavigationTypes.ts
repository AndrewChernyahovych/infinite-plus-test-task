import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: {editedImgUri: string | undefined};
  EditImageScreen: {imageUri: string | undefined};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  Pick<RootStackParamList, 'EditImageScreen'>,
  'EditImageScreen'
>;

export type HomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'HomeScreen'
>;

export type EditImageScreenNavigationProp = StackNavigationProp<
  Pick<RootStackParamList, 'HomeScreen'>,
  'HomeScreen'
>;

export type EditImageScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditImageScreen'
>;
