import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Pictures/blackground-iphone1413.png')} style={styles.background}>
      <View style={styles.container}>
        {/* ไอคอนเปลี่ยนภาษา */}
        <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')}>
          <Icon name="language" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>START YOUR WAY</Text>
        <TextInput style={styles.inputEmail} placeholder="Username or Email" placeholderTextColor="#000" />
        <TextInput style={styles.inputPassword} placeholder="Password" placeholderTextColor="#000" secureTextEntry />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkForgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => alert('Sign In')}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.LinkSignUp}>
            Don't have an account? <Text style={styles.linkHighlight}>Sign Up</Text>
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
});

export default SignInScreen;
