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
import LanguageScreen from './components/Sign/LanguageScreen';

import HomeScreen from './components/MainApp/HomeScreen';
import TabBar from './components/MainApp/TabBar';
import RouteSearchScreen from './components/MainApp/RouteSearchScreen';

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🏠 **Main App (Tab Navigation)**
function MainApp() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Your Ticket" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Station" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Main Page" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Setting" component={HomeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// 🏠 **Home Stack**
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RouteSearch" component={RouteSearchScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// 🌍 **Authentication Stack**
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
        {/* ถ้ายังไม่ได้ล็อกอิน ให้ไปที่ AuthStack */}
        <Stack.Screen name="Auth" component={AuthStack} />
        
        {/* ถ้าล็อกอินแล้ว ไปที่ MainApp */}
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
