import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { btsStations } from './BusStation';

// คำนวณระยะทางระหว่าง 2 จุด (Haversine Formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RouteSearchScreen = () => {
  const navigation = useNavigation();
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [filteredStations, setFilteredStations] = useState(btsStations); // Default to all stations
  const [region, setRegion] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [marker, setMarker] = useState(null);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const route = useRoute();
  const { startLocation } = route.params || {};

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.startLocation) {
        findNearestStation(route.params.startLocation.latitude, route.params.startLocation.longitude, 'start');
      }

      if (route.params?.startStation) {
        setStartStation(route.params.startStation);
      } else if (route.params?.startLocation) {
        findNearestStation(route.params.startLocation.latitude, route.params.startLocation.longitude, 'start');
      }

      if (route.params?.endStation === null) {
        setEndStation(null);
      } else if (route.params?.endStation) {
        setEndStation(route.params.endStation);
      }
    }, [route.params])
  );

  useEffect(() => {
    if (startLocation) {
      findNearestStation(startLocation.latitude, startLocation.longitude, 'start');
    }
  }, [startLocation]);

  const findNearestStation = (lat, lon, type) => {
    const nearestStation = btsStations
      .map((station) => ({
        ...station,
        distance: getDistance(lat, lon, station.lat, station.lon),
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    if (type === 'start') {
      setStartStation(nearestStation);
      setStartText(nearestStation.name);
    } else {
      setEndStation(nearestStation);
      setEndText(nearestStation.name);
    }
  };

  const handleSearch = async (text, type) => {
    if (!text.trim()) { // Check if the input is empty or contains only whitespace
      setFilteredStations(btsStations); // Reset to all stations if input is empty
      return;
    }

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${text}&format=json`);
      const data = await res.json();

      if (data.length === 0) {
        // Perform approximate matching for station names
        const filtered = btsStations.filter((station) => {
          const searchWords = text.toLowerCase().split(' ');
          const stationName = station.name.toLowerCase();
          const stationEnglish = station.english.toLowerCase();

          return searchWords.every(
            (word) => stationName.includes(word) || stationEnglish.includes(word)
          );
        });

        if (filtered.length > 0) {
          // Show only the nearest station from the filtered list
          const nearestStation = filtered
            .map((station) => ({
              ...station,
              distance: getDistance(region.latitude, region.longitude, station.lat, station.lon),
            }))
            .sort((a, b) => a.distance - b.distance)[0];

          setFilteredStations(nearestStation ? [nearestStation] : btsStations);
        } else {
          setFilteredStations(btsStations); // Reset to all stations if no matches
        }
        return;
      }

      const { lat, lon, display_name } = data[0];
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      setRegion({
        ...region,
        latitude,
        longitude,
      });

      setMarker({ latitude, longitude, title: display_name });

      // Find only the nearest station
      const nearestStation = btsStations
        .map((station) => ({
          ...station,
          distance: getDistance(latitude, longitude, station.lat, station.lon),
        }))
        .sort((a, b) => a.distance - b.distance)[0];

      setFilteredStations(nearestStation ? [nearestStation] : []);
      setIsSelectingStart(type === 'start');
    } catch (err) {
      Alert.alert('เกิดข้อผิดพลาดในการค้นหา');
    }
  };

  const selectStation = (station) => {
    if (isSelectingStart) {
      setStartStation(station);
      setStartText(station.name);
    } else {
      setEndStation(station);
      setEndText(station.name);
    }
    setFilteredStations(btsStations); // Reset to all stations after selection
  };

  const onPress = () => {
    if (startStation && endStation) {
      navigation.navigate('Map', { startStation, endStation }); // Pass startStation and endStation
    } else {
      Alert.alert('กรุณากรอกสถานีต้นทางและปลายทาง');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ค้นหาเส้นทาง</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="พิมพ์สถานที่ต้นทาง..."
        placeholderTextColor="#666"
        value={startText}
        onChangeText={(text) => {
          setStartText(text);
          handleSearch(text, 'start');
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="พิมพ์สถานที่ปลายทาง..."
        placeholderTextColor="#666"
        value={endText}
        onChangeText={(text) => {
          setEndText(text);
          handleSearch(text, 'end');
        }}
      />

      <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <Text style={styles.buttonText}>ค้นหาเส้นทาง</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stationItem}
            onPress={() => selectStation(item)}
          >
            <View style={styles.stationIcon}>
              <Text style={styles.stationText}>{item.id}</Text>
            </View>
            <View>
              <Text style={styles.stationName}>{item.name}</Text>
              <Text style={styles.stationEnglish}>{item.english}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff', 
    padding: 40 
  },
  header: { 
    backgroundColor: '#ffffff', 
    paddingVertical: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingLeft: 0,
    borderRadius: 10 
  },
  headerTitle: { 
    color: 'black', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  input: { 
    backgroundColor: '#fff', 
    padding: 12, 
    fontSize: 18, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    marginTop: 15 
  },
  
  searchButton: { 
    marginTop: 20, 
    borderRadius: 10, 
    overflow: 'hidden',
    backgroundColor: '#337F5B',
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stationIcon: {
    backgroundColor: '#7ED957',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  stationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stationEnglish: {
    fontSize: 14,
    color: '#777',
  },
});

export default RouteSearchScreen;