// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SplashScreen from '../screens/SplashScreen';

export type AppNavigatorProps = {
  setUserToken: (token: string | null) => void;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ setUserToken }: AppNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} setUserToken={setUserToken} />}
      </Stack.Screen>
      <Stack.Screen name="Dashboard">
        {props => <DashboardScreen {...props} setUserToken={setUserToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
