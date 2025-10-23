// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Storage } from '../utils/storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await Storage.getItem<boolean>('isLoggedIn');
      if (loggedIn) {
        navigation.replace('Dashboard');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    if (username && password) {
      // Simulate login logic
      await Storage.setItem('isLoggedIn', true);
      await Storage.setItem('user', { username, password });
      setIsLoggedIn(true);
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Error', 'Please enter username and password');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, width: '100%', marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, width: '100%', marginBottom: 10, padding: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
