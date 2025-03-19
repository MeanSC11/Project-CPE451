import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const icons = {
          "ตั๋วของคุณ": "ticket",
          "สถานี": "map-marker",
          "หน้าหลัก": "home",
          "โปรไฟล์": "user",
          "ตั้งค่า": "cog",
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
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
