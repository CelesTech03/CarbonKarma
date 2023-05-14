import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Homepage from "./screens/Homepage";
import AddFoodScreen from "./screens/AddFoodScreen";
import AddTransportationScreen from "./screens/AddTransportationScreen";
import BottomNav from "./components/BottomNav";
import SettingsScreen from "./screens/SettingsScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AddEnergyScreen from "./screens/AddEnergyScreen";
import FirstCity from "./screens/FirstCity";
import FirstGas from "./screens/FirstGas";
import FirstSolar from "./screens/FirstSolar";
import FirstCar from "./screens/FirstCar";
import UploadImage from "./screens/UploadImage";
import { useState, useEffect } from "react";

import { AuthContext } from "./AuthContext";

import { auth } from "./config/firebase";

import { LogBox } from 'react-native';

//Ignore all log notifications
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  {
    /* For knowing what screen we're on: */
  }
  const [screen, setScreen] = useState("");
  //{(navigationRef.current != null && navigationRef.current.getCurrentRoute().name != "Register") && <BottomNav/>}
  //{console.log(navigationRef.current != null && navigationRef.current.getCurrentRoute().name)}
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setIsLoaded(true);
      if (user) {
        setIsLogin(true);
        console.log("login");
      }
    });
    // When user leaves, unsubcribe from this listener
    return unsubcribe;
  }, []);

  if(!isLoaded) {
    return <View ></View>;
  }

 const authContext = {
  logIn: () => {
    setIsLogin(true);
    setIsRegistered(false);
    console.log('login')
  },
  logOut: () => {
    setIsLogin(false);
    setIsRegistered(false);
    console.log('logout');
  },
  register: () => {
    setIsLogin(false);
    setIsRegistered(true);
    console.log('register');
  }
}

  return (
    <NavigationContainer
      onStateChange={(state) => setScreen(state.routes[state.index].name)}
    >
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
          {(!isLogin) ? (
            (!isRegistered) ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
            ) : (
            <>
              <Stack.Screen name="FirstCity" component={FirstCity} />
              <Stack.Screen name="FirstCar" component={FirstCar} />
              <Stack.Screen name="FirstGas" component={FirstGas} />
              <Stack.Screen name="FirstSolar" component={FirstSolar} />
              <Stack.Screen name="UploadImage" component={UploadImage} />
            </>
            )) : (
            <>
              <Stack.Screen name="Homepage" component={Homepage} />
              <Stack.Screen name="AddFood" component={AddFoodScreen} />
              <Stack.Screen
                name="AddTransportation"
                component={AddTransportationScreen}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
              <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
              <Stack.Screen name="AddEnergy" component={AddEnergyScreen} />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>    
      {console.log("App.js: This is the", screen, "screen")}
      {screen != "" &&
        screen != "Register" &&
        screen != "Login" &&
        screen != "FirstCity" &&
        screen != "FirstGas" &&
        screen != "FirstCar" &&
        screen != "FirstSolar" && 
        screen != "UploadImage" && <BottomNav />}
    </NavigationContainer>
  );
}
