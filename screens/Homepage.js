import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React } from 'react'
import styles from "./styles/AuthStyle"

const Homepage = ({ navigation }) =>  {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Score: 342</Text>
      {/* Buttons View */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("AddFood")} 
        style={styles.button}>
          <Text style={styles.buttonText}>Add Food Item</Text>
        </TouchableOpacity>
      </View>      
    </KeyboardAvoidingView>
  );
};

export default Homepage