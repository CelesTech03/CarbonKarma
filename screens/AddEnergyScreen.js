import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React } from 'react'
import styles from "./styles/AuthStyle"

const AddEnergyScreen = ({ navigation }) =>  {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>This is the AddEnergy page.</Text>    
    </KeyboardAvoidingView>
  );
};

export default AddEnergyScreen