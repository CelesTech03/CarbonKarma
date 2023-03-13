import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React } from 'react'
import styles from "./styles/AuthStyle"

const Homepage = ({ navigation }) =>  {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Score: 342</Text>    
    </KeyboardAvoidingView>
  );
};

export default Homepage