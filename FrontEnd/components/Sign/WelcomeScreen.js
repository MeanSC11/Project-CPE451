import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/Pictures/blackground-iphone1413.png')} style={styles.background}>
      <View style={styles.container}>
        {/* ไอคอนเปลี่ยนภาษา */}
        <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')}>
          <Icon name="language" size={24} color="#000" />
        </TouchableOpacity>

        {/* ข้อความ Welcome */}
        <Text style={styles.welcomeText}>WELCOME</Text>

        {/* ปุ่ม SIGN IN */}
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>

        {/* ปุ่ม SIGN UP */}
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('MainApp', { screen: 'หน้าหลัก' })} // Updated to "หน้าหลัก"
        >
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>

        {/* ข้อความ login with Social Media */}
        <Text style={styles.socialLoginText}>login with Social Media</Text>

        {/* ไอคอน Social Media */}
        <View style={styles.socialIcons}>
          <Icon name="apple" size={30} color="black" style={styles.socialIcon} />
          <Icon name="google" size={30} color="black" style={styles.socialIcon} />
          <Icon name="facebook" size={30} color="black" style={styles.socialIcon} />
        </View>
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
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 180,
  },
  signInButton: {
    backgroundColor: '#FFF', 
    padding: 15, 
    margin: 10, 
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#337F5B' ,
    width: '80%',
    alignItems: 'center',
    marginTop: 259,
  },
  signInText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#337F5B', 
    padding: 15, 
    margin: 10, 
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#fdd835', 
    padding: 15, 
    margin: 10, 
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  startText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#000',
  },
  signUpText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  socialLoginText: {
    marginTop: 35,
    fontSize: 16,
    color: '#000',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 15,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
});

export default WelcomeScreen;
