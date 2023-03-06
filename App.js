import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Homepage from "./screens/Homepage";
import AddFoodScreen from "./screens/AddFoodScreen";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "carbonkarma-9e1bd.firebaseapp.com",
  projectId: "carbonkarma-9e1bd",
  storageBucket: "carbonkarma-9e1bd.appspot.com",
  messagingSenderId: "306167145331",
  appId: "1:306167145331:web:1ba576eab82885ea685b06",
  measurementId: "G-D39PGL6X6F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen // options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="AddFood" component={AddFoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

