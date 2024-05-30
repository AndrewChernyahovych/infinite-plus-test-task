import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  EditImageScreen: {imageUri: string | undefined};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export type EditImageScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditImageScreen'
>;
