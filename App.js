import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Homepage from "./screens/Homepage";
import AddFoodScreen from "./screens/AddFoodScreen";
import AddTransportationScreen from "./screens/AddTransportationScreen";
import BottomNav from "./components/BottomNav";
import SettingsScreen from "./screens/SettingsScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AddEnergyScreen from "./screens/AddEnergyScreen";
import FirstCity from "./screens/FirstCity";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  {/* For knowing what screen we're on: */}
  const [screen, setScreen] = useState("");
  //{(navigationRef.current != null && navigationRef.current.getCurrentRoute().name != "Register") && <BottomNav/>}
  //{console.log(navigationRef.current != null && navigationRef.current.getCurrentRoute().name)}
  return (
    <NavigationContainer 
    onStateChange={(state) => setScreen(state.routes[state.index].name)}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="AddFood" component={AddFoodScreen} />
        <Stack.Screen name="AddTransportation" component={AddTransportationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="AddEnergy" component={AddEnergyScreen} />
      </Stack.Navigator>
      {console.log("App.js: This is the", screen, "screen")}
      {(screen != "" && screen != "Register" && screen != "Login" && screen != "Onboarding") && <BottomNav/>}
    </NavigationContainer>
  );

}

