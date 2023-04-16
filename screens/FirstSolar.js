import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { React, useState, useContext } from "react";
import { UpdateSolar } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../AuthContext";

const FirstSolar = () => {
  const [solar, setSolar] = useState(null);

  const { logIn } = useContext(AuthContext);

  async function submitSolarHandler() {
    if (solar != null) {
      console.log("Solar: ", solar);
      UpdateSolar(solar);
    } else console.log("Solar is not updated.");
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Do you have a solar panel?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSolar("Yes");
            submitSolarHandler(solar);
          }}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSolar("No");
            submitSolarHandler(solar);
          }}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>

      {/*Bottom Nav buttons here */}
      <TouchableOpacity
        style={styles.Backbutton}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/back.png")}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Nextbutton}
        activeOpacity={0.5}
        onPress={() => logIn()}
      >
        <Image
          source={require("../assets/right-arrow.png")}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FirstSolar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "400",
    fontSize: 35,
    color: "black",
    marginLeft: "5%",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#00695C",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  Backbutton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    margin: 5,
    borderWidth: 0.5,
    height: 40,
  },
  Nextbutton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    margin: 5,
    borderWidth: 0.5,
    height: 40,
  },
  buttonIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  },
});
