import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Language / ภาษา</Text>
      <TouchableOpacity
        style={styles.langButton}
        onPress={() => {
          // Set language to Thai
          console.log('Language set to Thai');
          navigation.goBack();
        }}
      >
        <Text style={styles.langText}>ภาษาไทย</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.langButton}
        onPress={() => {
          // Set language to English
          console.log('Language set to English');
          navigation.goBack();
        }}
      >
        <Text style={styles.langText}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  backButton: { 
    position: 'absolute', 
    top: 50, 
    left: 20 },
  backText: { 
    fontSize: 24 
  },
  langButton: { 
    padding: 15, 
    margin: 10, 
    borderWidth: 1, 
    borderRadius: 5 
  },
  langText: { 
    fontSize: 18 
  }
});

export default LanguageScreen;