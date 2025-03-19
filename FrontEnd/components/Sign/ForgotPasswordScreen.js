import React from 'react';
import {   View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Pictures/blackground-iphone1413.png')} style={styles.background}>
      {/* ส่วนหัว */}
      <View style={styles.container}>
          <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')} >
            <Icon name="language" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Forgot{"\n"}Password</Text>

        {/* ส่วนเนื้อหา */}
          <Text style={styles.label}>Enter Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Example@gmail.com" 
            placeholderTextColor="#777"
            keyboardType="email-address" 
          />
          {/* ลิงก์กลับไปที่ Sign In */}
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.LinkSignIn}>
              Back to <Text style={styles.linkHighlight}>Sign in</Text>
            </Text>
          </TouchableOpacity>

          {/* ปุ่ม SEND */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verification')}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableOpacity>

          {/* ลิงก์ไปหน้า Sign Up */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.LinkSignUp}>
            Don’t have account? <Text style={styles.linkHighlight}>Sign Up</Text>
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
  backButton: {
    position: 'absolute', 
    top: 40, 
    left: 20,
  },
  languageIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  backText: { 
    fontSize: 24, 
    color: '#000', 
    marginTop: 10,
  },
  title: { 
    fontSize: 50, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#fff',
    marginTop: 180,
    textAlign: 'center',
  },
  label: { 
    width: '80%', 
    padding: 12, 
    fontSize: 20,
    color: '#000',
    marginTop: 180,
    marginRight: 30,
  },
  input: { 
    width: '80%', 
    padding: 12, 
    borderBottomWidth: 1, 
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
    marginTop: 70,
  },
  buttonText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000',
  },
  LinkSignIn: { 
    fontSize: 16, 
    color: '#000', 
    marginTop: 30,
  },
  linkHighlight: {
    color: '#2E7D32', // สีเขียว
  },
  LinkSignUp: {
    fontSize: 16, 
    color: '#000',
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
