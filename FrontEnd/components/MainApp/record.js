import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecordScreen = () => {
  const [travelHistory, setTravelHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }

        const response = await fetch('http://20.244.46.72/api/record', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch travel history');
        }

        const data = await response.json();
        setTravelHistory(data);
      } catch (error) {
        console.error('Error fetching travel history:', error.message);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (travelHistory.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noDataText}>ไม่มีประวัติการเดินทาง</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={travelHistory}
        keyExtractor={(item) => item.travel_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>จาก: {item.from_station_id}</Text>
            <Text style={styles.text}>ถึง: {item.to_station_id}</Text>
            <Text style={styles.text}>ราคา: {item.travel_price} บาท</Text>
            <Text style={styles.text}>วันที่: {new Date(item.traveled_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noDataText: { fontSize: 16, color: '#999' },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  text: { fontSize: 14, color: '#333' },
});

export default RecordScreen;
