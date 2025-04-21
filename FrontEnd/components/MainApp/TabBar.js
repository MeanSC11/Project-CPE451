import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBar = ({ state = {}, descriptors = {}, navigation }) => {
  console.log("TabBar state:", state); // Debugging log
  console.log("TabBar state.routes:", state?.routes); // Debugging log

  // ตรวจสอบว่า state.routes มีค่าหรือไม่
  if (!state || !state.routes || !Array.isArray(state.routes)) {
    console.error("TabBar: 'state.routes' is undefined or invalid");
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          TabBar Error: Invalid state.routes
        </Text>
      </View>
    ); // Render fallback UI
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key] || {};
        const label = options?.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const icons = {
          "หน้าหลัก": "home",
          "ตั๋วของคุณ": "ticket",
          "โปรไฟล์": "user",
          "ตั้งค่า": "cog",
          "Logout": "sign-out",
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (route.name === "หน้าหลัก") {
                navigation.navigate("หน้าหลัก", { screen: "Home" });
              } else {
                navigation.navigate(route.name);
              }
            }}
            style={styles.tabButton}
          >
            <View style={styles.iconWrapper}>
              {isFocused && <View style={styles.activeTab} />}
              <Icon name={icons[route.name]} size={24} color="black" style={styles.icon} />
              <Text style={[styles.label, isFocused && styles.activeLabel]}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#307B58',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTab: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#F8DE7E',
    borderRadius: 25,
    top: -5,
  },
  icon: {
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    color: 'black',
    marginTop: 3,
    fontWeight: 'bold',
    zIndex: 1,
  },
  activeLabel: {
    fontWeight: 'bold',
  },
});

export default TabBar;
