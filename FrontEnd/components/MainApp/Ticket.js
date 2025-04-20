import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Ticket = () => {
  const route = useRoute();
  const { startStation, endStation } = route.params || {};

  const [pin, setPin] = useState('');
  const [qrData, setQrData] = useState('');

  const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();
  const generateQRData = () => uuidv4();

  useEffect(() => {
    setPin(generatePin());
    setQrData(generateQRData());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your PIN Code is</Text>

      <View style={styles.pinBox}>
        <Text style={styles.pin}>{pin}</Text>
      </View>

      <View style={styles.qrContainer}>
        {qrData && <QRCode value={qrData} size={300} />}
      </View>

      {/* Route Info */}
      <View style={styles.routeContainer}>
        <View style={styles.routeItem}>
          <Text style={styles.label}>จาก</Text>
          <View style={styles.inputBox}>
            <Text style={styles.selectedText}>{startStation || "สถานีต้นทาง"}</Text>
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <Ionicons name="arrow-forward" size={25} color="black" />
        </View>

        <View style={styles.routeItem}>
          <Text style={styles.label}>ถึง</Text>
          <View style={styles.inputBox}>
            <Text style={styles.selectedText}>{endStation || "สถานีปลายทาง"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
    alignItems: 'center',
  },
  header: { 
    fontSize: 30, 
    marginBottom: 10, 
    alignSelf: 'center',
    marginTop: 20,
  },
  pinBox: { 
    padding: 15, 
    backgroundColor: '#eee', 
    borderRadius: 10, 
    marginBottom: 20 
  },
  pin: { 
    fontSize: 30, 
    letterSpacing: 10 
  },
  qrContainer: { 
    marginBottom: 30 
  },
  routeContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  routeItem: { 
    alignItems: 'center' 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 5 
  },
  inputBox: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 10 
  },
  selectedText: { 
    fontSize: 16, 
    color: 'black' 
  },
  arrowContainer: { 
    marginHorizontal: 10 
  },
});

export default Ticket;
