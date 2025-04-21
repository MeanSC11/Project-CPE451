import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import WelcomeScreen from './components/Sign/WelcomeScreen';
import SignInScreen from './components/Sign/SignInScreen';
import SignUpScreen from './components/Sign/SignUpScreen';
import ForgotPasswordScreen from './components/Sign/ForgotPasswordScreen';
import VerificationScreen from './components/Sign/VerificationScreen';
import NewPasswordScreen from './components/Sign/NewPasswordScreen';

import LanguageScreen from './components/MainApp/LanguageScreen';
import HomeScreen from './components/MainApp/HomeScreen';
import TabBar from './components/MainApp/TabBar';
import RouteSearchScreen from './components/MainApp/RouteSearchScreen';
import MapScreen from './components/MainApp/MapScreen';
import TravelCostScreen from './components/MainApp/TravelCostScreen';
import SettingsScreen from './components/MainApp/setting';
import LogoutScreen from './components/MainApp/logout';
import Profile from './components/MainApp/Profile';
import RecordScreen from './components/MainApp/record';
import CommentScreen from './components/MainApp/comment'; // Import the CommentScreen
import Ticket from './components/MainApp/Ticket'; // Import Ticket.js
import PaymentScreen from './components/MainApp/payment'; // Import PaymentScreen

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🏠 **Home Stack** - Stack Navigator for the home screen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RouteSearch" component={RouteSearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TravelCostScreen" component={TravelCostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// 🏠 **Main App (Tab Navigation)** - Tab Navigator for the main app
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />} // Ensure TabBar is passed correctly
    >
      <Tab.Screen name="หน้าหลัก" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="ตั๋วของคุณ" component={Ticket} options={{ headerShown: false }} />
      <Tab.Screen name="โปรไฟล์" component={ProfileStack} options={{ headerShown: false }} />
      <Tab.Screen name="ตั้งค่า" component={SettingsStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// 🏠 **Profile Stack** - Stack Navigator for the profile screen
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Record" component={RecordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// 🛠️ **Settings Stack** - Stack Navigator for the settings screen
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Comment" component={CommentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// 🌍 **Authentication Stack** - Stack Navigator for authentication screens
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
}

// 🌎 **Root Navigation**
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
