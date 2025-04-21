import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import { btsStations } from "./BusStation";

const { width, height } = Dimensions.get("window");

const TravelCostScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { startStation, endStation } = route.params || {};

  if (!startStation || !endStation) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>ข้อมูลสถานีต้นทางหรือปลายทางไม่ครบถ้วน</Text>
      </View>
    );
  }

  // คำนวณระยะทางและค่าเดินทาง
  const fromStation = btsStations.find(station => station.id === startStation.id);
  const toStation = btsStations.find(station => station.id === endStation.id);
  const stationDiff = Math.abs(fromStation?.position - toStation?.position || 0);
  const travelPrice = stationDiff * 15; // คำนวณค่าเดินทาง (15 บาทต่อสถานี)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.sectionPadding, styles.headerRow]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { marginTop: 35 }]}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>คำนวณค่าเดินทาง</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={[styles.subHeader, styles.sectionPadding]}>ผลการค้นหาเส้นทาง</Text>

        <View style={[styles.routeContainer, styles.sectionPadding]}>
          <View style={styles.routeItem}>
            <Text style={styles.label}>จาก</Text>
            <Text style={styles.station}>{fromStation?.name || "ไม่พบข้อมูลสถานีต้นทาง"}</Text>
            <Text style={styles.btsTag}>BTS N{fromStation?.position}</Text>
          </View>
          <View style={styles.routeItem}>
            <Text style={styles.label}>ถึง</Text>
            <Text style={styles.station}>{toStation?.name || "ไม่พบข้อมูลสถานีปลายทาง"}</Text>
            <Text style={styles.btsTag}>BTS N{toStation?.position}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.sectionPadding]}>ข้อมูลการเดินทาง</Text>
        <View style={[styles.infoContainer, styles.sectionPadding]}>
          <View style={[styles.infoBox, { backgroundColor: "#2E7D32" }]}>
            <MaterialCommunityIcons name="cash-multiple" size={24} color="white" />
            <Text style={styles.infoValue}>{travelPrice}</Text>
            <Text style={styles.infoText}>บาท</Text>
          </View>
          <View style={[styles.infoBox, { backgroundColor: "#AED581" }]}>
            <FontAwesome5 name="subway" size={24} color="black" />
            <Text style={[styles.infoValue, { color: "black" }]}>{stationDiff}</Text>
            <Text style={[styles.infoText, { color: "black" }]}>สถานี</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.sectionPadding]}>ขบวนรถไฟฟ้า</Text>
        <View style={[styles.trainBox, styles.sectionPadding]}>
          <MaterialCommunityIcons name="train" size={28} color="black" style={{ marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text>Train {startStation.id}</Text>
            <Text>ปลายทาง: {toStation?.name}</Text>
          </View>
          <Text style={styles.timeText}>{stationDiff} นาที</Text>
        </View>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() =>
            navigation.navigate('Payment', {
              amount: travelPrice, // ส่งค่าเดินทาง
              startStation: fromStation?.name, // ส่งชื่อสถานีต้นทาง
              endStation: toStation?.name, // ส่งชื่อสถานีปลายทาง
            })
          }
        >
          <Text style={styles.paymentText}>ชำระเงิน</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  sectionPadding: {
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  subHeader: {
    fontSize: 16,
  },
  routeContainer: {
    marginVertical: 10,
  },
  routeItem: {
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  station: {
    fontSize: 16,
    fontWeight: "normal",
  },
  btsTag: {
    fontSize: 12,
    color: "#999",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBox: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  infoValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 12,
    color: "#333",
  },
  trainBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    paddingBottom: 60,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  paymentButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelCostScreen;
