import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>การตั้งค่า</Text>

      <TouchableOpacity style={styles.item}>
        <FontAwesome5 name="globe" size={20} color="black" />
        <Text style={styles.text}>Language / เปลี่ยนภาษา</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="moon" size={20} color="black" />
        <Text style={styles.text}>Them / โหมดสี</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <FontAwesome5 name="comment-alt" size={20} color="black" />
        <Text style={styles.text}>Comment / แสดงความคิดเห็น</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="log-out" size={20} color="black" />
        <Text style={styles.text}>Log out / ออกจากระบบ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsScreen;
