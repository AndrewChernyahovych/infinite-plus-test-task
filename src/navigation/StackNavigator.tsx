import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EditImageScreen from '../screens/EditImageScreen';
import {RootStackParamList} from '../types/NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditImageScreen"
        component={EditImageScreen}
        options={{headerTitle: 'Edit Image', headerBackTitle: 'Go back'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
