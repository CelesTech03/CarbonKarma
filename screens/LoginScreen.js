import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "./styles/AuthStyle"
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  // If user has firebase account and logs in, navigate to homepage
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Homepage")
      }
    })
    // When user leaves, unsubcribe from this listener
    return unsubcribe
  }, [])

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user
      if (user) {
        navigation.navigate("Homepage")
      }
      console.log('Logged in with:', user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Carbon Karma</Text>

      {/* Inputs View */}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email:</Text>
        <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input} 
        required
        />
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
        {/* TouchableOpacity = A wrapper for making views respond properly to touches */}
        <TouchableOpacity onPress={handleLogin}
        style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;