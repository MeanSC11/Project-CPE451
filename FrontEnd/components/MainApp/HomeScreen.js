import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [showAdModal, setShowAdModal] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // ขออนุญาตตำแหน่ง
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "กรุณาอนุญาตให้แอปเข้าถึงตำแหน่งของคุณ");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // ติดตามตำแหน่ง
  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Error", "กรุณาอนุญาตให้แอปเข้าถึงตำแหน่งของคุณ");
        return;
      }
      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
      return () => locationSubscription.remove();
    };

    requestLocation();
  }, []);

  const handleClose = () => setShowAdModal(false);
  const handleDontShowAgain = () => {
    setDontShowAgain(true);
    setShowAdModal(false);
  };

  const openAdLink = () => {
    Linking.openURL("https://www.spu.ac.th/"); // 🔗 เปลี่ยนลิงก์ที่นี่
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* ✅ Modal โฆษณา */}
      <Modal visible={showAdModal && !dontShowAgain} transparent animationType="fade">
  <View style={styles.overlay}>
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
        <Icon name="close" size={25} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={openAdLink} style={{ flex: 1, width: '100%' }} activeOpacity={0.9}>
        <Image
          source={require('../../assets/Pictures/promotion.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.hideBtn} onPress={handleDontShowAgain}>
        <Text style={styles.hideText}>ไม่ต้องแสดงหน้านี้อีก</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


      {/* รูปเฮดเดอร์ */}
      <Image source={require('../../assets/Pictures/train.jpg')} style={styles.headerImage} />
      <Image source={require('../../assets/Pictures/logo_skytrain.png')} style={styles.logo} />

      {/* ค้นหา */}
      <View style={styles.searchContainer}>
        <Text style={styles.title}>ยินดีต้อนรับสู่ Sky Train</Text>
        {location && (
          <TouchableOpacity onPress={() => navigation.navigate('RouteSearch', { startLocation: location })}>
            <View style={styles.inputGroup}>
              <Icon name="location-arrow" size={20} color="#307B58" />
              <Text style={styles.input}>คุณจะไปที่ไหน?</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* แผนที่ */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 13.7563,
          longitude: currentLocation ? currentLocation.longitude : 100.5018,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
      >
        {currentLocation && (
          <Marker coordinate={currentLocation}>
            <Icon name="street-view" size={30} color="red" />
          </Marker>
        )}
      </MapView>

      <View style={styles.extraSpace} />

      {/* ติดต่อเรา */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>ติดต่อเรา: skytrain.support@email.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  scrollContent: { 
    paddingBottom: 100 
  },
  headerImage: { 
    width: '100%', 
    height: 350, 
    resizeMode: 'cover' 
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    elevation: 5,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: { 
    flex: 1, 
    marginLeft: 10 
  },
  map: { 
    height: height * 0.75, 
    width: '100%', 
    overflow: 'hidden' 
  },
  extraSpace: { 
    height: 200 
  },
  contactContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginTop: 10,
  },
  contactText: { 
    fontSize: 14, 
    color: '#333' 
  },

  // ✅ Modal
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    borderRadius: 20,
  },
  hideBtn: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#ffffffcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  hideText: {
    color: '#333',
    fontSize: 16,
  },
});

export default HomeScreen;