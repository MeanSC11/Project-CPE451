import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const TravelCostScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>ผลการค้นหาเส้นทาง</Text>

        {/* Route Info */}
        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <Text style={styles.label}>จาก</Text>
            <Text style={styles.station}>บางบัว</Text>
            <View style={styles.tagContainer}>
              <Text style={styles.btsTag}>BTS</Text>
              <Text style={styles.btsNumber}>N 12</Text>
            </View>
          </View>
          <View style={styles.routeItem}>
            <Text style={styles.label}>ถึง</Text>
            <Text style={styles.station}>เสนานิคม</Text>
            <View style={styles.tagContainer}>
              <Text style={styles.btsTag}>BTS</Text>
              <Text style={styles.btsNumber}>N 11</Text>
            </View>
          </View>
        </View>

        {/* Travel Info */}
        <Text style={styles.sectionTitle}>ข้อมูลการเดินทาง</Text>
        <View style={styles.infoContainer}>
          <View style={[styles.infoBox, { backgroundColor: '#2E7D32' }]}>
            <Ionicons name="cash-outline" size={24} color="white" />
            <Text style={styles.infoValue}>15</Text>
            <Text style={styles.infoText}>บาท</Text>
          </View>
          <View style={[styles.infoBox, { backgroundColor: '#66BB6A' }]}>
            <Ionicons name="train-outline" size={24} color="white" />
            <Text style={styles.infoValue}>1</Text>
            <Text style={styles.infoText}>สถานี</Text>
          </View>
        </View>

        {/* Train Info */}
        <Text style={styles.sectionTitle}>ขบวนรถไฟฟ้า</Text>
        <View style={styles.trainContainer}>
          <Ionicons name="subway-outline" size={24} color="black" />
          <Text style={styles.trainText}>123-456-78</Text>
          <Text style={styles.trainText}>สถานี สายสุด</Text>
          <Text style={styles.trainTime}>2 minute</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: width * 0.05, paddingBottom: height * 0.1 }, // เพิ่ม paddingBottom ให้มีพื้นที่สำหรับ Tabbar
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
  routeItem: { alignItems: 'center' },
  label: { fontSize: width * 0.04, color: 'gray' },
  station: { fontSize: width * 0.045, fontWeight: 'bold' },
  tagContainer: {
    flexDirection: 'row',
    marginTop: height * 0.005,
  },
  btsTag: {
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingHorizontal: width * 0.02,
    borderRadius: 5,
    marginRight: width * 0.01,
  },
  btsNumber: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: width * 0.02,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
  infoBox: {
    flex: 1,
    padding: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  infoText: { fontSize: width * 0.04, color: 'white' },
  infoValue: { fontSize: width * 0.06, fontWeight: 'bold', color: 'white' },
  trainContainer: {
    padding: height * 0.02,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
  trainText: { fontSize: width * 0.04, fontWeight: 'bold' },
  trainTime: { fontSize: width * 0.05, fontWeight: 'bold', color: '#2E7D32' },
});

export default TravelCostScreen; // Corrected export statement
