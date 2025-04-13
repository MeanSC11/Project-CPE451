import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/authService'; // Import login service

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Email and password cannot be empty');
      return;
    }

    setLoading(true); // Show loading spinner
    try {
      console.log(`Attempting login with email: ${email.trim()}`);
      const response = await login(email.trim(), password);
      await AsyncStorage.setItem('userToken', response.data.token); // Save token
      Alert.alert('Success', 'Signed in successfully');
      navigation.navigate('MainApp', { screen: 'Main Page' }); // Navigate to Main Page tab
    } catch (error) {
      console.error("Sign In Error:", error.response?.data || error.message);
      let errorMessage = 'Sign In Failed';
      if (error.message.includes('502')) {
        errorMessage = 'Server is currently unavailable. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <ImageBackground source={require('../../assets/Pictures/blackground-iphone1413.png')} style={styles.background}>
      <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}> {/* Disable interaction when loading */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fdd835" />
          </View>
        )}
        <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')}>
          <Icon name="language" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>START YOUR WAY</Text>

        <TextInput
        style={styles.inputEmail}
        placeholder="Username or Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
        />
        <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        />


        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkForgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.LinkSignUp}>Don't have an account? <Text style={styles.linkHighlight}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: 'center',  
  },
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  languageIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  backButton: { 
    position: 'absolute', 
    top: 50, 
    left: 20,
  },
  backText: { 
    fontSize: 24, 
    color: '#000',
  },
  title: { 
    fontSize: 50, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#fff',
    marginTop: 180,
    textAlign: 'center',
  },
  inputEmail: { 
    width: '80%', 
    padding: 12, 
    marginVertical:10, 
    borderBottomWidth: 1, 
    borderColor: '#000',
    color: '#000',
    marginTop: 180,
  },
  inputPassword: { 
    width: '80%', 
    padding: 12, 
    marginVertical:10, 
    borderBottomWidth: 1, 
    borderRadius: 8,
    borderColor: '#000',
    color: '#000',
  },
  button: { 
    backgroundColor: '#fdd835', 
    padding: 15, 
    margin: 10, 
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 75,
  },
  buttonText: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#000',

  },
  linkForgot: { 
    color: '#000', 
    fontSize: 16, 
    marginTop: 10,
  },
  LinkSignUp: { 
    color: '#000', 
    fontSize: 16, 
    marginTop: 10,
  },
  linkHighlight: {
    fontSize: 16, 
    color: '#2E7D32', // สีเขียว
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default SignInScreen;
