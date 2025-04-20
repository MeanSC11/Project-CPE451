import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecordScreen() {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    fetch('http://172.20.10.21:5000/api/record') // Updated endpoint
      .then((res) => res.json())
      .then((data) => {
        const grouped = groupByDate(data);
        setTicketData(grouped);
      })
      .catch((err) => {
        console.error('Error fetching travel history:', err);
      });
  }, []);

  const groupByDate = (data) => {
    const groups = {};

    data.forEach((item) => {
      const dateKey = formatDate(new Date(item.travelDate));
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push({
        startStation: item.startStation,
        endStation: item.endStation,
        time: item.travelTime,
      });
    });

    return Object.keys(groups).map((date) => ({
      date,
      records: groups[date],
    }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }); // เช่น 20 เม.ย. 2568
  };

  const renderRecord = ({ item }) => (
    <View style={styles.recordCard}>
      <View style={styles.routeRow}>
        <View style={styles.routeItem}>
          <Text style={styles.label}>ต้นทาง</Text>
          <Text style={styles.station}>{item.startStation}</Text>
        </View>

        <Ionicons name="arrow-forward" size={24} color="#4CAF50" />

        <View style={[styles.routeItem, styles.endStation]}>
          <Text style={styles.label}>ปลายทาง</Text>
          <Text style={styles.station}>{item.endStation}</Text>
        </View>
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {ticketData.map((section, index) => (
        <View key={index}>
          <Text style={styles.date}>{section.date}</Text>
          <FlatList
            data={section.records}
            renderItem={renderRecord}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E7F5C',
    marginBottom: 8,
    marginTop: 16,
  },
  recordCard: {
    backgroundColor: '#D9F2E5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeItem: {
    flex: 1,
  },
  endStation: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    color: '#6E7F80',
  },
  station: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E7F5C',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  time: {
    fontSize: 12,
    color: '#6E7F80',
  },
});
