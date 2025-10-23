// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Storage } from '../utils/storage';

type DashboardNavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardNavProp;
};

export default function DashboardScreen({ navigation }: Props) {
  const handleLogout = async () => {
    await Storage.removeItem('isLoggedIn');
    await Storage.removeItem('user');
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
