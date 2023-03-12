import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import React from "react";
import styles from "./styles/AuthStyle"
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  // Firebase Signup
  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user
      navigation.navigate("Onboarding")
      console.log('Resgistered with:', user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Registration</Text>

      {/* Inputs View */}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Full Name:</Text>
        <TextInput placeholder="Full Name" style={styles.input} />

        <Text style={styles.labelText}>Email:</Text>
        <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input} 
        required
        />

        <Text style={styles.labelText}>Username:</Text>
        <TextInput placeholder="Username" style={styles.input} />

        <Text style={styles.labelText}>Password:</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          // Obscures users' password
          secureTextEntry
        />
      </View>

      {/* Buttons View */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;