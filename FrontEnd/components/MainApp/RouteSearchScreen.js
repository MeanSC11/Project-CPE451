import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const btsStations = [
  { id: 'N1', name: 'ราชเทวี', english: 'Ratchathewi' },
  { id: 'N2', name: 'พญาไท', english: 'Phaya Thai' },
  { id: 'N3', name: 'อนุสาวรีย์ชัยสมรภูมิ', english: 'Victory Monument' },
  { id: 'N4', name: 'สนามเป้า', english: 'Sanam Pao' },
  { id: 'N5', name: 'อารีย์', english: 'Ari' },
  { id: 'N6', name: 'เสนาร่วม', english: 'Sena Ruam' },
  { id: 'N7', name: 'สะพานควาย', english: 'Saphan Khwai' },
  { id: 'N8', name: 'หมอชิต', english: 'Mo Chit' },
  { id: 'N9', name: 'ห้าแยกลาดพร้าว', english: 'Ha Yaek Lat Phrao' },
  { id: 'N10', name: 'พหลโยธิน 54', english: 'Phahon Yothin 54' },
  { id: 'N11', name: 'รัชโยธิน', english: 'Ratchayothin' },
  { id: 'N12', name: 'เสนานิคม', english: 'Sena Nikhom' },
];

const RouteSearchScreen = () => {
  const navigation = useNavigation();
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);

  const selectStation = (station) => {
    if (!startStation) {
      setStartStation(station);
      setStartText(station.name);
    } else if (!endStation) {
      setEndStation(station);
      setEndText(station.name);
    } else {
      setStartStation(station);
      setStartText(station.name);
      setEndStation(null);
      setEndText('');
    }
  };

  const handleSearchRoute = () => {
    alert(`ค้นหาเส้นทางจาก ${startText} ไป ${endText}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ค้นหาเส้นทาง</Text>
      </View>

      <View style={styles.routeSelector}>
        <TextInput style={styles.input} placeholder="จาก" value={startText} onChangeText={setStartText} />
        <View style={styles.line} />
        <TextInput style={styles.input} placeholder="ปลายทาง" value={endText} onChangeText={setEndText} />
      </View>

      <View style={styles.greenLineContainer}>
        <Text style={styles.greenLineLabel}>🚆 สายสีเขียวสุขุมวิท</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchRoute}>
          <Text style={styles.searchButtonText}>ค้นหาเส้นทาง</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={btsStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.stationItem} onPress={() => selectStation(item)}>
            <View style={styles.stationLabel}>
              <Text style={styles.stationBadge}>BTS</Text>
              <Text style={styles.stationId}>{item.id}</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  routeSelector: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  greenLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  greenLineLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  searchButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  stationLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  stationBadge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 5,
  },
  stationId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stationEnglish: {
    fontSize: 14,
    color: '#666',
  },
});

export default RouteSearchScreen;
