import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("./../assets/Pictures/back.png")} style={styles.backgroundImage} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/Pictures/logo_skytrain.png")} style={styles.logo} />
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: "200%",
    height: "200%",
    marginBottom: 0, // Align bottom
    resizeMode: "cover", // Cover the screen
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
  button: {
    backgroundColor: "#FFD54F",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    position: "absolute",
    bottom: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Welcome;
