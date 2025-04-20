import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Alert } from "react-native";
import TabBar from "./TabBar"; // Replaced BottomNavBar with TabBar
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const TravelCostScreen = () => {
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await fetch("http://20.244.46.72/api/record", { // Ensure the endpoint is correct
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setTravelData(data);
      } catch (error) {
        console.error("Error fetching travel data:", error.message || error);
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTravelData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>
        <TabBar /> {/* Updated to use TabBar */}
      </View>
    );
  }

  if (!travelData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>ไม่สามารถโหลดข้อมูลได้</Text>
        <TabBar /> {/* Updated to use TabBar */}
      </View>
    );
  }

  const { travelHistory } = travelData || {};
  const { fromStation, toStation, travel_price } = travelHistory || {};

  if (!fromStation || !toStation || !travel_price) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>ข้อมูลการเดินทางไม่ครบถ้วน</Text>
        <TabBar /> {/* Updated to use TabBar */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.sectionPadding, styles.headerRow]}>
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text style={styles.header}>คำนวณค่าเดินทาง</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={[styles.subHeader, styles.sectionPadding]}>ผลการค้นหาเส้นทาง</Text>

        <View style={[styles.routeContainer, styles.sectionPadding]}>
          <View style={styles.routeItem}>
            <Text style={styles.label}>จาก</Text>
            <Text style={styles.station}>{fromStation?.station_name}</Text>
            <Text style={styles.btsTag}>BTS {fromStation?.station_id}</Text>
          </View>
          <View style={styles.routeItem}>
            <Text style={styles.label}>ถึง</Text>
            <Text style={styles.station}>{toStation?.station_name}</Text>
            <Text style={styles.btsTag}>BTS {toStation?.station_id}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.sectionPadding]}>ข้อมูลการเดินทาง</Text>
        <View style={[styles.infoContainer, styles.sectionPadding]}>
          <View style={[styles.infoBox, { backgroundColor: "#2E7D32" }]}>
            <MaterialCommunityIcons name="cash-multiple" size={24} color="white" />
            <Text style={styles.infoValue}>{travel_price}</Text>
            <Text style={styles.infoText}>บาท</Text>
          </View>
          <View style={[styles.infoBox, { backgroundColor: "#AED581" }]}>
            <FontAwesome5 name="subway" size={24} color="black" />
            <Text style={[styles.infoValue, { color: "black" }]}>
              {Math.abs(fromStation?.station_position - toStation?.station_position)}
            </Text>
            <Text style={[styles.infoText, { color: "black" }]}>สถานี</Text>
          </View>
        </View>
      </ScrollView>

      <TabBar /> {/* Updated to use TabBar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionPadding: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    marginVertical: 10,
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
});

export default TravelCostScreen;
