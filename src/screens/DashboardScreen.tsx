// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type DashboardNavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardNavProp;
};

export default function DashboardScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard Screen</Text>
    </View>
  );
}
