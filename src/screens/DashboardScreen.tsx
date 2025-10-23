// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type DashboardScreenProps = {
  navigation: any;
  setUserToken: (token: string | null) => void;
};

export default function DashboardScreen({ navigation, setUserToken }: DashboardScreenProps) {
  const handleLogout = async () => {
    try {
      // Hapus token dari storage
      await SecureStore.deleteItemAsync('userToken');

      // Reset state
      setUserToken(null);

      // Reset navigation agar stack bersih
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Gagal logout, coba lagi');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  button: { backgroundColor: '#3B82F6', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
