import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // รอ 2 วิ แล้วเปลี่ยนไปหน้า WelcomeScreen
    const timer = setTimeout(() => {
      navigation.replace("WelcomeScreen");
    }, 2000);

    return () => clearTimeout(timer); // ล้าง timeout เมื่อ component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("../../assets/Pictures/back.png")} style={styles.backgroundImage} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/Pictures/logo_skytrain.png")} style={styles.logo} />
      </View>

      {/* Text */}
      <Text style={styles.text}>Welcome to Our App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#337F5B",
  },
  backgroundImage: {
    position: "absolute",
    width: "200%",
    height: "200%",
    resizeMode: "cover",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Welcome;
