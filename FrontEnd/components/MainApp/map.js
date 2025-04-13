import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal } from "react-native";
import ImageZoomViewer from 'react-native-image-zoom-viewer'; 
import TabbarScreen from "./TabBar.js"; // ไฟล์ที่สร้างไว้

const MapScreen = () => {
  const navigation = useNavigation();
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const handleSelectStation = (station, type) => {
    if (type === "start") {
      setStartStation(station);
    } else {
      setEndStation(station);
    }
  };

  const openImageZoomModal = () => setImageModalVisible(true);
  const closeImageZoomModal = () => setImageModalVisible(false);

return (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => navigation.navigate("Search", { type: "start", onSelect: handleSelectStation })}
      >
        <View style={styles.row}>
          <Image source={require("./assets/train_icon.png")} style={styles.icon} />
          <Text style={startStation ? styles.selectedText : styles.placeholderText}>
            {startStation || "  สถานีต้นทาง"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => navigation.navigate("Search", { type: "end", onSelect: handleSelectStation })}
      >
        <View style={styles.row}>
          <Image source={require("./assets/train_icon1.png")} style={styles.icon} />
          <Text style={endStation ? styles.selectedText : styles.placeholderText}>
            {endStation || "  สถานีปลายทาง"}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.clearButton} onPress={() => {
          setStartStation(null);
          setEndStation(null);
        }}>
          <Text style={styles.clearText}>ลบเส้นทางการค้นหา</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.serviceButton} 
          onPress={() => navigation.navigate("math")}
        >
          <Text style={styles.serviceText}>อัตราการบริการ</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={openImageZoomModal}>
        <Image
          source={require("./assets/train_map.png")}
          style={styles.mapImage}
        />
      </TouchableOpacity>

      {isImageModalVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isImageModalVisible}
          onRequestClose={closeImageZoomModal}
        >
          <View style={styles.modalContainer}>
            <ImageZoomViewer
              imageUrls={[{ url: require("./assets/train_map.png") }]}
              enableImageZoom={true}
              onClick={closeImageZoomModal}
            />
          </View>
        </Modal>
      )}
    </ScrollView>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  clearButton: {
    backgroundColor: "#a9a9a9",
    padding: 12,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  clearText: {
    color: "#000000",
    fontSize: 16,
  },
  serviceButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  serviceText: {
    color: "#fff",
    fontSize: 16,
  },
  mapImage: {
    width: "100%",
    height: 600,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default MapScreen;
