import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Clear user session or token here
    navigation.navigate('SignIn'); // Redirect to SignIn screen
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