import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const CommentScreen = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const today = new Date().toISOString().split('T')[0]; // เวลาในรูปแบบ ISO

    try {
      const response = await fetch("http://172.20.10.21:5000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          createdAt: today,
          userId: 1, // Replace with the actual user ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("สำเร็จ", "ส่งความคิดเห็นเรียบร้อยแล้ว!");
        setComment("");
      } else {
        Alert.alert("ผิดพลาด", data.error || "เกิดข้อผิดพลาดบางอย่าง");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("ผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ข้อความ</Text>

      <TextInput
        style={styles.textInput}
        placeholder="กรุณาพิมพ์ความคิดเห็นของคุณ"
        placeholderTextColor="#999"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity
        style={[styles.submitButton, comment ? styles.submitEnabled : styles.submitDisabled]}
        disabled={!comment}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>ส่งความคิดเห็น</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ddd",
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
  },
  submitEnabled: {
    backgroundColor: "#a5d6a7",
  },
  submitDisabled: {
    backgroundColor: "#c8e6c9",
  },
  submitText: {
    color: "black",
    fontSize: 16,
  },
});

export default CommentScreen;