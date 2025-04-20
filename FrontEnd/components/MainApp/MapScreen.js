import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { btsStations } from './BusStation';
import Icon from 'react-native-vector-icons/FontAwesome';

const MapScreen = () => {
  const route = useRoute();
  const { startStation, endStation } = route.params || {}; // รับข้อมูลสถานีต้นทาง, ปลายทาง 
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [endStationVisible, setEndStationVisible] = useState(true); // เพิ่มสถานะสำหรับแสดงหมุดปลายทาง
  const navigation = useNavigation();

  useEffect(() => {
    if (startStation && endStation) {
      console.log('Start Station:', startStation);
      console.log('End Station:', endStation);
      generateRoute(startStation, endStation); // สร้างเส้นทางจากข้อมูลสถานี
    } else {
      Alert.alert("Error", "ข้อมูลสถานีไม่ครบถ้วน");
      console.log("สถานีไม่สมบูรณ์");
    }
  }, [startStation, endStation]);

  // ฟังก์ชันสำหรับสร้างเส้นทางจากข้อมูล busStations ทั้งหมด
  const generateRoute = (start, end) => {
    if (!start || !start.name || !end || !end.name) {
      console.warn("Start หรือ End ยังไม่ถูกเลือก:", { start, end });
      Alert.alert("Error", "กรุณาเลือกสถานีต้นทางและปลายทาง");
      return;
    }
  
    if (!btsStations || btsStations.length === 0) {
      console.warn("btsStations ยังไม่มีข้อมูล");
      Alert.alert("Error", "ไม่สามารถโหลดข้อมูลสถานีได้");
      return;
    }
  
    const normalize = name => name?.trim().toLowerCase();
    const sortedStations = [...btsStations].sort((a, b) => a.order - b.order);
  
    const startIndex = sortedStations.findIndex(
      s => normalize(s.name) === normalize(start.name)
    );
    const endIndex = sortedStations.findIndex(
      s => normalize(s.name) === normalize(end.name)
    );
  
    if (startIndex === -1 || endIndex === -1) {
      console.warn("ไม่พบสถานีต้นทางหรือปลายทางใน busStations", { start, end });
      Alert.alert("Error", "ไม่พบสถานีต้นทางหรือปลายทางในรายการ");
      return;
    }
  
    const selectedStations =
      startIndex <= endIndex
        ? sortedStations.slice(startIndex, endIndex + 1)
        : sortedStations.slice(endIndex, startIndex + 1).reverse();
  
    const coordinates = selectedStations.map(station => ({
      latitude: parseFloat(station.lat),
      longitude: parseFloat(station.lon),
    }));
  
    setRouteCoordinates(coordinates);
  };

  const clearRoute = () => {
    setRouteCoordinates([]);
    setEndStationVisible(false);
    navigation.navigate("RouteSearch", {
      startLocation: {
        latitude: startStation.lat,
        longitude: startStation.lon,
      },
      startStation: null,
      endStation: null, // Clear end station
    });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" marginTop={20} />
        </TouchableOpacity>
      </View>

      {startStation && endStation && (
        <View style={styles.stationBanner}>
          <View style={styles.stationBox}><Text style={styles.stationText}>{startStation.name}</Text></View>
          <FontAwesome name="arrow-right" size={20} color="#337F5B" padding={5} style={styles.arrowIcon} />
          <View style={styles.stationBox}><Text style={styles.stationText}>{endStation.name}</Text></View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearRoute}>
          <Text style={styles.buttonText}>ลบเส้นทางที่ค้นหา</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceRateButton}>
          <Text style={styles.buttonText}>อัตราการบริการ</Text>
        </TouchableOpacity>
      </View>

      <MapView style={styles.map}
        initialRegion={{
          latitude: (startStation && endStation) ? (startStation.lat + endStation.lat) / 2 : 13.7563,
          longitude: (startStation && endStation) ? (startStation.lon + endStation.lon) / 2 : 100.5018,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {startStation && (
          <Marker
          coordinate={{
            latitude: parseFloat(startStation.lat),
            longitude: parseFloat(startStation.lon)
          }}
          title={startStation.name}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="street-view" size={30} color="red" />
            </View>
          </Marker>
        )}

        {endStation && endStationVisible && ( // ตรวจสอบสถานะเพื่อแสดงหมุดปลายทาง
          <Marker
          coordinate={{
            latitude: parseFloat(endStation.lat),
            longitude: parseFloat(endStation.lon)
          }}
          title={endStation.name}
          pinColor="green"
        />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
          coordinates={routeCoordinates}
          strokeWidth={5}
          strokeColor="#008000" // เขียว BTS
          lineCap="round"
          lineJoin="round"
        />        
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    marginTop:20 
  },
  header: { 
    paddingVertical: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    borderRadius: 10 
  },
  stationBanner: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
    marginTop: 10
  },
  stationBox: {
    backgroundColor: '#337F5B',
    padding: 12, 
    borderRadius: 10,
  },
  stationText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute', 
    top: 90, 
    left: 5, 
    right: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 5, 
    zIndex: 1000,
    marginTop: 15,
  },
  clearButton: { 
    backgroundColor: '#ddd', 
    padding: 5, 
    borderRadius: 5 
  },
  serviceRateButton: { 
    backgroundColor: '#FFD97E', 
    padding: 5, 
    borderRadius: 5,
  },
  map: { 
    flex: 1, 
    marginTop: 80 
  },
});

export default MapScreen;
