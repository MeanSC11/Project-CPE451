import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const VerificationScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/Pictures/blackground-iphone1413.png')} style={styles.background}>
      <View style={styles.container}>
      {/* ไอคอนเปลี่ยนภาษา */}
      <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')}>
        <Icon name="language" size={24} color="#000" />
      </TouchableOpacity>
      {/* ปุ่มย้อนกลับ */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* ส่วนเนื้อหา */}
      
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.label}>Enter Verification Code</Text>
        <Text style={styles.Resend}>If you didn't receive a code, <Text style={styles.linkHighlight}>Resend</Text></Text>

        {/* กล่องใส่รหัส 4 หลัก */}
        <View style={styles.codeContainer}>
          <TextInput style={styles.codeInput} keyboardType="numeric" maxLength={1} />
          <TextInput style={styles.codeInput} keyboardType="numeric" maxLength={1} />
          <TextInput style={styles.codeInput} keyboardType="numeric" maxLength={1} />
          <TextInput style={styles.codeInput} keyboardType="numeric" maxLength={1} />
        </View>

        {/* ลิงก์กลับไปที่ Sign In */}
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.LinkSignIn}>
              Back to <Text style={styles.linkHighlight}>Sign in</Text>
            </Text>
          </TouchableOpacity>

        {/* ปุ่ม SEND */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewPassword')}>
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
  label: {
    width: '80%', 
    textAlign: 'center',
    fontSize: 20,
    marginVertical:10, 
    color: '#000',
    marginTop: 180,
  },
  Resend: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical:10, 
    color: '#000',
  },
  codeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginVertical: 20,
  },
  codeInput: { 
    width: 50, 
    height: 50, 
    borderBottomWidth: 2, 
    borderBottomColor: '#000',
    textAlign: 'center', 
    fontSize: 20, 
    marginHorizontal: 10, 
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

export default VerificationScreen;
