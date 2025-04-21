import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../services/authService"; // Ensure correct import

const CommentScreen = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      console.log("Fetching comments with token:", token); // Debug log
      const response = await fetch(`${API_URL.replace('/auth', '')}/comment`, { // Ensure correct endpoint
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText); // Log the error response from the API
        throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Comments fetched:", data); // Debug log
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async () => {
    const today = new Date().toISOString().split('T')[0];
    const travelId = 1; // Replace with the actual travelId (e.g., from props or state)

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      console.log("Submitting comment:", comment); // Debug log
      const response = await fetch(`${API_URL.replace('/auth', '')}/comment`, { // Ensure correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment,
          travelId, // Include travelId in the request body
          createdAt: today,
        }),
      });

      if (response.ok) {
        Alert.alert("สำเร็จ", "ส่งความคิดเห็นเรียบร้อยแล้ว!");
        setComment("");
        fetchComments();
      } else {
        const errorText = await response.text();
        console.error("API Error Response:", errorText); // Log the error response from the API
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error.message);
      Alert.alert("ผิดพลาด", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { marginTop: 35 }]}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

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

      <FlatList
        data={comments}
        keyExtractor={(item) => item.comment_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentUser}>{item.user_name}</Text>
            <Text style={styles.commentContent}>{item.content}</Text>
            <Text style={styles.commentDate}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
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
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 5,
    padding: 10,
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
  commentItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginTop: 20,
  },
  commentUser: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentContent: {
    fontSize: 14,
    marginVertical: 5,
  },
  commentDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default CommentScreen;