// payment.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../services/authService"; // Ensure API_URL is correctly imported

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [slipImage, setSlipImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slipData, setSlipData] = useState(null); // Add state for slipData

  const amount = route.params?.amount || 15;
  const startStation = route.params?.startStation || "สถานีต้นทาง";
  const endStation = route.params?.endStation || "สถานีปลายทาง";

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("การอนุญาตถูกปฏิเสธ", "กรุณาอนุญาตให้แอปเข้าถึงคลังภาพ");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setSlipImage(asset.uri);
      } else {
        console.log("การเลือกภาพถูกยกเลิก");
      }
    } catch (error) {
      console.error("Error picking image:", error.message);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถเลือกภาพได้");
    }
  };

  const uploadSlipAndVerify = async () => {
    if (!slipImage) {
      Alert.alert("กรุณาอัปโหลดสลิปก่อน");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const formData = new FormData();
      formData.append("files", {
        uri: slipImage,
        name: "slip.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(`${API_URL.replace("/auth", "")}/slip`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful:", data);
        setSlipData(data); // Save slipData to state
        Alert.alert("สำเร็จ", "ชำระเงินสำเร็จ", [
          {
            text: "ไปที่ตั๋วของคุณ",
            onPress: () =>
              navigation.navigate("ตั๋วของคุณ", {
                startStation,
                endStation,
              }),
          },
        ]);
      } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        Alert.alert("ผิดพลาด", "การอัปโหลดล้มเหลว");
      }
    } catch (error) {
      console.error("Upload error:", error.message);
      Alert.alert("เกิดข้อผิดพลาด", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0077b6" />
          <Text style={styles.loadingText}>กำลังตรวจสอบ...</Text>
        </View>
      </Modal>

      <Image source={require("../../assets/Pictures/QRcode.jpg")} style={styles.icon} />

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{amount} บาท</Text>
      </View>

      {slipImage && <Image source={{ uri: slipImage }} style={styles.slipImage} />}

      {slipData && (
        <View style={styles.slipInfo}>
          <Text style={styles.headerText}>🚈 SKY TRAIN</Text>
          <Text>👤 ความสำเร็จ: {slipData?.success ? "True" : "False"}</Text>
          <Text>👤 ข้อความ: {slipData?.data?.message}</Text>
          <Text>👤 ชื่อผู้โอน: {slipData?.data?.sender?.displayName}</Text>
          <Text>👤 ชื่อผู้รับ: {slipData?.data?.receiver?.displayName}</Text>
          <Text>💰 จำนวนเงิน: {slipData?.data?.amount} บาท</Text>

          {slipData?.data?.qrCodeImage && (
            <>
              <Text style={{ marginTop: 10 }}>QR Code:</Text>
              <Image
                source={{ uri: slipData.data.qrCodeImage }}
                style={styles.qrImage}
              />
            </>
          )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>เลือกสลิป</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={uploadSlipAndVerify} style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>ตรวจสอบสลิป</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
    alignItems: "center",
  },
  icon: {
    width: 350,
    height: 500,
    marginBottom: 20,
    marginTop: 50,
  },
  amountContainer: {
    marginTop: 5,
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2d6a4f",
  },
  slipImage: {
    width: 400,
    height: 450,
    marginTop: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#2d6a4f",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  backButtonText: {
    color: "#2d6a4f",
    fontSize: 16,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  slipInfo: {
    marginTop: 30,
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 8,
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2980b9",
  },
  qrImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default PaymentScreen;
