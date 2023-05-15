import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import React from "react";
import styles from "./styles/LoginScreen";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { addScore } from "../score";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { AuthContext } from "../AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "react-native-paper";

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
  const { colors } = useTheme();

  const { logIn } = useContext(AuthContext);

  // Firebase Login
  function handleLogin({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          logIn();
        }
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
    addScore();
  }

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container}>
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
            <View style={styles.header}>
              <Text style={styles.text_header}>Carbon Karma</Text>
            </View>

            {/* Inputs View */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <FontAwesome name="envelope-o" color={colors.text} size={20} />
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#666666"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  autoCapitalize={false}
                />
                {touched.email && !errors.email && (
                  <Feather name="check-circle" color="green" size={20} />
                )}
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                    marginTop: 35,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={colors.text} size={20} />
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#666666"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  autoCapitalize={false}
                  // Obscures users' password
                  secureTextEntry={true}
                />
                {touched.password && !errors.password && (
                  <Feather name="check-circle" color="green" size={20} />
                )}
              </View>

              {/* Buttons View */}
              <View style={styles.button}>
                {/* TouchableOpacity = A wrapper for making views respond properly to touches */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={[
                    styles.signIn,
                    { backgroundColor: isValid ? "#00695C" : "#A7F1A8" },
                  ]}
                >
                  <LinearGradient
                    colors={["#08d4c4", "#00695C"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Login
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#00695C",
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#00695C",
                      },
                    ]}
                  >
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// Gets device screen dimensions
const { height } = Dimensions.get("screen");
