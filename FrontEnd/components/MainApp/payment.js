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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [slipImage, setSlipImage] = useState(null);

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

  const uploadSlipAndVerify = () => {
    if (!slipImage) {
      Alert.alert("กรุณาอัปโหลดสลิปก่อน");
      return;
    }

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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/Pictures/QRcode.jpg")} style={styles.icon} />

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{amount} บาท</Text>
      </View>

      {slipImage && <Image source={{ uri: slipImage }} style={styles.slipImage} />}

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
});

export default PaymentScreen;
