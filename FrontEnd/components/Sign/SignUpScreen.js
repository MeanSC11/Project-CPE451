import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Pictures/blackground-iphone1413.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')}>
          <Icon name="language" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>CREATE YOUR ACCOUNT</Text>
        <TextInput style={styles.inputFullName} placeholder="Full Name" placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#000" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#000" secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={() => alert('Sign Up')}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.LinkSignIn}>
              Have an account? <Text style={styles.linkHighlight}>Sign in</Text>
            </Text>
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
