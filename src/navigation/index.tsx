import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DriverInfoScreen} from '../screens/driver';
import {HomeScreen} from '../screens/home';

type RootStackParamList = {
  Home: undefined;
  DriverInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{title: 'Drivers'}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="DriverInfo"
          options={{title: 'Info'}}
          component={DriverInfoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
