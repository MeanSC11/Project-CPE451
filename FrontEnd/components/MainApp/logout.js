import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Clear user session or token
      await AsyncStorage.removeItem('token');
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }], // Navigate to WelcomeScreen
      });
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to log out?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#f44336', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default LogoutScreen;