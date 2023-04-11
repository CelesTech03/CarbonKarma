import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { React, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { UpdateGas } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const FirstGas = () => {
  {
    /* Set Up for Gas dropper */
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "0", value: "0" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
    { label: "25", value: "25" },
    { label: "30+", value: "30+" },
  ]);

  async function submitGasHandler() {
    if (value != null) {
      console.log("Gas: ", value);
      UpdateGas(value);
    } else console.log("Gas is not updated.");
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How many gallons of gas do you use?</Text>

      <View style={styles.dropdownContainer}>
        <DropDownPicker
          value={value}
          items={items}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="0"
          onChangeValue={() => {
            submitGasHandler(value);
          }}
        />
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
        onPress={() => navigation.navigate("FirstSolar")}
      >
        <Image
          source={require("../assets/right-arrow.png")}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FirstGas;

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
  dropdownContainer: {
    marginTop: "7%",
    width: "80%",
    zIndex: 100,
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
