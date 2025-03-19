import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const NewPasswordScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Pictures/blackground-iphone1413.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.languageIcon} onPress={() => navigation.navigate('Language')}>
                <Icon name="language" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

      
          <Text style={styles.title}>New Password</Text>

          <Text style={styles.Create}>Create New Password</Text>

          <TextInput 
            style={styles.inputNew} 
           placeholder="Enter New Password" 
            placeholderTextColor="#666" 
            secureTextEntry 
          />

          <Text style={styles.Confrim}>Confrim Password</Text>

          <TextInput 
            style={styles.inputCon} 
            placeholder="Confirm New Password" 
            placeholderTextColor="#666" 
            secureTextEntry 
          />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>SEND</Text>
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
  Create: { 
    fontSize: 20, 
    color: '#000',
    marginTop: 180,
    textAlign: 'left',
    marginRight: 140,
  },
  Confrim: { 
    fontSize: 20, 
    color: '#000',
    textAlign: 'left',
    marginRight: 170,
  },
  inputNew: { 
    width: '80%', 
    padding: 12, 
    marginVertical:10, 
    borderBottomWidth: 1, 
    borderColor: '#000',
    color: '#000',
  },
  inputCon: { 
    width: '80%', 
    padding: 12, 
    marginVertical:10, 
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
    marginTop: 90,
  },
  buttonText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000',
  },
});

export default NewPasswordScreen;
