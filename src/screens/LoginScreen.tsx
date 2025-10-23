import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  Platform,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../config';

type LoginScreenProps = {
  navigation: any;
  setUserToken: (token: string | null) => void;
};

export default function LoginScreen({ navigation, setUserToken }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const toggleSecure = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start();
    setSecure(prev => !prev);
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Email dan password harus diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.access_token) {
        await SecureStore.setItemAsync('userToken', data.access_token);
        setUserToken(data.access_token);
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login gagal', data.message || 'Email atau password salah');
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Tidak bisa terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={isDark ? ['#1F2937', '#111827'] : ['#1E3A8A', '#6D28D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <Text style={[styles.title, { color: isDark ? '#E5E7EB' : '#FFFFFF' }]}>Expense Tracker</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: isDark ? '#9CA3AF' : '#C7D2FE' }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)', color: isDark ? '#F3F4F6' : '#FFFFFF' }]}
              placeholder="Masukkan email"
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={[styles.label, { marginTop: 12, color: isDark ? '#9CA3AF' : '#C7D2FE' }]}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)', color: isDark ? '#F3F4F6' : '#FFFFFF' }]}
                placeholder="Masukkan password"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={toggleSecure} style={styles.iconButton}>
                <Animated.View style={{ opacity: fadeAnim }}>
                  <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={22} color={isDark ? '#9CA3AF' : '#A5B4FC'} />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, (!username || !password) && styles.buttonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <LinearGradient colors={isDark ? ['#4F46E5', '#6D28D9'] : ['#3B82F6', '#8B5CF6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Masuk'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 },
  logo: { width: 90, height: 90, marginBottom: 14, borderRadius: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 26 },
  inputContainer: { width: '100%', marginBottom: 22 },
  label: { fontSize: 13, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingVertical: Platform.OS === 'ios' ? 12 : 8, paddingHorizontal: 14, fontSize: 16 },
  passwordWrapper: { position: 'relative', justifyContent: 'center' },
  inputWithIcon: { paddingRight: 44 },
  iconButton: { position: 'absolute', right: 10, height: '100%', justifyContent: 'center', padding: 6 },
  button: { width: '100%', borderRadius: 10, overflow: 'hidden', marginTop: 6, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  buttonGradient: { paddingVertical: 12, alignItems: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
