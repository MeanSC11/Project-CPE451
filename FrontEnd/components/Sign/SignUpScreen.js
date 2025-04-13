import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { register } from '../../services/authService'; // Import register service

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSignUp = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true); // Show loading spinner
    try {
      await register(fullName.trim(), email.trim(), phone.trim(), password);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error("Sign Up Error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Sign Up Failed';
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
        <Text style={styles.title}>CREATE YOUR ACCOUNT</Text>
        <TextInput style={styles.inputFullName} placeholder="Full Name" placeholderTextColor="#000" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#000" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#000" value={phone} onChangeText={setPhone} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#000" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#000" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.LinkSignIn}>Have an account? <Text style={styles.linkHighlight}>Sign in</Text></Text>
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
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
  inputFullName: { 
    width: '80%', 
    padding: 7, 
    marginVertical: 10, 
    borderBottomWidth: 1, 
    borderRadius: 8,
    borderColor: '#000',
    color: '#000',
    marginTop: 100,
  },
  input: { 
    width: '80%', 
    padding: 7, 
    marginVertical: 10, 
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
    marginTop:53,
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#000',
  },
  LinkSignIn: { 
    color: '#000', 
    fontSize: 16, 
    marginTop: 10,
  },
  linkHighlight: {
    fontSize: 16, 
    color: '#2E7D32', // สีเขียว
  },
});

export default SignUpScreen;
