import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "./styles/AuthStyle";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { addScore } from "../score";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8)
    .required("Required")
    .matches(
      // Regex for strong password validation
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{8,}$/,
      "Must contain minimum 8 characters, at least one uppercase letter, one number and one special character"
    ),
});

const LoginScreen = () => {
  const navigation = useNavigation();

  // If user exists(has firebase account) and logs in, navigate to homepage
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Homepage");
      }
    });
    // When user leaves, unsubcribe from this listener
    return unsubcribe;
  }, []);

  // Firebase Login
  function handleLogin({ email, password }) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          navigation.navigate("Homepage");
        }
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
      addScore();
  }

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          setFieldTouched,
          handleSubmit,
        }) => (
          <>
            <Text style={styles.title}>Carbon Karma</Text>

            {/* Inputs View */}
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                autoCapitalize={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.labelText}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                autoCapitalize={false}
                // Obscures users' password
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Buttons View */}
            <View style={styles.buttonContainer}>
              {/* TouchableOpacity = A wrapper for making views respond properly to touches */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[
                  styles.button,
                  { backgroundColor: isValid ? "#00695C" : "#A7F1A8" },
                ]}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
