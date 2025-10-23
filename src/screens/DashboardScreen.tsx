import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Tambahkan untuk background gradien
import * as SecureStore from 'expo-secure-store';

type DashboardScreenProps = {
  navigation: any;
  setUserToken: (token: string | null) => void;
};

const menus = [
  { id: '1', name: 'Ringkasan', icon: 'pie-chart-outline' },
  { id: '2', name: 'Statistik', icon: 'bar-chart-outline' },
];

export default function DashboardScreen({ navigation, setUserToken }: DashboardScreenProps) {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderMenuItem = ({ item }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => alert(`${item.name} clicked`)}>
      <Ionicons name={item.icon as any} size={32} color="#4F46E5" />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']} // Gradien biru-ungu untuk background menarik
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons name="home-outline" size={28} color="#fff" />
        <Text style={styles.title}>Dashboard</Text>
      </View>
      
      {/* Gambar di tengah yang menggambarkan tema aplikasi expense keluarga */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }} // Gambar keluarga dengan tema pengeluaran (dapat diganti dengan gambar lokal jika diperlukan)
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.imageCaption}>Kelola Pengeluaran Keluarga Anda</Text>
      </View>
      
      <FlatList
        data={menus}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    // Background dihapus karena menggunakan LinearGradient
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginLeft: 10, 
    color: '#fff' // Warna putih untuk kontras dengan gradien
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow untuk Android
  },
  imageCaption: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  menuItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparan untuk efek glassmorphism
    margin: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow untuk Android
  },
  menuText: { 
    marginTop: 8, 
    fontWeight: '600', 
    color: '#1E3A8A' 
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: 'rgba(239, 68, 68, 0.9)', // Semi-transparan
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16,
    marginLeft: 8,
  },
});
