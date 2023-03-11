import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Homepage from "./screens/Homepage";
import AddFoodScreen from "./screens/AddFoodScreen";
import AddTransportationScreen from "./screens/AddTransportationScreen";

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
        <Stack.Screen name="AddTransportation" component={AddTransportationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

