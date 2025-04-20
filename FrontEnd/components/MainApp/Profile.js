import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    nickname: '',
    phone: '',
    email: '',
  });
  const [editField, setEditField] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://20.244.46.72/api/auth/user', {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
          },
        });
        const { name, phone, email } = response.data;
        setUserData((prev) => ({
          ...prev,
          name,
          phone,
          email,
        }));
      } catch (error) {
        if (error.response?.status === 404) {
          console.error('Error fetching user data: Endpoint not found (404)');
          Alert.alert('Error', 'User data endpoint not found. Please contact support.');
        } else {
          console.error('Error fetching user data:', error.message || error);
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'เลือกวิธีการถ่ายภาพ',
      '',
      [
        { text: 'ถ่ายรูปจากกล้อง 📷', onPress: takePhoto },
        { text: 'เลือกรูปจากคลังภาพ 🖼️', onPress: pickImage },
        { text: 'ยกเลิก', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const renderInputField = (field, label, editable = true) => (
    <View style={styles.inputContainer}>
      {editField === field && editable ? (
        <TextInput
          style={styles.input}
          value={userData[field]}
          onChangeText={(text) => setUserData({ ...userData, [field]: text })}
          onBlur={() => setEditField(null)}
          autoFocus
        />
      ) : (
        <Text style={styles.text}>{userData[field] || label}</Text>
      )}
      {editable && <IconButton icon="pencil" size={20} onPress={() => setEditField(field)} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showImagePickerOptions} style={styles.imageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/Pictures/default-avatar.png')}
          style={styles.profileImage}
        />
        <IconButton icon="camera" size={24} style={styles.cameraIcon} />
      </TouchableOpacity>
      {renderInputField('name', 'ชื่อ - นามสกุล', false)}
      {renderInputField('nickname', 'ชื่อเล่น')}
      {renderInputField('phone', 'หมายเลขโทรศัพท์', false)}
      {renderInputField('email', 'อีเมล', false)}

      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('Record')}>
        <Text style={styles.historyText}>ประวัติการเดินทาง</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfeee0',
    width: '90%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  text: { flex: 1, fontSize: 16, color: '#333' },
  input: { flex: 1, fontSize: 16, color: '#000', backgroundColor: '#fff', borderRadius: 5, padding: 5 },
  historyButton: { backgroundColor: '#4CAF50', width: '90%', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  historyText: { color: 'white', fontSize: 16 },
});

export default Profile;
