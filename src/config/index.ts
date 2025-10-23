import { Platform } from 'react-native';

export const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://192.168.1.9:8000' // Ganti dengan IP PC kamu
    : 'http://localhost:8000';  // iOS Simulator
