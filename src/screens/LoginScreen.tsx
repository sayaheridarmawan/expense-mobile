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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1)); // animasi opacity

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Username dan password harus diisi');
      return;
    }

    // TODO: sambungkan ke API login
    navigation.replace('Dashboard');
  };

  const toggleSecure = () => {
    // animasi fade
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    setSecure((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#1E3A8A', '#6D28D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>Expense Tracker</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Masukkan password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                returnKeyType="done"
              />
              <TouchableOpacity onPress={toggleSecure} style={styles.iconButton}>
                <Animated.View style={{ opacity: fadeAnim }}>
                  <Ionicons
                    name={secure ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#A5B4FC"
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!username || !password) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#3B82F6', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Masuk</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footer}>© 2025 Expense Mobile</Text>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 14,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 26,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    color: '#C7D2FE',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#FFFFFF',
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    padding: 6,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    fontSize: 12,
    color: '#E0E7FF',
  },
});
