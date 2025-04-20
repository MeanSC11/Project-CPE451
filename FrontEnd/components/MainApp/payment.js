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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [slipImage, setSlipImage] = useState(null);
  const [slipFile, setSlipFile] = useState(null);
  const [slipData, setSlipData] = useState(null);
  const amount = route.params?.amount || 15;
  const referenceNumber = route.params?.referenceNumber || "DEFAULT_REF";
  const startStation = route.params?.startStation || "สถานีต้นทาง";
  const endStation = route.params?.endStation || "สถานีปลายทาง";

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("กรุณาอนุญาตเข้าถึงคลังภาพ");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSlipImage(asset.uri);
      setSlipFile({
        uri: asset.uri,
        name: "slip.jpg",
        type: "image/jpeg",
      });
    }
  };

  const uploadSlipAndVerify = async () => {
    if (!slipFile) {
      Alert.alert("กรุณาอัปโหลดสลิปก่อน");
      return;
    }

    const formData = new FormData();
    formData.append("files", slipFile);
    formData.append("referenceNumber", referenceNumber);

    try {
      const response = await fetch("http://172.20.10.21:5000/slipok", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSlipData(data);
        Alert.alert("สำเร็จ", "อัปโหลดสลิปเรียบร้อย", [
          {
            text: "ไปยังตั๋ว",
            onPress: () =>
              navigation.navigate("Ticket", {
                startStation,
                endStation,
              }),
          },
        ]);
      } else {
        Alert.alert("ผิดพลาด", "การอัปโหลดล้มเหลว");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/payment.jpg")} style={styles.icon} />

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
  },
  amountContainer: {
    marginTop: 5  ,
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',      // Center the content horizontally
  },
  amountText: {
    fontSize: 25,  // ปรับขนาดฟอนต์ที่นี่
    fontWeight: 'bold',  // หากต้องการให้ตัวหนังสือหนา
    color: '#2d6a4f',  // ปรับสีตามต้องการ
  },
  slipImage: {
    width: 400,
    height: 450,
    marginTop: 20,
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
