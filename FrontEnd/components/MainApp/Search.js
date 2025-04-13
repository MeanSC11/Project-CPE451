import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const stations = [
  "N1 ราชเทวี", "N2 พญาไทย", "N3 อนุสาวรีย์ชัยสมรภูมิ", "N4 สนามเป้า", "N5 อารีย์", "N6 เสนาร่วม", "N7 สะพานควาย", "N8 หมอชิต", "N9 ห้าเเยกลาดพร้าว", 
  "N10 พหลโยธิน 54", "N11 รัชโยธิน", "N12 เสนานิคม", "N13มหาวิทยาลัยเกษตรศาสตร์", "N14 กรมป่าไม้", "N15 บางบัว", "N16 กรมทหารราบที่ 11", 
  "N17 วัดพระศรีมหาธาตุ", "N18 พหลโยธิน 59", "N19 สายหยุด", "N20 สะพานใหม่", "N21 โรงพยบาลภูมิพลอดุลยเดช", "N22 พิพิธ๓ัณฑ์กองทัพอากาศ", "N23 เเยก คปอ.",
  "N24 คูคต"
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { type, onSelect } = route.params || {}; // ป้องกัน undefined

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stationItem}
            onPress={() => {
              if (onSelect) {
                onSelect(item, type); // ส่งค่ากลับไป map.js
              }
              navigation.goBack(); // กลับไปที่ map.js
            }}
          >
            <Text style={styles.stationText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  stationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  stationText: {
    fontSize: 16,
  },
});

export default SearchScreen;
